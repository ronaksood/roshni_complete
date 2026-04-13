import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function AlertsActions({ data }: { data: any }) {
  const { alerts } = data;

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'high': return { border: 'border-red-500/30', bg: 'bg-red-500/5', icon: <AlertCircle className="text-red-400" size={24} />, text: 'text-red-400' };
      case 'medium': return { border: 'border-yellow-500/30', bg: 'bg-yellow-500/5', icon: <AlertTriangle className="text-yellow-400" size={24} />, text: 'text-yellow-400' };
      case 'low': return { border: 'border-blue-500/30', bg: 'bg-blue-500/5', icon: <Info className="text-blue-400" size={24} />, text: 'text-blue-400' };
      case 'success': return { border: 'border-green-500/30', bg: 'bg-green-500/5', icon: <CheckCircle2 className="text-green-400" size={24} />, text: 'text-green-400' };
      default: return { border: 'border-white/10', bg: 'bg-white/5', icon: <Info className="text-cream-200" size={24} />, text: 'text-cream-200' };
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <motion.h3 variants={item} className="font-serif text-xl text-white">Alerts & Recommended Actions</motion.h3>
        <motion.span variants={item} className="text-sm text-cream-200/50">Prioritized by business impact</motion.span>
      </div>
      
      <div className="space-y-4">
        {alerts.map((alert: any) => {
          const styles = getSeverityStyles(alert.severity);
          return (
            <motion.div 
              key={alert.id} 
              variants={item}
              className={`glass-card rounded-2xl p-6 border ${styles.border} ${styles.bg} flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between group hover:bg-white/[0.08] transition-colors`}
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-1">{styles.icon}</div>
                <div>
                  <h4 className={`font-medium text-lg mb-1 ${styles.text}`}>{alert.title}</h4>
                  <p className="text-cream-200 text-sm leading-relaxed">{alert.message}</p>
                </div>
              </div>
              <button className="shrink-0 px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors flex items-center gap-2">
                {alert.action}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          );
        })}
      </div>

      <motion.div variants={item} className="mt-8 p-6 bg-luxury-800/50 rounded-2xl border border-white/5">
        <h4 className="font-serif text-lg text-white mb-2">How are these generated?</h4>
        <p className="text-sm text-cream-200/70">
          Aura Intelligence continuously scans your raw event stream, inventory levels, and profit margins. 
          It uses anomaly detection (Isolation Forests) to find sudden drops in conversion, and predictive modeling (Gradient Boosting) to forecast stockouts before they happen.
        </p>
      </motion.div>
    </motion.div>
  );
}
