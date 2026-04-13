import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown, AlertCircle } from 'lucide-react';

const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
const formatNumber = (val: number) => new Intl.NumberFormat('en-IN').format(val);

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

export default function ProductIntelligence({ data }: { data: any }) {
  const { products } = data;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="font-serif text-xl text-white">Product Intelligence</h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-200/50" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-cream-200/50 focus:outline-none focus:border-gold-500/50 transition-colors"
          />
        </div>
      </motion.div>

      <motion.div variants={item} className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10 text-cream-200">
              <tr>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Views</th>
                <th className="p-4 font-medium">Try-Ons</th>
                <th className="p-4 font-medium">Purchases</th>
                <th className="p-4 font-medium">Revenue</th>
                <th className="p-4 font-medium">AI Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((p: any) => (
                <motion.tr variants={item} key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-white">{p.name}</div>
                    <div className="text-xs text-cream-200/50">{p.id}</div>
                  </td>
                  <td className="p-4 text-cream-200">{p.category}</td>
                  <td className="p-4 text-cream-200">{formatCurrency(p.price)}</td>
                  <td className="p-4 text-cream-200">{formatNumber(p.views)}</td>
                  <td className="p-4 text-cream-200">{formatNumber(p.try_ons)}</td>
                  <td className="p-4 text-cream-200">{formatNumber(p.purchases)}</td>
                  <td className="p-4 text-gold-400 font-medium">{formatCurrency(p.revenue)}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      p.note.includes('High interest') ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                      p.note.includes('Strong performer') ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      p.note.includes('restock') ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      'bg-white/5 text-cream-200 border border-white/10'
                    }`}>
                      {p.note}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
