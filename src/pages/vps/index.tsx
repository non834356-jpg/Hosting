import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, MemoryStick, ChevronLeft, ChevronRight, ChevronDown, Shield, Headset, Zap } from 'lucide-react';

// --- OS Logo Imports ---
import ubuntuLogo from '@/assets/ubuntu.png';
import windowsLogo from '@/assets/windows.png';
import fedoraLogo from '@/assets/fedora.png';
import debianLogo from '@/assets/debian.png';
import kaliLogo from '@/assets/kali.png';

const currencies = {
    INR: { symbol: '₹', name: 'Indian Rupee', rate: 1 },
    USD: { symbol: '$', name: 'US Dollar', rate: 0.012 },
    EUR: { symbol: '€', name: 'Euro', rate: 0.011 },
};

// TAITANHOSTING Specific Plans
const vpsPlans = [
    { id: 1, name: 'Emerald Plan', cpuType: 'Intel Xeon E5', cores: 4, ram: 16, ssd: 80, priceINR: 600 },
    { id: 2, name: 'Netherite Plan', cpuType: 'Intel Xeon E5', cores: 6, ram: 24, ssd: 100, priceINR: 700 },
    { id: 3, name: 'Titan Plan', cpuType: 'Intel Xeon E5', cores: 8, ram: 32, ssd: 128, priceINR: 900 },
];

const operatingSystems = [
    { name: 'Ubuntu', logo: ubuntuLogo }, { name: 'Windows', logo: windowsLogo }, { name: 'Fedora', logo: fedoraLogo },
    { name: 'Debian', logo: debianLogo }, { name: 'Kali Linux', logo: kaliLogo },
];

const VpsPricing = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('INR');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const currentCurrency = currencies[selectedCurrency as keyof typeof currencies];

    return (
        <div 
            className="min-h-screen text-white" 
            style={{ 
                backgroundImage: `url('/background.png')`, 
                backgroundAttachment: 'fixed', 
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <section className="container mx-auto px-4 py-20 pt-32 bg-black/40 min-h-screen">
                
                {/* Header Section */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <div className="text-center">
                        <h2 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2">TaitanHosting Premium</h2>
                        <h1 className="text-4xl md:text-6xl font-bold mb-2">VPS Hosting <span className="text-blue-400">Solutions</span></h1>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">High-performance Intel Xeon E5 servers optimized for Minecraft and heavy web workloads.</p>
                        
                        <div className="mt-6 inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/50 px-4 py-1 rounded-full text-blue-300 text-xs font-semibold">
                            <Zap size={14} /> First Purchase = 20% OFF!
                        </div>
                    </div>

                    {/* Currency Dropdown */}
                    <div className="flex justify-center md:justify-end mt-6 md:-mt-12">
                        <div className="relative inline-block text-left">
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center">
                                <span className="mr-2">{currentCurrency.symbol} {selectedCurrency}</span>
                                <ChevronDown size={20} />
                            </button>
                            {isDropdownOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                                    <div className="py-1">
                                        {Object.entries(currencies).map(([code, { symbol }]) => (
                                            <button key={code} onClick={() => { setSelectedCurrency(code); setIsDropdownOpen(false); }} className="w-full text-left text-gray-300 block px-4 py-2 text-sm hover:bg-gray-700">
                                                {symbol} {code}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Plans List */}
                <div className="max-w-5xl mx-auto mt-12 space-y-6">
                    {vpsPlans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-500/50 transition-all"
                        >
                            <div className="flex-1">
                                <h3 className="font-bold text-2xl text-white">{plan.name}</h3>
                                <p className="text-gray-400 text-sm">{plan.cpuType} CPU</p>
                            </div>

                            <div className="w-full md:w-auto flex flex-wrap justify-center gap-8 text-sm">
                                <div className="flex flex-col items-center gap-1">
                                    <Cpu size={18} className="text-blue-400"/>
                                    <span className="text-[10px] text-gray-500 uppercase">Cores</span>
                                    <span className="font-bold">{plan.cores} vCores</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <MemoryStick size={18} className="text-purple-400"/>
                                    <span className="text-[10px] text-gray-500 uppercase">RAM</span>
                                    <span className="font-bold">{plan.ram} GB DDR4</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <HardDrive size={18} className="text-emerald-400"/>
                                    <span className="text-[10px] text-gray-500 uppercase">Storage</span>
                                    <span className="font-bold">{plan.ssd} GB NVMe</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="font-bold text-3xl whitespace-nowrap">
                                        {currentCurrency.symbol}{(plan.priceINR * currentCurrency.rate).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-400">/month</p>
                                </div>
                                <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20">
                                    Order Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Features Section */}
                <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700">
                        <Shield className="mx-auto mb-4 text-blue-400" size={32} />
                        <h4 className="font-bold mb-2">DDoS Protection</h4>
                        <p className="text-sm text-gray-400">Advanced 🛡️ protection for your servers.</p>
                    </div>
                    <div className="p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700">
                        <Headset className="mx-auto mb-4 text-blue-400" size={32} />
                        <h4 className="font-bold mb-2">24/7 Support</h4>
                        <p className="text-sm text-gray-400">Expert help whenever you need it.</p>
                    </div>
                    <div className="p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700">
                        <Zap className="mx-auto mb-4 text-blue-400" size={32} />
                        <h4 className="font-bold mb-2">99.9% Uptime</h4>
                        <p className="text-sm text-gray-400">Reliable and fast connectivity.</p>
                    </div>
                </div>

                {/* Operating Systems */}
                <div className="mt-24 pb-20">
                     <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold">Choose your <span className="text-blue-400">OS</span></h2>
                    </div>
                    <div className="flex justify-center flex-wrap gap-6">
                        {operatingSystems.map((os, index) => (
                            <motion.div 
                                key={os.name} 
                                initial={{ opacity: 0, scale: 0.8 }} 
                                whileInView={{ opacity: 1, scale: 1 }} 
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center gap-3 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl w-28 h-28 justify-center border border-gray-700 hover:border-blue-500 transition-all"
                            >
                                <img src={os.logo} alt={os.name} className="w-12 h-12 object-contain" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">{os.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VpsPricing;
                                                
