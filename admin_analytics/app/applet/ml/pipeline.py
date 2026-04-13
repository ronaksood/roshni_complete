import os
import json
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from sklearn.model_selection import train_test_split
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, roc_auc_score
from sklearn.inspection import permutation_importance

DATA_DIR = os.path.join(os.path.dirname(__dirname__), 'data')
os.makedirs(DATA_DIR, exist_ok=True)

RAW_EVENTS_FILE = os.path.join(DATA_DIR, 'raw_events.csv')
PRODUCTS_FILE = os.path.join(DATA_DIR, 'products.csv')
DASHBOARD_DATA_FILE = os.path.join(DATA_DIR, 'dashboard_data.json')

def generate_synthetic_data(num_users=5000, num_products=50):
    print("Generating synthetic raw data...")
    
    # Generate Products
    categories = ['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Watches']
    products = []
    for i in range(1, num_products + 1):
        cat = np.random.choice(categories)
        base_price = np.random.uniform(500, 5000)
        cost = base_price * np.random.uniform(0.3, 0.6)
        products.append({
            'product_id': f'P{i:03d}',
            'name': f'Luxury {cat[:-1]} {i}',
            'category': cat,
            'price': round(base_price, 2),
            'cost': round(cost, 2),
            'stock': np.random.randint(0, 100),
            'has_3d': np.random.choice([True, False], p=[0.7, 0.3])
        })
    df_products = pd.DataFrame(products)
    df_products.to_csv(PRODUCTS_FILE, index=False)

    # Generate Events
    events = []
    start_date = datetime.now() - timedelta(days=30)
    
    event_types = ['impression', 'product_view', '3d_view', 'try_on', 'add_to_cart', 'checkout', 'purchase']
    
    for u in range(num_users):
        user_id = f'U{u:05d}'
        num_sessions = np.random.randint(1, 5)
        
        for s in range(num_sessions):
            session_id = f'S{u}_{s}'
            session_start = start_date + timedelta(days=np.random.uniform(0, 30))
            
            # User views 1-5 products per session
            for _ in range(np.random.randint(1, 6)):
                prod = df_products.sample(1).iloc[0]
                pid = prod['product_id']
                
                # Funnel progression
                current_time = session_start + timedelta(minutes=np.random.uniform(0, 5))
                events.append({'timestamp': current_time, 'user_id': user_id, 'session_id': session_id, 'product_id': pid, 'event_type': 'impression'})
                
                if np.random.rand() > 0.4: # 60% click through
                    current_time += timedelta(seconds=np.random.randint(10, 60))
                    events.append({'timestamp': current_time, 'user_id': user_id, 'session_id': session_id, 'product_id': pid, 'event_type': 'product_view'})
                    
                    if prod['has_3d'] and np.random.rand() > 0.5: # 50% of viewers open 3D
                        current_time += timedelta(seconds=np.random.randint(10, 120))
                        events.append({'timestamp': current_time, 'user_id': user_id, 'session_id': session_id, 'product_id': pid, 'event_type': '3d_view'})
                        
                        if np.random.rand() > 0.4: # 60% of 3D viewers try on
                            current_time += timedelta(seconds=np.random.randint(20, 180))
                            events.append({'timestamp': current_time, 'user_id': user_id, 'session_id': session_id, 'product_id': pid, 'event_type': 'try_on'})
                    
                    # Add to cart probability depends on if they tried it on
                    atc_prob = 0.15
                    if any(e['event_type'] == 'try_on' and e['product_id'] == pid and e['session_id'] == session_id for e in events):
                        atc_prob = 0.45
                        
                    if np.random.rand() < atc_prob:
                        current_time += timedelta(seconds=np.random.randint(10, 60))
                        events.append({'timestamp': current_time, 'user_id': user_id, 'session_id': session_id, 'product_id': pid, 'event_type': 'add_to_cart'})
                        
                        if np.random.rand() > 0.3: # 70% checkout
                            current_time += timedelta(seconds=np.random.randint(30, 120))
                            events.append({'timestamp': current_time, 'user_id': user_id, 'session_id': session_id, 'product_id': pid, 'event_type': 'checkout'})
                            
                            if np.random.rand() > 0.2: # 80% purchase
                                current_time += timedelta(seconds=np.random.randint(30, 120))
                                events.append({'timestamp': current_time, 'user_id': user_id, 'session_id': session_id, 'product_id': pid, 'event_type': 'purchase'})

    df_events = pd.DataFrame(events)
    df_events.to_csv(RAW_EVENTS_FILE, index=False)
    print(f"Generated {len(df_events)} events.")
    return df_products, df_events

def engineer_features(df_products, df_events):
    print("Engineering features...")
    # Session level features
    session_product = df_events.groupby(['session_id', 'product_id', 'user_id']).agg(
        views=('event_type', lambda x: (x == 'product_view').sum()),
        has_3d_view=('event_type', lambda x: (x == '3d_view').sum() > 0),
        has_try_on=('event_type', lambda x: (x == 'try_on').sum() > 0),
        purchased=('event_type', lambda x: (x == 'purchase').sum() > 0)
    ).reset_index()
    
    # Merge product info
    df_features = session_product.merge(df_products[['product_id', 'price', 'category']], on='product_id', how='left')
    
    # Convert bools to int
    df_features['has_3d_view'] = df_features['has_3d_view'].astype(int)
    df_features['has_try_on'] = df_features['has_try_on'].astype(int)
    df_features['purchased'] = df_features['purchased'].astype(int)
    
    # Categorical encoding for model
    df_features['category_code'] = df_features['category'].astype('category').cat.codes
    
    return df_features

