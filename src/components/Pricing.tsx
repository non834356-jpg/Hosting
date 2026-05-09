import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, MonitorDot, Server, Gamepad2, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const currencies = {
  INR: { symbol: '₹', name: 'Indian Rupee', rate: 1 },
  USD: { symbol: '$', name: 'US Dollar', rate: 0.012 },
  EUR: { symbol: '€', name: 'Euro', rate: 0.011 },
};

const pricingPlans = [
  {
    title: 'Bot Hosting',
    icon: Bot,
    image: '/discord.jpeg',
    priceINR: 30,
    features: ['ECC Memory', 'Fast Performance', 'Low Latency', 'Advanced security', 'Managed services'],
    buttonText: 'Order Now',
    popular: true,
    link: '/discord',
  },
  {
    title: 'Game Servers',
    icon: Gamepad2,
    image: '/minecraft.jpeg',
    priceINR: 20,
    features: ['Instant deployment', 'DDoS protection', '24/7 support', 'Custom configurations', 'Mod support'],
    buttonText: 'View More',
    popular: false,
    link: '/minecraft',
  },
  {
    title: 'VPS Hosting',
    icon: Server,
    image: '/vps.jpeg',
    priceINR: 350,
    features: ['Full root access', 'SSD storage', '99.9% uptime', 'Multiple OS options', 'Backup included'],
    buttonText: 'Order Now',
    popular: false,
    link: '/vps',
  },
  {
    title: 'RDP Servers',
    icon: MonitorDot,
    image: '/rdp.jpeg',
    priceINR: 500,
    features: ['Windows OS', 'Admin Access', 'High Bandwidth', 'Secure Connection', 'Instant Setup'],
    buttonText: 'Order Now',
    popular: false,
    link: '/rdp',
  },
];

const Pricing = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentCurrency = currencies[selectedCurrency as keyof typeof currencies];

  return (
    <section id="pricing" className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-white">Simple Pricing <span className="text-blue-400">Plans</span></h2>
            <p className="text-gray-400 mt-2">Choose the perfect plan for your needs.</p>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-700"
            >
              {currentCurrency.symbol} {selectedCurrency} <ChevronDown size={18} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                {Object.keys(currencies).map((code) => (
                  <button 
                    key={code}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                    onClick={() => { setSelectedCurrency(code); setIsDropdownOpen(false); }}
                  >
                    {code}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden group hover:border-blue-500 transition-all duration-300 flex flex-col"
            >
              {/* Popular Badge Style */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] uppercase font-bold px-4 py-1 rounded-b-lg z-20">
                  Most Popular
                </div>
              )}
              
              {/* Image Header Background Style - Exactly like your code */}
              <div 
                className="h-40 bg-cover bg-center relative" 
                style={{ backgroundImage: `url(${plan.image})` }}
              >
                <div className="h-full w-full bg-black/60 flex items-end p-6">
                    <div className="flex items-center gap-2">
                        <plan.icon className="text-blue-400" size={24} />
                        <h3 className="text-xl font-bold text-white">{plan.title}</h3>
                    </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-400 text-sm">Starting at</p>
                <p className="text-4xl font-bold text-white my-2">
                    {currentCurrency.symbol}{(plan.priceINR * currentCurrency.rate).toFixed(2)}
                    <span className="text-sm font-medium text-gray-400">/mo</span>
                </p>
                
                <ul className="space-y-3 my-6 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-300">
                        <Check className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.link}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg active:scale-95">
                        {plan.buttonText}
                    </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
