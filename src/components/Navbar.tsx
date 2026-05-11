import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Bot, Server, Globe, Info, HelpingHand, FileText, Shield, BarChart, Monitor, User, LogOut } from 'lucide-react';

const serviceItems = [
  { icon: Bot, name: 'Discord Bot', href: '/discord' },
  { icon: Server, name: 'Minecraft Server', href: '/minecraft' },
  { icon: Globe, name: 'VPS', href: '/vps' },
  { icon: Monitor, name: 'RDP server', href: '/rdp' },
];

const moreItems = [
  { icon: Info, name: 'About Us', href: '/about' },
  { icon: HelpingHand, name: 'Support', href: '/support' },
  { icon: FileText, name: 'TOS', href: '/tos' },
  { icon: Shield, name: 'Privacy Policy', href: '/privacy' },
  { icon: BarChart, name: 'Status Page', href: '/status' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const timeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsProfileOpen(false);
    navigate('/');
  };

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => setOpenDropdown(null), 100);
  };

  const toggleMobileDropdown = (menu: string) => {
    setMobileDropdown(mobileDropdown === menu ? null : menu);
  };
  
  const closeAllMenus = () => {
      setIsMobileMenuOpen(false);
      setMobileDropdown(null);
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-4 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0 z-50">
            <img src="/codex.png" alt="Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-full px-4 py-2">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium px-3 py-1 rounded-full">Home</Link>
              
              {/* Services Dropdown */}
              <div onMouseEnter={() => handleMouseEnter('services')} onMouseLeave={handleMouseLeave} className="relative">
                <button className="flex items-center text-gray-300 hover:text-white transition-colors text-sm font-medium px-3 py-1 rounded-full">
                  Services <ChevronDown size={16} className="ml-1" />
                </button>
                <AnimatePresence>
                  {openDropdown === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-3 w-96 -translate-x-1/4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 grid grid-cols-2 gap-4"
                    >
                      {serviceItems.map(item => <DropdownItem key={item.name} {...item} />)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* More Dropdown */}
              <div onMouseEnter={() => handleMouseEnter('more')} onMouseLeave={handleMouseLeave} className="relative">
                 <button className="flex items-center text-gray-300 hover:text-white transition-colors text-sm font-medium px-3 py-1 rounded-full">
                    More <ChevronDown size={16} className="ml-1" />
                </button>
                <AnimatePresence>
                  {openDropdown === 'more' && (
                     <motion.div
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-3 w-56 -translate-x-1/4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-2"
                    >
                      {moreItems.map(item => <DropdownItem key={item.name} {...item} />)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Action Buttons (Login / Profile) */}
          <div className="flex items-center gap-3 z-50">
            <a 
              href="https://panel.legacycloud.qzz.io/" 
              target="_blank" 
              className="hidden md:inline-block bg-blue-600/10 border border-blue-500/50 text-blue-400 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all"
            >
              Dashboard
            </a>

            {user ? (
              // PROFILE ICON IF LOGGED IN
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 border border-gray-700 hover:border-blue-500 transition-all"
                >
                  <User size={20} className="text-blue-400" />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-2"
                    >
                      <div className="px-3 py-2 border-b border-gray-800 mb-1">
                        <p className="text-xs text-gray-500">Logged in as</p>
                        <p className="text-sm font-bold truncate text-white">{user.email}</p>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-sm"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // LOGIN BUTTON IF NOT LOGGED IN
              <Link to="/login" className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                Login
              </Link>
            )}

            <div className="md:hidden ml-2">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white p-2 bg-gray-800/50 rounded-lg">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl md:hidden z-40 flex items-center justify-center p-6"
            onClick={closeAllMenus}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-3xl p-6"
              onClick={e => e.stopPropagation()}
            >
               <div className="flex flex-col space-y-4">
                 <Link to="/" onClick={closeAllMenus} className="text-white font-bold text-lg p-3 hover:bg-gray-800 rounded-xl">Home</Link>
                 
                 <div className="space-y-2">
                    <p className="text-gray-500 text-xs font-bold uppercase px-3">Services</p>
                    {serviceItems.map(item => <Link key={item.name} to={item.href} onClick={closeAllMenus} className="flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 rounded-xl"><item.icon size={18} />{item.name}</Link>)}
                 </div>

                 <div className="pt-4 border-t border-gray-800 flex flex-col gap-3">
                    <a href="https://panel.legacycloud.qzz.io/" className="w-full text-center py-3 bg-blue-600/10 text-blue-400 rounded-xl font-bold border border-blue-600/20">Dashboard</a>
                    {user ? (
                      <button onClick={handleLogout} className="w-full text-center py-3 bg-red-600/10 text-red-400 rounded-xl font-bold">Logout</button>
                    ) : (
                      <Link to="/login" onClick={closeAllMenus} className="w-full text-center py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20">Login</Link>
                    )}
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const DropdownItem = ({ icon: Icon, name, href }: { icon: React.ElementType, name: string, href: string }) => (
  <Link to={href} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white">
    <Icon size={18} />
    <span className="text-sm font-medium">{name}</span>
  </Link>
);

export default Navbar;
  
