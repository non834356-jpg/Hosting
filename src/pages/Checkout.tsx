import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, ShieldCheck, Zap, ArrowLeft, Shield, User, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);

  // Pricing page se data fetch
  const planName = location.state?.planName || "Select a Plan";
  const planPrice = location.state?.price || 0;

  // --- REDIRECT & LOGIN CHECK ---
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      // Agar login nahi hai toh 2 second baad bhej do
      toast.error("please login first!", { position: "bottom-center" });
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setUserData(JSON.parse(savedUser));
    }
  }, [navigate]);

  // --- DISCORD NOTIFICATION LOGIC ---
  const sendDiscordNotification = (details: any) => {
    const webhookURL = "YOUR_DISCORD_WEBHOOK_URL_HERE"; // <--- Apna Webhook URL yahan dalein

    const message = {
      username: "TitanHosting Orders",
      embeds: [
        {
          title: "🚀 New Server Order Received!",
          color: 5814783, // Elegant Blue
          fields: [
            { name: "👤 Customer", value: details.name, inline: true },
            { name: "📧 Email", value: details.email, inline: true },
            { name: "📦 Plan", value: details.plan, inline: false },
            { name: "💰 Price", value: `₹${details.amount}`, inline: true },
            { name: "🆔 Transaction ID", value: `\`${details.paymentId}\``, inline: false },
          ],
          footer: { text: "Manual Delivery Required: Check email and panel." },
          timestamp: new Date(),
        },
      ],
    };

    fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  };

  // --- RAZORPAY PAYMENT ---
  const handlePayment = () => {
    if (planPrice === 0) {
      toast.error("Koi plan select karein!");
      return;
    }

    const loadToast = toast.loading("Secure connection ban raha hai...", { position: "top-center" });

    const options = {
      key: "rzp_test_SoMB2yauQypoLR", // <--- Apni Razorpay Key dalein
      amount: planPrice * 100,
      currency: "INR",
      name: "TITAN HOSTING",
      description: `Payment for ${planName}`,
      image: "/logo.png",
      handler: async function (response: any) {
        toast.dismiss(loadToast);
        
        const orderDetails = {
          paymentId: response.razorpay_payment_id,
          name: userData?.name,
          email: userData?.email,
          plan: planName,
          amount: planPrice,
        };

        // Discord par order details bhejna
        sendDiscordNotification(orderDetails);

        // Stylish Middle Toast
        toast.success(
          (t) => (
            <span className="text-center font-medium">
              Payment Successful! ✅ <br /> 
              Server details 15-30 min mein aapke <b>{userData?.email}</b> par bhej di jayengi.
            </span>
          ),
          { duration: 6000, position: "top-center" }
        );

        setTimeout(() => navigate('/'), 4000); 
      },
      prefill: {
        name: userData?.name,
        email: userData?.email,
      },
      theme: { color: "#3b82f6" },
      modal: {
        ondismiss: () => {
          toast.dismiss(loadToast);
          toast.error("Payment cancel kar di gayi.", { position: "top-center" });
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-4 relative">
      {/* Toast Container for Middle Alerts */}
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Plans</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-gray-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl">
              <h2 className="text-2xl font-black uppercase italic mb-6">Order <span className="text-blue-500">Details</span></h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <div>
                    <h4 className="font-bold text-lg">{planName}</h4>
                    <p className="text-xs text-gray-500 italic">High Performance Node</p>
                  </div>
                  <span className="font-black text-xl text-blue-400">₹{planPrice}</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-sm font-bold text-gray-500">TOTAL BILL</span>
                  <span className="text-3xl font-black text-blue-500">₹{planPrice}</span>
                </div>
              </div>
            </div>

            {/* User Profile Info */}
            <div className="bg-blue-600/5 border border-blue-500/20 p-6 rounded-3xl">
               <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">Billing To:</p>
               <div className="flex items-center gap-3 mb-2">
                  <User size={16} className="text-gray-400" />
                  <span className="font-bold text-gray-200">{userData?.name || '---'}</span>
               </div>
               <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-400">{userData?.email || '---'}</span>
               </div>
            </div>
          </motion.div>

          {/* Payment Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-gray-900/60 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Shield className="text-blue-500" size={20} /> Secure Checkout
              </h3>

              <div className="space-y-5 mb-10">
                <div className="flex gap-4">
                  <Zap className="text-blue-500 shrink-0" size={20} />
                  <p className="text-xs text-gray-400 leading-relaxed">Server setup start ho jayega jaise hi payment verify hogi.</p>
                </div>
                <div className="flex gap-4">
                  <ShieldCheck className="text-green-500 shrink-0" size={20} />
                  <p className="text-xs text-gray-400 leading-relaxed">Aapka data Razorpay 256-bit encryption se secured hai.</p>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={!userData || planPrice === 0}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl transition-all active:scale-95 shadow-xl shadow-blue-600/20"
              >
                PAY ₹{planPrice} NOW
              </button>

              <div className="mt-8 flex justify-center opacity-30 grayscale hover:grayscale-0 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-4 invert" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
            
