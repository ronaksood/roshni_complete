import { ArrowRight, CheckCircle, HandHeart, MapPinned } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        const response = await axios.post("/payments/checkout-success", {
          sessionId,
        });
        setOrderDetails(response.data);
        clearCart();
      } catch (error) {
        console.log(error);
        setError(
          error.response?.data?.message ||
            "We could not verify your order right now."
        );
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
    }
  }, [clearCart]);

  if (isProcessing) return "Processing...";

  if (error) return `Error: ${error}`;

  const estimatedDelivery = orderDetails?.estimatedDeliveryDate
    ? new Date(orderDetails.estimatedDeliveryDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "3-5 business days";

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <div className="max-w-md w-full rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="lux-card p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-[var(--color-success)] w-16 h-16 mb-4" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-center text-[var(--color-accent-deep)] mb-2">
            Purchase Successful!
          </h1>

          <p className="text-[var(--color-muted)] text-center mb-2">
            Thank you for your order. {"We're"} processing it now.
          </p>
          <p className="text-[var(--color-accent-deep)] text-center text-sm mb-6">
            Check your email for order details and updates.
          </p>
          <div className="lux-panel p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--color-muted)]">Order number</span>
              <span className="text-sm font-semibold text-[var(--color-accent-deep)]">
                {orderDetails?.trackingNumber || "Generating..."}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-muted)]">Estimated delivery</span>
              <span className="text-sm font-semibold text-[var(--color-accent-deep)]">
                {estimatedDelivery}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="w-full lux-btn-primary font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center"
            >
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </div>
            {orderDetails?.orderId && (
              <Link
                to={`/orders/${orderDetails.orderId}/tracking`}
                className="w-full lux-btn-secondary font-bold py-2 px-4
            rounded-lg transition duration-300 flex items-center justify-center"
              >
                <MapPinned className="mr-2" size={18} />
                Track Order
              </Link>
            )}
            <Link
              to={"/"}
              className="w-full lux-btn-secondary text-[var(--color-accent-deep)] font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PurchaseSuccessPage;
