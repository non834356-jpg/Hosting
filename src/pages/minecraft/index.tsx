import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, MemoryStick, Shield } from 'lucide-react';

// Minecraft Logo (Aapka asset path sahi rakhein)
import minecraftLogo from '@/assets/minecraft.png';

// --- India Flag Component ---
const IndiaFlag = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
        <path fill="#f4c430" d="M0 0h640v160H0z"/><path fill="#fff" d="M0 160h640v160H0z"/><path fill="#228b22" d="M0 320h640v160H0z"/>
        <circle cx="320" cy="240" r="60" fill="none" stroke="#000080" strokeWidth="4"/>
    </svg>
);

// Updated Plans Based on your requirements
const gamePlans = [
    { id: 1, name: 'Dirt Plan', ram: 2, cpu: 50, ssd: 6, price: 20, oldPrice: null },
    { id: 2, name: 'Stone Plan', ram: 4, cpu: 100, ssd: 8, price: 50, oldPrice: null },
    { id: 3, name: 'Copper Plan', ram: 8, cpu: 150, ssd: 20, price: 100, oldPrice: null },
    { id: 4, name: 'Iron Plan', ram: 12, cpu: 200, ssd: 30, price: 150, oldPrice: 250 },
    { id: 5, name: 'Diamond Plan', ram: 16, cpu: 250, ssd: 50, price: 250, oldPrice: 350 },
    { id: 6, name: 'Netherite Plan', ram: 32, cpu: 300, ssd: 70, price: 399, oldPrice: 499 },
    { id: 7, name: 'Bedrock Plan', ram: 48, cpu: 400, ssd: 100, price: 499, oldPrice: 800, special: true },
];

const MinecraftPricing = () => {
    return (
        <div className="min-h-screen text-white bg-[#0a0a0a]" style={{ backgroundImage: `url('/background.png')`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
            <section className="container mx-auto px-4 py-20 pt-32">
                
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        <span className="text-green-400">Gamer Servers</span> Plan
                    </h1>
                    <p className="text-gray-400">High-performance Minecraft hosting powered by Ryzen Nodes in India.</p>
                </motion.div>

                <div className="max-w-6xl mx-auto space-y-10">
                    
                    {/* Location Section (Fixed to India) */}
                    <div>
                        <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Server Location</h2>
                        <div className="inline-flex items-center bg-green-600/20 border border-green-600 px-4 py-2 rounded-lg gap-2">
                            <IndiaFlag className="w-6 h-4 rounded-sm"/>
                            <span className="font-bold">India (Mumbai Node)</span>
                        </div>
                    </div>

                    {/* Software Info */}
                    <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700 p-4 rounded-xl flex items-center gap-4 max-w-md">
                        <img src={minecraftLogo} alt="MC" className="w-12 h-12" onError={(e) => e.currentTarget.src = 'https://placehold.co/48x48/10B981/FFFFFF?text=MC'}/>
                        <div>
                            <h3 className="font-bold text-lg">Minecraft Java & Bedrock</h3>
                            <p className="text-xs text-gray-400">Optimized Ryzen 9 Nodes for lag-free gaming.</p>
                        </div>
                    </div>

                    {/* Plans Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gamePlans.map((plan, index) => (
                            <motion.div 
                                key={plan.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className={`relative group bg-gray-900/60 backdrop-blur-sm border ${plan.special ? 'border-orange-500' : 'border-gray-700'} rounded-2xl p-6 hover:border-green-500 transition-all`}
                            >
                                {plan.special && (
                                    <span className="absolute -top-3 right-4 bg-orange-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                                        BEST VALUE 🔥
                                    </span>
                                )}
                                
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    {plan.name}
                                </h3>

                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3 text-gray-300">
                                        <MemoryStick size={18} className="text-green-400"/> {plan.ram} GB RAM
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-300">
                                        <Cpu size={18} className="text-green-400"/> Ryzen CPU {plan.cpu}%
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-300">
                                        <HardDrive size={18} className="text-green-400"/> {plan.ssd} GB NVMe SSD
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-300">
                                        <Shield size={18} className="text-green-400"/> DDoS Protected
                                    </li>
                                </ul>

                                <div className="mt-auto">
                                    <div className="mb-4">
                                        {plan.oldPrice && (
                                            <span className="text-gray-500 line-through text-sm mr-2">₹{plan.oldPrice}</span>
                                        )}
                                        <span className="text-3xl font-black text-white">₹{plan.price}</span>
                                        <span className="text-gray-400 text-sm">/mo</span>
                                    </div>
                                    <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-green-900/20">
                                        Buy Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MinecraftPricing;

