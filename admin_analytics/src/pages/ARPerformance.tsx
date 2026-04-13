import React from 'react';
import { motion } from 'framer-motion';
import { Box, Eye, ShoppingCart, Zap } from 'lucide-react';

const formatNumber = (val: number) => new Intl.NumberFormat('en-US').format(val);

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function ARPerformance({ data }: { data: any }) {
  const { ar_performance } = data;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.h3 variants={item} className="font-serif text-xl text-white">AR & 3D Performance</motion.h3>
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Eye size={64} />
          </div>
          <p className="text-sm text-cream-200 mb-2">Total 3D Views</p>
          <h4 className="font-serif text-4xl text-white mb-2">{formatNumber(ar_performance.total_3d_views)}</h4>
          <p className="text-sm text-cream-200/70">Users interacting with 3D models</p>
        </div>

        <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Box size={64} />
          </div>
          <p className="text-sm text-cream-200 mb-2">Total Try-Ons</p>
          <h4 className="font-serif text-4xl text-white mb-2">{formatNumber(ar_performance.total_try_ons)}</h4>
          <p className="text-sm text-cream-200/70">Users launching AR camera</p>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-gold-500/20">
          <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
            <ShoppingCart className="text-gold-400" size={32} />
          </div>
          <h4 className="font-serif text-5xl text-gold-400 mb-4">
            {(ar_performance.ar_conversion_rate * 100).toFixed(1)}%
          </h4>
          <p className="text-lg text-white mb-2">Conversion Rate with AR</p>
          <p className="text-sm text-cream-200/70 max-w-xs">
            Users who engage with AR try-on convert at a significantly higher rate.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <Zap className="text-cream-200" size={32} />
          </div>
          <h4 className="font-serif text-5xl text-white mb-4">
            {(ar_performance.non_ar_conversion_rate * 100).toFixed(1)}%
          </h4>
          <p className="text-lg text-white mb-2">Conversion Rate without AR</p>
          <p className="text-sm text-cream-200/70 max-w-xs">
            Standard conversion rate for users who do not use 3D or AR features.
          </p>
        </div>
      </motion.div>

      <motion.div variants={item} className="glass-card rounded-2xl p-6">
        <h4 className="font-serif text-lg text-white mb-4">Uplift Analysis</h4>
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
          <div>
            <p className="text-white font-medium">AR Conversion Uplift</p>
            <p className="text-sm text-cream-200/70">Relative increase in conversion rate</p>
          </div>
          <div className="text-2xl font-serif text-green-400">
            +{(((ar_performance.ar_conversion_rate - ar_performance.non_ar_conversion_rate) / ar_performance.non_ar_conversion_rate) * 100).toFixed(0)}%
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
