import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, IndianRupee, ShoppingBag, Activity, AlertTriangle, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
const formatNumber = (val: number) => new Intl.NumberFormat('en-IN').format(val);

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function ExecutiveOverview({ data }: { data: any }) {
  const { executive, products, ml_insights } = data;
  
  const topProduct = products[0];
  const worstProduct = products[products.length - 1];

  // Mock trend data for the chart
  const trendData = Array.from({ length: 30 }).map((_, i) => ({
    day: `Day ${i+1}`,
    revenue: Math.floor(Math.random() * 5000) + 1000 + (i * 100)
  }));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* KPI Cards */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Gross Revenue" 
          value={formatCurrency(executive.revenue)} 
          trend="+12.5%" 
          isPositive={true} 
          icon={IndianRupee} 
        />
        <KpiCard 
          title="Est. Profit" 
          value={formatCurrency(executive.profit)} 
          trend="+8.2%" 
          isPositive={true} 
          icon={TrendingUp} 
        />
        <KpiCard 
          title="Total Orders" 
          value={formatNumber(executive.orders)} 
          trend="-2.1%" 
          isPositive={false} 
          icon={ShoppingBag} 
        />
        <KpiCard 
          title="Conversion Rate" 
          value={`${(executive.conversion_rate * 100).toFixed(2)}%`} 
          trend="+1.5%" 
          isPositive={true} 
          icon={Activity} 
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <motion.div variants={item} className="glass-card rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-serif text-xl text-white mb-6">Revenue Trend (30 Days)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a0b12', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#d4af37' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div variants={item} className="glass-card rounded-2xl p-6 flex flex-col">
          <h3 className="font-serif text-xl text-white mb-4 flex items-center gap-2">
            <Sparkles className="text-gold-500" size={20} />
            AI Copilot Brief
          </h3>
          <div className="flex-1 space-y-4">
            <InsightItem 
              type="success"
              title="Top Performer"
              desc={`${topProduct.name} is driving 18% of total revenue. Consider increasing ad spend.`}
            />
            <InsightItem 
              type="warning"
              title="Stock Alert"
              desc={`3 products are critically low on stock, including ${topProduct.name}.`}
            />
            <InsightItem 
              type="info"
              title="ML Recommendation"
              desc={ml_insights.recommendation}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function KpiCard({ title, value, trend, isPositive, icon: Icon }: any) {
  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={64} />
      </div>
      <p className="text-sm text-cream-200 mb-2">{title}</p>
      <h4 className="font-serif text-3xl text-white mb-4">{value}</h4>
      <div className="flex items-center gap-2 text-sm">
        <span className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
          {trend}
        </span>
        <span className="text-cream-200/50">vs last period</span>
      </div>
    </div>
  );
}

function InsightItem({ type, title, desc }: any) {
  const colors = {
    success: 'border-green-500/30 bg-green-500/5 text-green-200',
    warning: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-200',
    error: 'border-red-500/30 bg-red-500/5 text-red-200',
    info: 'border-blue-500/30 bg-blue-500/5 text-blue-200',
  };
  return (
    <div className={`p-4 rounded-xl border ${colors[type as keyof typeof colors]}`}>
      <h5 className="font-medium mb-1">{title}</h5>
      <p className="text-sm opacity-80 leading-relaxed">{desc}</p>
    </div>
  );
}
