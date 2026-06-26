import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100/70 border-b border-base-content/5 fixed w-full top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all group">
              <div className="size-8 rounded-md bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:bg-primary/10 transition-colors">
                <MessageSquare className="size-4 text-primary" />
              </div>
              <h1 className="text-sm font-bold tracking-tight uppercase">Chatty</h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={"/settings"}
              className="px-3 py-1.5 rounded-md hover:bg-base-content/5 transition-all flex items-center gap-2 group"
            >
              <Settings className="size-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="text-[11px] font-bold uppercase tracking-widest opacity-60 hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link 
                  to={"/profile"} 
                  className="px-3 py-1.5 rounded-md hover:bg-base-content/5 transition-all flex items-center gap-2 group"
                >
                  <User className="size-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[11px] font-bold uppercase tracking-widest opacity-60 hidden sm:inline">Profile</span>
                </Link>

                <button 
                  className="px-3 py-1.5 rounded-md hover:bg-error/10 hover:text-error transition-all flex items-center gap-2 group"
                  onClick={logout}
                >
                  <LogOut className="size-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[11px] font-bold uppercase tracking-widest opacity-60 hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
