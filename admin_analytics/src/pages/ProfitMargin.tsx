import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, ArrowDownRight, ArrowUpRight, Percent } from 'lucide-react';

const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function ProfitMargin({ data }: { data: any }) {
  const { profit_margin } = data;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.h3 variants={item} className="font-serif text-xl text-white">Profit & Margin Intelligence</motion.h3>
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Gross Revenue" value={formatCurrency(profit_margin.gross_revenue)} icon={IndianRupee} />
        <KpiCard title="Gross Margin" value={`${profit_margin.gross_margin_pct.toFixed(1)}%`} icon={Percent} />
        <KpiCard title="Net Profit" value={formatCurrency(profit_margin.net_profit)} icon={ArrowUpRight} highlight="text-green-400" />
        <KpiCard title="Lost to Discounts" value={formatCurrency(profit_margin.discounts_given)} icon={ArrowDownRight} highlight="text-red-400" />
      </motion.div>

      <motion.div variants={item} className="glass-card rounded-2xl p-8 max-w-4xl mx-auto">
        <h4 className="font-serif text-lg text-white mb-8 text-center">Profit Waterfall</h4>
        
        <div className="space-y-4">
          <WaterfallRow label="Gross Revenue" value={profit_margin.gross_revenue} type="positive" />
          <WaterfallRow label="Cost of Goods Sold (COGS)" value={-profit_margin.cogs} type="negative" />
          <div className="h-px bg-white/20 my-2" />
          <WaterfallRow label="Gross Profit" value={profit_margin.gross_profit} type="neutral" />
          <WaterfallRow label="Discounts & Promos" value={-profit_margin.discounts_given} type="negative" />
          <WaterfallRow label="Returns & Refunds" value={-profit_margin.returns_refunds} type="negative" />
          <WaterfallRow label="Shipping Costs" value={-profit_margin.shipping_costs} type="negative" />
          <div className="h-px bg-white/20 my-2" />
          <WaterfallRow label="Net Profit" value={profit_margin.net_profit} type="positive" isTotal />
        </div>

        <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10 text-sm text-cream-200">
          <strong className="text-white block mb-2 text-base">Business Context & Opportunities:</strong>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your Gross Margin is strong at <strong>{profit_margin.gross_margin_pct.toFixed(1)}%</strong>, indicating healthy product pricing.</li>
            <li><strong>Discounts</strong> are eating <strong>{((profit_margin.discounts_given / profit_margin.gross_revenue) * 100).toFixed(1)}%</strong> of your gross revenue. Reducing promotional depth on high-converting AR products could immediately recover margin.</li>
            <li><strong>Returns</strong> account for <strong>{((profit_margin.returns_refunds / profit_margin.gross_revenue) * 100).toFixed(1)}%</strong>. Implementing better 3D sizing guides could reduce this leakage.</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

function KpiCard({ title, value, icon: Icon, highlight = "text-white" }: any) {
  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={64} />
      </div>
      <p className="text-sm text-cream-200 mb-2">{title}</p>
      <h4 className={`font-serif text-3xl ${highlight}`}>{value}</h4>
    </div>
  );
}

function WaterfallRow({ label, value, type, isTotal = false }: any) {
  const colorClass = type === 'positive' ? 'text-green-400' : type === 'negative' ? 'text-red-400' : 'text-white';
  const displayValue = value < 0 ? `-${formatCurrency(Math.abs(value))}` : formatCurrency(value);
  
  return (
    <div className={`flex justify-between items-center ${isTotal ? 'text-xl font-serif font-medium mt-4' : 'text-sm'}`}>
      <span className={isTotal ? 'text-white' : 'text-cream-200'}>{label}</span>
      <span className={`${colorClass} ${isTotal ? 'font-serif' : 'font-mono'}`}>{displayValue}</span>
    </div>
  );
}
