import { LogOut, Moon, Sun, HardHat } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full glass bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl shadow-lg shadow-primary-500/30">
              <HardHat size={22} className="drop-shadow-sm" />
            </div>
            <span className="font-extrabold text-xl tracking-tight hidden sm:block bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              BuildStream
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {user && (
              <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-700 pl-4">
                <span className="text-sm font-medium hidden sm:block">{user.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
