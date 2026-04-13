import React from 'react';
import { motion } from 'framer-motion';
import { PackageX, PackageCheck, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const formatNumber = (val: number) => new Intl.NumberFormat('en-US').format(val);

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function InventoryDemand({ data }: { data: any }) {
  const { inventory } = data;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.h3 variants={item} className="font-serif text-xl text-white">Inventory & Demand</motion.h3>
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-red-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg text-red-400"><PackageX size={24} /></div>
            <h4 className="font-medium text-white">Stockout Risk</h4>
          </div>
          <p className="text-3xl font-serif text-white mb-2">{inventory.stockout_risk} <span className="text-sm font-sans text-cream-200">products</span></p>
          <p className="text-sm text-cream-200/70">Items with less than 15 units remaining. Restock immediately to prevent revenue loss.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-yellow-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400"><PackageCheck size={24} /></div>
            <h4 className="font-medium text-white">Overstock Risk</h4>
          </div>
          <p className="text-3xl font-serif text-white mb-2">{inventory.overstock_risk} <span className="text-sm font-sans text-cream-200">products</span></p>
          <p className="text-sm text-cream-200/70">High inventory (&gt;80 units) with low recent sales (&lt;5). Consider promotional discounts.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><TrendingUp size={24} /></div>
            <h4 className="font-medium text-white">Demand Health</h4>
          </div>
          <p className="text-3xl font-serif text-white mb-2">Stable</p>
          <p className="text-sm text-cream-200/70">Overall inventory turnover is healthy. Focus on the specific risks highlighted above.</p>
        </div>
      </motion.div>

      <motion.div variants={item} className="glass-card rounded-2xl p-6">
        <h4 className="font-serif text-lg text-white mb-6">Category Stock vs Demand</h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={inventory.categories} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a0b12', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#d4af37' }}
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
              />
              <Bar dataKey="stock" name="Current Stock" fill="#4a1f38" radius={[4, 4, 0, 0]} />
              <Bar dataKey="demand" name="Recent Demand (Purchases)" fill="#d4af37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 text-sm text-cream-200">
          <strong className="text-white block mb-1">Business Context:</strong>
          Compare the dark bars (Stock) against the gold bars (Demand). Categories where gold exceeds dark indicate an impending stockout. Categories where dark heavily outweighs gold represent tied-up capital.
        </div>
      </motion.div>
    </motion.div>
  );
}
