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
            <img src="/codex.png" alt="CodeX Logo" className="h-10 w-auto" />
          </Link>

          {/* DESKTOP UI: Center Pill Design (Original) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-full px-4 py-2">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium px-3 py-1 rounded-full">Home</Link>
              
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
          
          <div className="flex items-center gap-4 z-50">
            {/* Dashboard Link (Original Style) */}
            <a 
              href="https://panel.legacycloud.qzz.io/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden md:inline-block bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Dashboard
            </a>

            {/* Profile / Login Toggle (Original UI Integration) */}
            {user ? (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="p-2 text-gray-300 hover:text-blue-400 transition-colors">
                  <User size={24} />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-2 text-sm">
                      <div className="p-2 border-b border-gray-800 text-gray-400 truncate">{user.email}</div>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 p-2 text-red-400 hover:bg-red-900/20 rounded-md mt-1 transition-colors">
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="hidden md:inline-block text-gray-300 hover:text-white text-sm font-bold px-3">
                Login
              </Link>
            )}

            <div className="md:hidden ml-4">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE UI: Original Drawer Design */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl md:hidden z-40"
            onClick={closeAllMenus}
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute top-24 left-4 right-4 bg-gray-900/80 border border-gray-700 rounded-2xl p-6"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-white font-bold text-xl mb-4">Menu</h2>
               <div className="flex flex-col space-y-2">
                 <Link to="/" onClick={closeAllMenus} className="text-gray-300 hover:bg-gray-800 p-3 rounded-lg transition-colors">Home</Link>
                 
                 <div className="border-t border-b border-gray-700">
                    <button onClick={() => toggleMobileDropdown('services')} className="w-full flex justify-between items-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                      <span>Services</span>
                      <ChevronDown size={20} className={`transition-transform ${mobileDropdown === 'services' ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileDropdown === 'services' && (
                      <div className="pl-4 pb-2 mt-1 space-y-1">
                        {serviceItems.map(item => <Link key={item.name} to={item.href} onClick={closeAllMenus} className="flex items-center gap-3 py-2 text-gray-400 hover:text-white"><item.icon size={18} />{item.name}</Link>)}
                      </div>
                    )}
                 </div>

                 {user ? (
                   <button onClick={handleLogout} className="text-red-400 p-3 text-left w-full">Logout</button>
                 ) : (
                   <Link to="/login" onClick={closeAllMenus} className="text-gray-300 p-3">Login</Link>
                 )}

                 <a href="https://panel.legacycloud.qzz.io/" target="_blank" rel="noopener noreferrer" onClick={closeAllMenus} className="text-center bg-blue-600 text-white p-3 rounded-lg font-semibold mt-4">Dashboard</a>
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
                          
