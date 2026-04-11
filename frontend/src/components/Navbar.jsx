import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { brandLogoUrl, brandName } from "../lib/brand";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full border-b z-40 transition-all duration-300 backdrop-blur-xl bg-[rgba(252,243,236,0.84)] border-[rgba(91,31,51,0.12)]">
      <div className="container mx-auto px-4 py-3.5">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="items-center gap-3 flex"
          >
            <img
              src={brandLogoUrl}
              alt={brandName}
              className="h-11 w-11 rounded-full object-cover border border-[rgba(91,31,51,0.16)] bg-white/70"
              loading="eager"
              decoding="async"
            />
            <div>
              <p className="font-display text-2xl leading-none text-[var(--color-accent-deep)]">
                {brandName}
              </p>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-muted)]">
                Fine Jewellery
              </p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className="text-[var(--color-muted)] hover:text-[var(--color-accent-deep)] transition duration-300
					 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-[var(--color-muted)] hover:text-[var(--color-accent-deep)] transition duration-300 
							ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-[var(--color-accent-deep)]"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span
                    className="absolute -top-2 -left-2 rounded-full px-2 py-0.5 
									text-xs transition duration-300 ease-in-out bg-[var(--color-accent)] text-white"
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            {isAdmin && (
              <Link
                className="px-4 py-2 rounded-full font-medium
								 transition duration-300 ease-in-out flex items-center"
                to={"/secret-dashboard"}
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent), var(--color-accent-deep))",
                  color: "#fffdf9",
                }}
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                className="py-2.5 px-4 rounded-full flex items-center transition duration-300 ease-in-out border"
                onClick={logout}
                style={{
                  background: "rgba(255,253,249,0.92)",
                  color: "var(--color-ink)",
                  borderColor: "var(--color-border)",
                }}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="py-2.5 px-4 rounded-full flex items-center transition duration-300 ease-in-out text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-accent), var(--color-accent-deep))",
                  }}
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="py-2.5 px-4 rounded-full flex items-center transition duration-300 ease-in-out border"
                  style={{
                    background: "rgba(255,253,249,0.92)",
                    color: "var(--color-ink)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
