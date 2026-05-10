import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import IndiaFlag from '../icons/flags/IndiaFlag'; 

const serverLocations = [
  {
    country: 'India',
    specs: 'AMD Ryzen™ 9 7950X / Dual Intel® Xeon®',
    flag: IndiaFlag,
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
          <span className="bg-blue-600/20 text-blue-300 text-sm font-semibold px-4 py-1 rounded-full inline-flex items-center gap-2">
            <Globe size={14}/>
            Core Infrastructure
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4">
            Our <span className="text-blue-400">Locations</span>
          </h2>
          <p className="text-lg text-gray-400 mt-2 max-w-3xl mx-auto">
            Strategically positioned server in India for unbeatable low-latency and premium performance across Asia.
          </p>
        </motion.div>

        {/* === Info Lokasi (Transparent Glass Style) === */}
        <div className="flex justify-center mb-12">
            {serverLocations.map(loc => (
                <motion.div 
                    key={loc.country}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4"
                >
                    <loc.flag className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <h3 className="font-semibold text-white text-lg">{loc.country}</h3>
                        <p className="text-sm text-gray-400">{loc.specs}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* === Peta Dunia (Pure Transparent) === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-5xl mx-auto aspect-[2/1]"
        >
          {/* Map image directly on section background */}
          <img 
            src="/map.svg" 
            alt="India Server Location Map" 
            className="absolute top-0 left-0 w-full h-full object-contain" 
          />

          {/* India Pulse Point */}
          {serverLocations.map((loc) => (
            <div
              key={loc.country}
              className="absolute"
              style={{ top: loc.position.top, left: loc.position.left }}
            >
              <div className="relative flex justify-center items-center">
                <div className="absolute w-6 h-6 rounded-full bg-blue-500 animate-ping opacity-75"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 border border-white z-10"></div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
