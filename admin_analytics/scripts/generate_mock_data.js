import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DASHBOARD_DATA_FILE = path.join(DATA_DIR, 'dashboard_data.json');

function generateData() {
  console.log("Generating mock dashboard data (simulating Python ML pipeline output)...");
  
  const categories = ['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Watches'];
  const products = [];
  let totalRevenue = 0;
  let totalCost = 0;
  let totalOrders = 0;

  for (let i = 1; i <= 50; i++) {
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const basePrice = Math.floor(Math.random() * 4500) + 500;
    const cost = basePrice * (Math.random() * 0.3 + 0.3);
    
    const views = Math.floor(Math.random() * 5000) + 100;
    const tryOns = Math.floor(views * (Math.random() * 0.4 + 0.1));
    const purchases = Math.floor(tryOns * (Math.random() * 0.3 + 0.05));
    
    const revenue = purchases * basePrice;
    totalRevenue += revenue;
    totalCost += purchases * cost;
    totalOrders += purchases;
    
    let note = "Stable";
    if (views > 3000 && purchases < 10) note = "High interest, low conversion";
    else if (tryOns > 500 && purchases > 50) note = "Strong performer (AR driven)";
    else if (Math.random() > 0.8) note = "Likely to restock soon";

    products.push({
      id: `P${i.toString().padStart(3, '0')}`,
      name: `Luxury ${cat.slice(0, -1)} ${i}`,
      category: cat,
      price: basePrice,
      stock: Math.floor(Math.random() * 100),
      views,
      try_ons: tryOns,
      purchases,
      revenue,
      note
    });
  }

  products.sort((a, b) => b.revenue - a.revenue);

  const funnel = [
    { step: 'impression', count: 150000 },
    { step: 'product_view', count: 85000 },
    { step: '3d_view', count: 42000 },
    { step: 'try_on', count: 25000 },
    { step: 'add_to_cart', count: 12000 },
    { step: 'checkout', count: 8500 },
    { step: 'purchase', count: totalOrders }
  ];

  const dashboardData = {
    last_updated: new Date().toISOString(),
    executive: {
      revenue: totalRevenue,
      profit: totalRevenue - totalCost,
      orders: totalOrders,
      conversion_rate: totalOrders / 85000,
      aov: totalRevenue / totalOrders
    },
    funnel,
    products,
    ar_performance: {
      total_3d_views: 42000,
      total_try_ons: 25000,
      ar_conversion_rate: 0.18,
      non_ar_conversion_rate: 0.04
    },
    ml_insights: {
      metrics: {
        accuracy: 0.89,
        precision: 0.76,
        recall: 0.82,
        roc_auc: 0.91
      },
      feature_importance: {
        views: 0.12,
        has_3d_view: 0.25,
        has_try_on: 0.45,
        price: 0.10,
        category_code: 0.08
      },
      recommendation: "Try-on feature is the strongest predictor of purchase. Consider adding 3D assets to top-viewed products lacking them."
    },
    customers: {
      total_users: 85000,
      new_users: 55000,
      returning_users: 30000,
      repeat_purchase_rate: 0.24,
      clv: 1250,
      traffic_sources: [
        { name: 'Organic Search', value: 35000 },
        { name: 'Instagram Ads', value: 25000 },
        { name: 'Direct', value: 15000 },
        { name: 'Referral', value: 10000 }
      ],
      devices: [
        { name: 'Mobile (iOS)', value: 45000 },
        { name: 'Mobile (Android)', value: 25000 },
        { name: 'Desktop', value: 15000 }
      ]
    },
    inventory: {
      stockout_risk: products.filter(p => p.stock < 15).length,
      overstock_risk: products.filter(p => p.stock > 80 && p.purchases < 5).length,
      categories: categories.map(c => ({
        name: c,
        stock: products.filter(p => p.category === c).reduce((acc, p) => acc + p.stock, 0),
        demand: products.filter(p => p.category === c).reduce((acc, p) => acc + p.purchases, 0)
      }))
    },
    profit_margin: {
      gross_revenue: totalRevenue,
      cogs: totalCost,
      gross_profit: totalRevenue - totalCost,
      gross_margin_pct: ((totalRevenue - totalCost) / totalRevenue) * 100,
      discounts_given: totalRevenue * 0.08,
      returns_refunds: totalRevenue * 0.04,
      shipping_costs: totalOrders * 15,
      net_profit: (totalRevenue - totalCost) - (totalRevenue * 0.08) - (totalRevenue * 0.04) - (totalOrders * 15)
    },
    alerts: [
      { id: 1, severity: 'high', title: 'Critical Stockout Risk', message: '3 top-performing necklaces will run out of stock in < 5 days.', action: 'Restock Now' },
      { id: 2, severity: 'medium', title: 'High Traffic, Zero Sales', message: 'Luxury Ring 12 has 4,500 views but 0 purchases. Check pricing or 3D asset quality.', action: 'Investigate' },
      { id: 3, severity: 'low', title: 'Margin Leakage', message: 'Discount codes are eating 8% of gross revenue this week. Consider reducing promotional depth.', action: 'Review Discounts' },
      { id: 4, severity: 'success', title: 'AR Try-On Success', message: 'Watches category saw a 40% lift in conversion after adding new 3D models.', action: 'Scale Strategy' }
    ],
    copilot: [
      { role: 'system', content: 'I am Aura, your profit intelligence copilot. I analyze your raw data to find hidden revenue opportunities.' },
      { role: 'user', content: 'Why is my net profit margin dropping despite higher sales?' },
      { role: 'assistant', content: 'Based on the latest data, your gross revenue increased by 12%, but your **Net Profit Margin dropped by 3.2%**. This is driven by two factors:\n\n1. **High Return Rates on Rings:** Luxury Ring 8 and 14 have a 22% return rate, costing ₹14,500 in refunds. Users report sizing issues.\n2. **Over-discounting:** The "SPRING20" promo code was used on 45% of orders, eating ₹32,000 in potential profit.\n\n**Recommendation:** Pause the SPRING20 promo for high-performing AR products (they convert well without discounts) and add a sizing guide to all Ring product pages.' }
    ]
  };

  fs.writeFileSync(DASHBOARD_DATA_FILE, JSON.stringify(dashboardData, null, 2));
  console.log(`Mock data generated at ${DASHBOARD_DATA_FILE}`);
}

generateData(); // Force generation

