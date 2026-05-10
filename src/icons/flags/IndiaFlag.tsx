// src/icons/flags/IndiaFlag.tsx
const IndiaFlag = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" className={className}>
    {/* Saffron (Top) */}
    <path fill="#FF9933" d="M32 2C18.9 2 7.8 10.3 3.7 22h56.6C56.2 10.3 45.1 2 32 2"/>
    
    {/* Green (Bottom) */}
    <path fill="#138808" d="M32 62c13.1 0 24.2-8.3 28.3-20H3.7C7.8 53.7 18.9 62 32 62"/>
    
    {/* White (Middle) */}
    <path fill="#fff" d="M3.7 22C2.6 25.1 2 28.5 2 32s.6 6.9 1.7 10h56.6c1.1-3.1 1.7-6.5 1.7-10s-.6-6.9-1.7-10z"/>
    
    {/* Ashoka Chakra (Blue Wheel) */}
    <circle cx="32" cy="32" r="6" fill="none" stroke="#000080" strokeWidth="0.5"/>
    <circle cx="32" cy="32" r="1" fill="#000080"/>
    {[...Array(24)].map((_, i) => (
      <line
        key={i}
        x1="32"
        y1="32"
        x2={32 + 6 * Math.cos((i * 15 * Math.PI) / 180)}
        y2={32 + 6 * Math.sin((i * 15 * Math.PI) / 180)}
        stroke="#000080"
        strokeWidth="0.2"
      />
    ))}
  </svg>
);

export default IndiaFlag;
