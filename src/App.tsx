import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Komponen Halaman Utama
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Locations from './components/Locations';
import Pricing from './components/Pricing';
import Questions from './components/Questions';
import Experience from './components/Experience';
import Reviews from './components/Reviews';
import Cta from './components/Cta';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

// Import semua halaman layanan
import DiscordPricing from './pages/discord';
import MinecraftPricing from './pages/minecraft';
import VpsPricing from './pages/vps';
import RdpPricing from './pages/Rdp'; // RDP page add kiya

// More pages
import AboutUs from './pages/aboutus';
import Support from './pages/support';
import TOS from './pages/tos';
import PrivacyPolicy from './pages/privacy';
import StatusPage from './pages/status';

// Razorpay Checkout Page
import Checkout from './pages/Checkout';

// Komponen scroll ke atas (UX fix)
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Home Page Layout (Author style)
const Home = () => (
  <>
    <Hero />
    <Features />
    <Locations />
    <Pricing />
    <Questions />
    <Experience />
    <Reviews />
    <Cta />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      {/* Main Wrapper: 
          Author ne pehle background skip kiya tha, 
          maine yahan #0a0a0a aur fixed background add kiya hai glitch fix karne ke liye.
      */}
      <div className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 selection:text-blue-400">
        
        {/* Global Background Layer (Fixed & Glitch-free) */}
        <div 
          className="fixed inset-0 z-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: "url('/background.png')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }} 
        />

        {/* Website Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Main Landing Page */}
              <Route path="/" element={<Home />} />

              {/* Halaman Layanan (Pricing) */}
              <Route path="/discord" element={<DiscordPricing />} />
              <Route path="/minecraft" element={<MinecraftPricing />} />
              <Route path="/vps" element={<VpsPricing />} />
              <Route path="/rdp" element={<RdpPricing />} />

              {/* Checkout Route for Razorpay */}
              <Route path="/checkout" element={<Checkout />} />

              {/* Halaman Informasi */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/support" element={<Support />} />
              <Route path="/tos" element={<TOS />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/status" element={<StatusPage />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
                
