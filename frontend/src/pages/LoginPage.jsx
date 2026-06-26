import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200/30 p-6">
      {/* Centered Card Container */}
      <div className="w-full max-w-[440px] bg-base-100 border border-base-content/10 rounded-2xl p-8 sm:p-12">
        <div className="w-full space-y-10">
          {/* Logo & Header */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-4 group">
              <div className="size-10 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 transition-colors">
                <MessageSquare className="size-5 text-primary opacity-80" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-base-content">
                  Welcome Back
                </h1>
                <p className="text-sm font-medium text-base-content/40 tracking-wide uppercase">
                  Sign in to your message stream
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/50 ml-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-base-200/50 border border-base-content/5 rounded-lg text-sm focus:border-primary/30 focus:bg-base-100 transition-all outline-none font-medium placeholder:text-base-content/20"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/50 ml-1">
                Security Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 bg-base-200/50 border border-base-content/5 rounded-lg text-sm focus:border-primary/30 focus:bg-base-100 transition-all outline-none font-medium placeholder:text-base-content/20"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-base-content/30 hover:text-base-content/60 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 bg-primary text-primary-content rounded-lg font-bold text-sm tracking-wide hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase" 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="size-4 animate-spin ring-offset-2" />
                  <span>Verifying...</span>
                </div>
              ) : (
                "Authenticate"
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs font-medium text-base-content/40 tracking-wide uppercase">
              New here?{" "}
              <Link to="/signup" className="text-primary font-bold hover:underline">
                Register Workstation
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
