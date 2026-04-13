import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, UserCheck, Heart } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
const formatNumber = (val: number) => new Intl.NumberFormat('en-IN').format(val);

const COLORS = ['#d4af37', '#8c3b6a', '#4a1f38', '#2d1322', '#6b2d51'];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function CustomerIntelligence({ data }: { data: any }) {
  const { customers } = data;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.h3 variants={item} className="font-serif text-xl text-white">Customer Intelligence</motion.h3>
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Users" value={formatNumber(customers.total_users)} icon={Users} />
        <KpiCard title="New Users" value={formatNumber(customers.new_users)} icon={UserPlus} />
        <KpiCard title="Repeat Purchase Rate" value={`${(customers.repeat_purchase_rate * 100).toFixed(1)}%`} icon={UserCheck} />
        <KpiCard title="Customer LTV" value={formatCurrency(customers.clv)} icon={Heart} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="glass-card rounded-2xl p-6">
          <h4 className="font-serif text-lg text-white mb-4">Traffic Sources</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={customers.traffic_sources} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {customers.traffic_sources.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1a0b12', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} itemStyle={{ color: '#d4af37' }} />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#f5ebe6' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 text-sm text-cream-200">
            <strong className="text-white block mb-1">Business Context:</strong>
            Organic search remains your strongest acquisition channel. However, Instagram Ads have the highest AR try-on engagement rate. Consider increasing ad spend on visually rich 3D product posts.
          </div>
        </motion.div>

        <motion.div variants={item} className="glass-card rounded-2xl p-6">
          <h4 className="font-serif text-lg text-white mb-4">Device Breakdown</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={customers.devices} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {customers.devices.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1a0b12', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} itemStyle={{ color: '#d4af37' }} />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#f5ebe6' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 text-sm text-cream-200">
            <strong className="text-white block mb-1">Business Context:</strong>
            Mobile dominates traffic (82%), which is ideal for AR features. Ensure the mobile checkout flow is frictionless to capitalize on high-intent mobile users.
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function KpiCard({ title, value, icon: Icon }: any) {
  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={64} />
      </div>
      <p className="text-sm text-cream-200 mb-2">{title}</p>
      <h4 className="font-serif text-3xl text-white">{value}</h4>
    </div>
  );
}
