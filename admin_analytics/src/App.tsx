import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  PackageSearch, 
  Filter, 
  Box, 
  Users, 
  Archive, 
  CircleDollarSign, 
  Bell, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';
import ExecutiveOverview from './pages/ExecutiveOverview';
import ProductIntelligence from './pages/ProductIntelligence';
import FunnelAnalytics from './pages/FunnelAnalytics';
import ARPerformance from './pages/ARPerformance';
import CustomerIntelligence from './pages/CustomerIntelligence';
import InventoryDemand from './pages/InventoryDemand';
import ProfitMargin from './pages/ProfitMargin';
import AlertsActions from './pages/AlertsActions';
import AICopilot from './pages/AICopilot';

const NAV_ITEMS = [
  { id: 'executive', label: 'Executive Overview', icon: LayoutDashboard },
  { id: 'products', label: 'Product Intelligence', icon: PackageSearch },
  { id: 'funnel', label: 'Funnel Analytics', icon: Filter },
  { id: 'ar', label: 'AR / 3D Performance', icon: Box },
  { id: 'customers', label: 'Customer Intelligence', icon: Users },
  { id: 'inventory', label: 'Inventory & Demand', icon: Archive },
  { id: 'profit', label: 'Profit & Margin', icon: CircleDollarSign },
  { id: 'alerts', label: 'Alerts & Actions', icon: Bell },
  { id: 'copilot', label: 'AI Copilot', icon: Sparkles },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('executive');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load dashboard data:", err);
        setLoading(false);
      });
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'executive': return <ExecutiveOverview data={data} key="executive" />;
      case 'products': return <ProductIntelligence data={data} key="products" />;
      case 'funnel': return <FunnelAnalytics data={data} key="funnel" />;
      case 'ar': return <ARPerformance data={data} key="ar" />;
      case 'customers': return <CustomerIntelligence data={data} key="customers" />;
      case 'inventory': return <InventoryDemand data={data} key="inventory" />;
      case 'profit': return <ProfitMargin data={data} key="profit" />;
      case 'alerts': return <AlertsActions data={data} key="alerts" />;
      case 'copilot': return <AICopilot data={data} key="copilot" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-luxury-900 text-cream-100 flex overflow-hidden selection:bg-gold-500/30 relative">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-luxury-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-luxury-800/80 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/5">
          <h1 className="font-serif text-xl font-semibold tracking-wide text-gold-400">
            Aura Intelligence
          </h1>
          <button className="lg:hidden text-cream-200 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-gold-500/10 text-gold-400 shadow-[inset_0_0_0_1px_rgba(212,175,55,0.2)]" 
                    : "text-cream-200 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon size={18} className={isActive ? "text-gold-400" : "text-cream-200 opacity-70"} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-luxury-900/50 backdrop-blur-md z-40">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-cream-200 hover:text-white" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h2 className="font-serif text-2xl font-medium text-white">
              {NAV_ITEMS.find(i => i.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4 text-sm text-cream-200">
            {data && <span>Last updated: {new Date(data.last_updated).toLocaleString()}</span>}
            <div className="w-8 h-8 rounded-full bg-luxury-700 border border-white/10 flex items-center justify-center">
              <span className="font-serif text-gold-400">CEO</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-500"></div>
            </div>
          ) : !data ? (
            <div className="flex items-center justify-center h-full text-red-400">
              Failed to load data. Ensure the backend is running.
            </div>
          ) : (
            <div className="max-w-7xl mx-auto pb-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
