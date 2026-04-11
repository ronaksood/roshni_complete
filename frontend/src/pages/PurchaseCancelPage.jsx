import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lux-card max-w-md w-full overflow-hidden relative z-10"
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <XCircle className="text-red-500 w-16 h-16 mb-4" />
          </div>
          <h1 className="font-display text-4xl font-semibold text-center text-[var(--color-accent-deep)] mb-2">
            Purchase Cancelled
          </h1>
          <p className="text-[var(--color-muted)] text-center mb-6">
            Your order has been cancelled. No charges have been made.
          </p>
          <div className="lux-panel rounded-3xl p-4 mb-6">
            <p className="text-sm text-[var(--color-muted)] text-center">
              If you encountered any issues during the checkout process, please
              don&apos;t hesitate to contact our support team.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              to={"/"}
              className="lux-btn-secondary w-full flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Return to Shop
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;