def train_model(df_features):
    print("Training ML model (HistGradientBoostingClassifier)...")
    features = ['views', 'has_3d_view', 'has_try_on', 'price', 'category_code']
    X = df_features[features]
    y = df_features['purchased']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Using HistGradientBoostingClassifier as it's fast, handles raw data well, and is built into sklearn (similar to LightGBM)
    model = HistGradientBoostingClassifier(max_iter=100, random_state=42, early_stopping=True)
    model.fit(X_train, y_train)
    
    preds = model.predict(X_test)
    probs = model.predict_proba(X_test)[:, 1]
    
    metrics = {
        'accuracy': float(accuracy_score(y_test, preds)),
        'precision': float(precision_score(y_test, preds, zero_division=0)),
        'recall': float(recall_score(y_test, preds, zero_division=0)),
        'roc_auc': float(roc_auc_score(y_test, probs))
    }
    print(f"Model Metrics: {metrics}")
    
    # Feature Importance (Permutation)
    r = permutation_importance(model, X_test, y_test, n_repeats=10, random_state=42)
    importance = {features[i]: float(r.importances_mean[i]) for i in range(len(features))}
    
    return model, metrics, importance

def generate_dashboard_data(df_products, df_events, df_features, model_metrics, feature_importance):
    print("Aggregating dashboard data...")
    
    # 1. Executive Overview
    purchases = df_events[df_events['event_type'] == 'purchase']
    purchased_products = purchases.merge(df_products, on='product_id')
    revenue = float(purchased_products['price'].sum())
    cost = float(purchased_products['cost'].sum())
    profit = revenue - cost
    orders = len(purchases)
    unique_sessions = df_events['session_id'].nunique()
    conversion_rate = orders / unique_sessions if unique_sessions > 0 else 0
    
    # 2. Funnel
    funnel_counts = df_events['event_type'].value_counts().to_dict()
    funnel_order = ['impression', 'product_view', '3d_view', 'try_on', 'add_to_cart', 'checkout', 'purchase']
    funnel = [{'step': step, 'count': int(funnel_counts.get(step, 0))} for step in funnel_order]
    
    # 3. Product Intelligence
    prod_stats = []
    for _, p in df_products.iterrows():
        pid = p['product_id']
        p_events = df_events[df_events['product_id'] == pid]
        p_purchases = p_events[p_events['event_type'] == 'purchase']
        p_revenue = float(len(p_purchases) * p['price'])
        p_views = len(p_events[p_events['event_type'] == 'product_view'])
        p_try_ons = len(p_events[p_events['event_type'] == 'try_on'])
        
        # Simple heuristic for AI notes
        note = "Stable"
        if p_views > 100 and len(p_purchases) == 0:
            note = "High interest, low conversion"
        elif p_try_ons > 50 and len(p_purchases) > 10:
            note = "Strong performer (AR driven)"
        elif p['stock'] < 10:
            note = "Likely to restock soon"
            
        prod_stats.append({
            'id': pid,
            'name': p['name'],
            'category': p['category'],
            'price': float(p['price']),
            'stock': int(p['stock']),
            'views': int(p_views),
            'try_ons': int(p_try_ons),
            'purchases': int(len(p_purchases)),
            'revenue': p_revenue,
            'note': note
        })
        
    # Sort by revenue
    prod_stats = sorted(prod_stats, key=lambda x: x['revenue'], reverse=True)
    
    # 4. AR/3D Performance
    ar_stats = {
        'total_3d_views': int(funnel_counts.get('3d_view', 0)),
        'total_try_ons': int(funnel_counts.get('try_on', 0)),
        'ar_conversion_rate': float(len(df_features[(df_features['has_try_on']==1) & (df_features['purchased']==1)]) / max(1, len(df_features[df_features['has_try_on']==1]))),
        'non_ar_conversion_rate': float(len(df_features[(df_features['has_try_on']==0) & (df_features['purchased']==1)]) / max(1, len(df_features[df_features['has_try_on']==0])))
    }
    
    dashboard_data = {
        'last_updated': datetime.now().isoformat(),
        'executive': {
            'revenue': revenue,
            'profit': profit,
            'orders': orders,
            'conversion_rate': conversion_rate,
            'aov': revenue / orders if orders > 0 else 0
        },
        'funnel': funnel,
        'products': prod_stats,
        'ar_performance': ar_stats,
        'ml_insights': {
            'metrics': model_metrics,
            'feature_importance': feature_importance,
            'recommendation': 'Try-on feature is the strongest predictor of purchase. Consider adding 3D assets to top-viewed products lacking them.'
        }
    }
    
    with open(DASHBOARD_DATA_FILE, 'w') as f:
        json.dump(dashboard_data, f, indent=2)
    print(f"Dashboard data saved to {DASHBOARD_DATA_FILE}")

def main():
    if not os.path.exists(RAW_EVENTS_FILE) or not os.path.exists(PRODUCTS_FILE):
        df_products, df_events = generate_synthetic_data()
    else:
        print("Loading existing raw data...")
        df_products = pd.read_csv(PRODUCTS_FILE)
        df_events = pd.read_csv(RAW_EVENTS_FILE)
        
    df_features = engineer_features(df_products, df_events)
    model, metrics, importance = train_model(df_features)
    generate_dashboard_data(df_products, df_events, df_features, metrics, importance)

if __name__ == '__main__':
    main()
