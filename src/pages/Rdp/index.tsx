import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, MemoryStick, ChevronDown, Shield, Headset, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Navigate import kiya

// --- OS Logo Imports ---
import ubuntuLogo from '@/assets/ubuntu.png';
import windowsLogo from '@/assets/windows.png';
import fedoraLogo from '@/assets/fedora.png';
import debianLogo from '@/assets/debian.png';
import kaliLogo from '@/assets/kali.png';

const currencies = {
    INR: { symbol: '₹', name: 'Indian Rupee', rate: 1 },
    USD: { symbol: '$', name: 'US Dollar', rate: 0.012 },
};

const rdpPlans = [
    { id: 1, name: 'Start Plan', cpuType: 'Intel Xeon E5', cores: 2, ram: 8, ssd: 10, priceINR: 100 },
    { id: 2, name: 'Emerald Plan', cpuType: 'Intel Xeon E5', cores: 4, ram: 16, ssd: 80, priceINR: 400 },
    { id: 3, name: 'Netherite Plan', cpuType: 'Intel Xeon E5', cores: 6, ram: 24, ssd: 100, priceINR: 450 },
    { id: 4, name: 'Titan Plan', cpuType: 'Intel Xeon E5', cores: 8, ram: 32, ssd: 128, priceINR: 500 },
];

const operatingSystems = [
    { name: 'Ubuntu', logo: ubuntuLogo }, { name: 'Windows', logo: windowsLogo }, { name: 'Fedora', logo: fedoraLogo },
    { name: 'Debian', logo: debianLogo }, { name: 'Kali Linux', logo: kaliLogo },
];

const RdpPricing = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('INR');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate(); // 2. Navigate initialize kiya
    
    const currentCurrency = currencies[selectedCurrency as keyof typeof currencies];

    // 3. Handle Order Function
    const handleOrder = (plan: any) => {
        // Price calculation based on current currency
        const finalPrice = Math.round(plan.priceINR * currentCurrency.rate);
        
        navigate('/checkout', { 
            state: { 
                planName: `RDP: ${plan.name}`, 
                price: finalPrice 
            } 
        });
    };

    return (
        <div className="min-h-screen text-white bg-[#0a0a0a]" style={{ backgroundImage: `url('/background.png')`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
            <section className="container mx-auto px-4 py-20 pt-32">
                
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h2 className="text-blue-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-2">TaitanHosting Premium</h2>
                    <h1 className="text-3xl md:text-6xl font-black mb-4 tracking-tighter">
                        PREMIUM <span className="text-blue-400">RDP</span> PLANS
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm">
                        High-performance Remote Desktop solutions. Low latency and full administrator access.
                    </p>
                    
                    <div className="mt-6 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full text-blue-400 text-xs font-bold">
                        <Zap size={14} fill="currentColor" /> FIRST PURCHASE = 20% OFF!
                    </div>
                </motion.div>

                {/* Currency Selector */}
                <div className="flex justify-end max-w-5xl mx-auto mb-8">
                    <div className="relative">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-gray-900/60 backdrop-blur-md border border-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl">
                            <span className="font-bold text-xs">{currentCurrency.symbol} {selectedCurrency}</span>
                            <ChevronDown size={14} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-36 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden">
                                {Object.entries(currencies).map(([code, { symbol }]) => (
                                    <button key={code} onClick={() => { setSelectedCurrency(code); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-blue-600 text-[10px] font-bold transition-colors">
                                        {symbol} {code}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 gap-5">
                    {rdpPlans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-xl p-5 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-500/40 transition-all shadow-lg"
                        >
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tight">{plan.name}</h3>
                                <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">{plan.cpuType} CPU</p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-6 md:gap-12 flex-[2]">
                                <div className="text-center">
                                    <Cpu size={20} className="text-blue-400 mx-auto mb-1 opacity-80"/>
                                    <p className="text-[8px] text-gray-500 uppercase font-black">Cores</p>
                                    <p className="font-bold text-sm">{plan.cores} vCores</p>
                                </div>
                                <div className="text-center">
                                    <MemoryStick size={20} className="text-purple-400 mx-auto mb-1 opacity-80"/>
                                    <p className="text-[8px] text-gray-500 uppercase font-black">RAM</p>
                                    <p className="font-bold text-sm">{plan.ram}GB</p>
                                </div>
                                <div className="text-center">
                                    <HardDrive size={20} className="text-emerald-400 mx-auto mb-1 opacity-80"/>
                                    <p className="text-[8px] text-gray-500 uppercase font-black">SSD</p>
                                    <p className="font-bold text-sm">{plan.ssd}GB</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                                <div className="text-right flex-1 md:flex-none">
                                    <p className="text-2xl font-black text-white">
                                        {currentCurrency.symbol}{(plan.priceINR * currentCurrency.rate).toLocaleString()}
                                    </p>
                                    <p className="text-[8px] text-gray-600 uppercase font-black">/ Monthly</p>
                                </div>
                                {/* 4. HandleOrder call kiya Order button par */}
                                <button 
                                    onClick={() => handleOrder(plan)}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                                >
                                    Order
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Badges */}
                <div className="max-w-5xl mx-auto mt-16 flex flex-wrap justify-center gap-8 opacity-50">
                    <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-widest">
                        <Shield size={16} className="text-blue-500" /> DDoS Protected
                    </div>
                    <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-widest">
                        <Headset size={16} className="text-blue-500" /> 24/7 Support
                    </div>
                    <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-widest">
                        <Zap size={16} className="text-blue-500" /> 99.9% Uptime
                    </div>
                </div>

                {/* OS Grid Section */}
                <div className="mt-24 text-center pb-20">
                    <h2 className="text-[9px] font-black uppercase tracking-[0.4em] mb-10 text-gray-600">Available Systems</h2>
                    <div className="flex justify-center flex-wrap gap-8">
                        {operatingSystems.map((os) => (
                            <div key={os.name} className="flex flex-col items-center group">
                                <div className="p-4 bg-gray-900/40 rounded-xl border border-gray-800 group-hover:border-blue-500/40 transition-all">
                                    <img src={os.logo} alt={os.name} className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all" />
                                </div>
                                <span className="text-[8px] font-black text-gray-600 group-hover:text-gray-400 mt-3 uppercase tracking-widest">{os.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </div>
    );
};

export default RdpPricing;
