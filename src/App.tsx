import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Komponen Layout & Global
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

// Komponen Halaman Utama (Main Sections)
import Hero from './components/Hero';
import Features from './components/Features';
import Locations from './components/Locations';
import Pricing from './components/Pricing';
import Questions from './components/Questions';
import Experience from './components/Experience';
import Reviews from './components/Reviews';
import Cta from './components/Cta';

// Import Semua Halaman Page
import DiscordPricing from './pages/discord';
import RdpPricing from './pages/Rdp';
import MinecraftPricing from './pages/minecraft';
import VpsPricing from './pages/vps';
import AboutUs from './pages/aboutus';
import Support from './pages/support';
import TOS from './pages/tos';
import PrivacyPolicy from './pages/privacy';
import StatusPage from './pages/status';

// Naya Checkout Page (Razorpay Integration ke liye)
import Checkout from './pages/Checkout';

// Komponen untuk scroll ke atas saat ganti halaman
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Home Page Layout
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
      {/* Har page change par screen top par reset hogi */}
      <ScrollToTop />
      
      <div className="min-h-screen bg-[#0a0a0a] selection:bg-blue-500/30 selection:text-blue-400">
        <Navbar />
        
        <main>
          <Routes>
            {/* 1. Main Landing Page */}
            <Route path="/" element={<Home />} />

            {/* 2. Service Pages */}
            <Route path="/discord" element={<DiscordPricing />} />
            <Route path="/minecraft" element={<MinecraftPricing />} />
            <Route path="/vps" element={<VpsPricing />} />
            <Route path="/rdp" element={<RdpPricing />} />

            {/* 3. Payment & Order Page */}
            <Route path="/checkout" element={<Checkout />} />

            {/* 4. More Information Pages */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/tos" element={<TOS />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/status" element={<StatusPage />} />

            {/* 5. 404 Page (Agar koi wrong URL dale) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
