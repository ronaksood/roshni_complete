import { motion } from "framer-motion";
import {
  BadgeCheck,
  Box,
  ChevronRight,
  Loader2,
  MapPinned,
  Package,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../lib/axios";
import { formatCurrencyINR } from "../lib/currency";
import { getPrimaryProductImage } from "../lib/product";

const phaseIcons = {
  confirmed: BadgeCheck,
  packed: Box,
  shipped: Truck,
  out_for_delivery: MapPinned,
  delivered: Package,
};

const TrackOrderPage = () => {
  const { orderId } = useParams();
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const response = await axios.get(`/payments/orders/${orderId}/tracking`);
        setTracking(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "We could not load this order yet."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, [orderId]);

  const estimatedDelivery = useMemo(() => {
    if (!tracking?.estimatedDeliveryDate) return "";

    return new Date(tracking.estimatedDeliveryDate).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );
  }, [tracking?.estimatedDeliveryDate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="flex items-center gap-3 rounded-full border px-5 py-3 text-[var(--color-accent-deep)] bg-[rgba(255,247,241,0.92)]">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading your order journey...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <p className="text-xl font-semibold text-red-600">{error}</p>
          <Link
            to="/"
            className="mt-6 lux-btn-secondary"
          >
            Back to home
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[32px] border p-8 shadow-[0_20px_80px_rgba(91,31,51,0.12)] bg-[linear-gradient(135deg,rgba(255,250,246,0.98),rgba(248,235,226,0.95))]"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,31,61,0.15),transparent_35%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-accent)]">
                Live order tracking
              </p>
              <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-[var(--color-accent-deep)] sm:text-6xl">
                {tracking.currentStatusLabel}
              </h1>
              <p className="mt-4 max-w-2xl text-base text-[var(--color-muted)] sm:text-lg">
                Follow each stage of your order, from confirmation to doorstep
                delivery.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <InfoCard
                  label="Tracking number"
                  value={tracking.trackingNumber}
                />
                <InfoCard
                  label="Order total"
                  value={formatCurrencyINR(tracking.totalAmount)}
                />
                <InfoCard label="Estimated delivery" value={estimatedDelivery} />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="rounded-[28px] border p-6 backdrop-blur-md bg-[rgba(255,247,241,0.94)]"
              style={{ borderColor: "var(--color-border)" }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
                Current stage
              </p>
              <div className="mt-5 flex items-center justify-center rounded-3xl border p-8 bg-[rgba(124,31,61,0.08)]">
                <MapPinned className="h-16 w-16 text-[var(--color-accent-deep)]" />
              </div>
              <p className="mt-5 text-center text-2xl font-bold text-[var(--color-ink)]">
                {tracking.currentStatusLabel}
              </p>
              <p className="mt-2 text-center text-sm text-[var(--color-muted)]">
                We will keep this timeline updated automatically as your order
                moves forward.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lux-card p-6 shadow-xl"
          >
            <h2 className="font-display text-4xl font-semibold text-[var(--color-accent-deep)]">
              Tracking timeline
            </h2>
            <div className="mt-8 space-y-6">
              {tracking.phases.map((phase, index) => {
                const Icon = phaseIcons[phase.key] || Package;

                return (
                  <div key={phase.key} className="relative flex gap-4">
                    {index !== tracking.phases.length - 1 && (
                      <div
                        className={`absolute left-[23px] top-12 h-[calc(100%+8px)] w-px ${
                          phase.state === "completed" || phase.state === "current"
                            ? "bg-[var(--color-accent)]"
                            : "bg-[rgba(91,31,51,0.16)]"
                        }`}
                      />
                    )}
                    <div
                      className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                        phase.state === "completed"
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                          : phase.state === "current"
                          ? "border-[var(--color-accent)] bg-[rgba(124,31,61,0.08)] text-[var(--color-accent-deep)]"
                          : "border-[rgba(91,31,51,0.16)] bg-[rgba(91,31,51,0.06)] text-[var(--color-muted)]"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                          {phase.label}
                        </h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                            phase.state === "completed"
                              ? "bg-[rgba(124,31,61,0.1)] text-[var(--color-accent-deep)]"
                              : phase.state === "current"
                              ? "bg-[rgba(47,41,36,0.08)] text-[var(--color-ink)]"
                              : "bg-[rgba(91,31,51,0.08)] text-[var(--color-muted)]"
                          }`}
                        >
                          {phase.state}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[var(--color-muted)]">
                        {phase.description}
                      </p>
                      {phase.completedAt && (
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                          {new Date(phase.completedAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lux-card p-6 shadow-xl"
          >
            <h2 className="font-display text-4xl font-semibold text-[var(--color-accent-deep)]">
              Items in this order
            </h2>
            <div className="mt-6 space-y-4">
              {tracking.products.map((item) => (
                <div
                  key={item.product?._id || item._id}
                  className="flex items-center gap-4 rounded-3xl border p-4 bg-[rgba(255,247,241,0.92)]"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <img
                    src={getPrimaryProductImage(item.product)}
                    alt={item.product?.name}
                    className="h-20 w-20 rounded-2xl object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-semibold text-[var(--color-ink)]">
                      {item.product?.name || "Product"}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      Quantity: {item.quantity}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[var(--color-accent-deep)]">
                      {formatCurrencyINR(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/"
              className="lux-btn-primary mt-8 inline-flex items-center gap-2"
            >
              Continue shopping
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }) => (
  <div
    className="rounded-3xl border p-4 backdrop-blur-sm bg-[rgba(255,247,241,0.94)]"
    style={{ borderColor: "var(--color-border)" }}
  >
    <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">{label}</p>
    <p className="mt-2 text-base font-semibold text-[var(--color-ink)]">{value}</p>
  </div>
);

export default TrackOrderPage;
