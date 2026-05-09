import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, MemoryStick, ChevronLeft, ChevronRight, ChevronDown, Shield, Headset, Zap } from 'lucide-react';

// --- Placeholder Imports for OS Logos ---
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

// Updated Plans based on TaitanHosting Specs
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
        <div className="min-h-screen text-white bg-slate-950" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.2) 0%, rgba(2, 6, 23, 1) 100%)`, backgroundAttachment: 'fixed' }}>
            <section className="container mx-auto px-4 py-20">
                
                {/* Branding Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-2">TaitanHosting Premium</h2>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Powerful <span className="text-blue-400">VPS</span> Solutions</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">High-performance Intel Xeon E5 servers optimized for Minecraft and heavy web hosting workloads.</p>
                    
                    {/* Special Offer Badge */}
                    <div className="mt-6 inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/50 px-4 py-2 rounded-full text-blue-300 text-sm font-semibold">
                        <Zap size={16} /> First Purchase: 20% OFF!
                    </div>
                </motion.div>

                {/* Currency Selector */}
                <div className="flex justify-end max-w-5xl mx-auto mb-6">
                    <div className="relative">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-all">
                            {currentCurrency.symbol} {selectedCurrency} <ChevronDown size={16} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                                {Object.entries(currencies).map(([code, { symbol }]) => (
                                    <button key={code} onClick={() => { setSelectedCurrency(code); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-blue-600 transition-colors first:rounded-t-lg last:rounded-b-lg">
                                        {symbol} {code}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
                    {vpsPlans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-500/50 transition-all shadow-lg"
                        >
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{plan.name}</h3>
                                <p className="text-gray-500 text-sm">{plan.cpuType} Processor</p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-6 flex-[2]">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-blue-500/10 rounded-lg"><Cpu size={20} className="text-blue-400"/></div>
                                    <div><p className="text-xs text-gray-500">CPU</p><p className="font-bold">{plan.cores} Cores</p></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-purple-500/10 rounded-lg"><MemoryStick size={20} className="text-purple-400"/></div>
                                    <div><p className="text-xs text-gray-500">RAM</p><p className="font-bold">{plan.ram} GB DDR4</p></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg"><HardDrive size={20} className="text-emerald-400"/></div>
                                    <div><p className="text-xs text-gray-500">NVMe SSD</p><p className="font-bold">{plan.ssd} GB</p></div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-3xl font-black text-white">
                                        {currentCurrency.symbol}{(plan.priceINR * currentCurrency.rate).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500">per month</p>
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20">
                                    Order Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Features Section */}
                <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-gray-900/30 rounded-xl border border-gray-800">
                        <Shield className="mx-auto mb-4 text-blue-400" size={32} />
                        <h4 className="font-bold mb-2">DDoS Protection</h4>
                        <p className
                                      
