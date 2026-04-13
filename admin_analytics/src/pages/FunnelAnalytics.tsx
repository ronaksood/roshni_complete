import React from 'react';
import { motion } from 'framer-motion';
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

export default function FunnelAnalytics({ data }: { data: any }) {
  const { funnel } = data;

  // Calculate conversion rates between steps
  const funnelWithRates = funnel.map((step: any, index: number) => {
    const prevCount = index === 0 ? step.count : funnel[index - 1].count;
    const rate = prevCount > 0 ? (step.count / prevCount) * 100 : 0;
    return {
      ...step,
      label: step.step.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      rate: rate.toFixed(1)
    };
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.h3 variants={item} className="font-serif text-xl text-white">Conversion Funnel</motion.h3>
      
      <motion.div variants={item} className="glass-card rounded-2xl p-6">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelWithRates} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
              <YAxis dataKey="label" type="category" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.8)', fontSize: 12}} tickLine={false} axisLine={false} width={100} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#1a0b12', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#d4af37' }}
                formatter={(value: number) => formatNumber(value)}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={32}>
                {funnelWithRates.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={`rgba(212, 175, 55, ${1 - (index * 0.1)})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {funnelWithRates.slice(1).map((step: any, index: number) => (
          <div key={step.step} className="glass-card rounded-2xl p-6">
            <p className="text-sm text-cream-200 mb-2">{funnelWithRates[index].label} → {step.label}</p>
            <div className="flex items-end justify-between">
              <h4 className="font-serif text-3xl text-white">{step.rate}%</h4>
              <span className="text-sm text-cream-200/50">{formatNumber(step.count)} users</span>
            </div>
            {parseFloat(step.rate) < 30 && (
              <div className="mt-4 text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded px-2 py-1 inline-block">
                High drop-off detected
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
