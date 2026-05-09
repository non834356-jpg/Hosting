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
                
                {/* Header Section */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-2">TaitanHosting Premium</h2>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Powerful <span className="text-blue-400">VPS</span> Solutions</h1>
                    <div className="mt-6 inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/50 px-4 py-2 rounded-full text-blue-300 text-sm font-semibold">
                        <Zap size={16} /> First Purchase: 20% OFF!
                    </div>
                </motion.div>

                {/* Currency Dropdown */}
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

                {/* Plans List */}
                <div className="max-w-5xl mx-auto space-y-6">
                    {vpsPlans.map((plan, index) => (
                        <motion.div key={plan.id} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-500/50 transition-all">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                                <p className="text-gray-500 text-sm">{plan.cpuType} Processor</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-6 flex-[2]">
                                <div className="text-center">
                                    <Cpu size={20} className="text-blue-400 mx-auto mb-1"/>
                                    <p className="text-[10px] text-gray-500 uppercase">Cores</p>
                                    <p className="font-bold">{plan.cores} vCores</p>
                                </div>
                                <div className="text-center">
                                    <MemoryStick size={20} className="text-purple-400 mx-auto mb-1"/>
                                    <p className="text-[10px] text-gray-500 uppercase">RAM</p>
                                    <p className="font-bold">{plan.ram} GB</p>
                                </div>
                                <div className="text-center">
                                    <HardDrive size={20} className="text-emerald-400 mx-auto mb-1"/>
                                    <p className="text-[10px] text-gray-500 uppercase">SSD</p>
                                    <p className="font-bold">{plan.ssd} GB NVMe</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-3xl font-black">{currentCurrency.symbol}{(plan.priceINR * currentCurrency.rate).toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">/monthly</p>
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20">Order</button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* OS Grid */}
                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-bold mb-8">Supported Operating Systems</h2>
                    <div className="flex justify-center flex-wrap gap-6">
                        {operatingSystems.map((os) => (
                            <div key={os.name} className="flex flex-col items-center p-4 bg-gray-900/50 rounded-2xl w-28 border border-gray-800">
                                <img src={os.logo} alt={os.name} className="w-10 h-10 mb-2 object-contain" />
                                <span className="text-[10px] font-bold uppercase">{os.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VpsPricing;
                            
