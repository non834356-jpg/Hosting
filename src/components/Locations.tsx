import { motion } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';
// flag Netherlands hata diya hai, India add kiya hai
import IndiaFlag from '../icons/flags/IndiaFlag'; 

const serverLocations = [
  // US aur Netherlands hata diya hai
  {
    country: 'India',
    // Premium specs for India node
    specs: 'AMD Ryzen™ 9 7950X / Dual Intel® Xeon®',
    flag: IndiaFlag,
    // India ki average position world map par [0a0a0a theme ke liye perfect]
    position: { top: '48%', left: '71%' }, 
  },
];

const Locations = () => {
  return (
    <section id="locations" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* === Header Section === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="bg-blue-600/20 text-blue-300 text-sm font-semibold px-4 py-1 rounded-full inline-flex items-center gap-2 border border-blue-500/20 shadow-lg shadow-blue-500/10">
            <Globe size={14}/>
            Core Infrastructure
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 tracking-tight">
            Our <span className="text-blue-400">Locations</span>
          </h2>
          <p className="text-lg text-gray-400 mt-2 max-w-3xl mx-auto">
            Strategically positioned server in India for unbeatable low-latency and premium performance across Asia.
          </p>
        </motion.div>

        {/* === Info Lokasi di atas Peta === */}
        <div className="flex justify-center flex-wrap gap-x-12 gap-y-6 mb-12">
            {serverLocations.map(loc => (
                <motion.div 
                    key={loc.country}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 rounded-2xl shadow-xl hover:border-blue-500/50 transition-colors"
                >
                    {/* Check karo agar flag component exist karta hai ya placeholder add karo */}
                    {loc.flag ? (
                        <loc.flag className="w-10 h-10 rounded-full object-cover shadow-md" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                            <MapPin className="text-gray-600" size={20}/>
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-white text-lg">{loc.country}</h3>
                        <p className="text-sm text-gray-400">{loc.specs}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* === Peta Dunia dengan Titik Denyut Di India === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          // Added subtle background color overlap to map for better blending with deep dark theme
          className="relative w-full max-w-5xl mx-auto aspect-[2/1] rounded-3xl overflow-hidden bg-gray-900/10"
        >
          <img 
            src="/map.svg" 
            alt="India Server Location Map" 
            className="absolute top-0 left-0 w-full h-full object-contain opacity-80" 
          />

          {/* Titik Lokasi - Pointing specifically at India */}
          {serverLocations.map((loc) => (
            <div
              key={loc.country}
              className="absolute group z-10"
              style={{ top: loc.position.top, left: loc.position.left }}
            >
              <div className="relative flex justify-center items-center">
                {/* Ping Animation - Bigger and stronger pulse for single location */}
                <div className="absolute w-8 h-8 rounded-full bg-blue-500 animate-ping opacity-60"></div>
                {/* Single stronger core point for single location */}
                <div className="w-3 h-3 rounded-full bg-blue-400 border border-white shadow-[0_0_10px_rgba(59,130,246,1)] z-10"></div>
                
                {/* Tooltip on hover */}
                <div className="absolute top-full mt-2 bg-gray-900/90 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-gray-700">
                    India Node (Lag-Free Zone)
                </div>
              </div>
            </div>
          ))}
          
          {/* subtle radial overlay for blending map with deep black */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,10,10,0)_0%,rgba(10,10,10,0.8)_85%)] pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
