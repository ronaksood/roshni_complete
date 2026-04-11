import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginUpPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
    if (user) getCartItems();
  }, [checkAuth, getCartItems]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen text-[var(--color-ink)] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(124,31,61,0.18),transparent_68%)]" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(240,220,208,0.3),transparent_70%)]" />
      </div>
      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to={"/"} /> : <SignUpPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to={"/"} /> : <LoginPage />}
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route
            path="/secret-dashboard"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to={"/"} />
            }
          />
          <Route
            path="/cart"
            element={user ? <CartPage /> : <Navigate to={"/"} />}
          />

          <Route path="/purchase-success" element={<PurchaseSuccessPage />} />
          <Route path="/purchase-cancel" element={<PurchaseCancelPage />} />
          <Route
            path="/orders/:orderId/tracking"
            element={user ? <TrackOrderPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
