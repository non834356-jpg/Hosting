import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Zap, ArrowLeft, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();

  // Pricing page se data lene ke liye (Fallbacks added)
  const planName = location.state?.planName || "Select a Plan";
  const planPrice = location.state?.price || 0;

  // --- RAZORPAY INTEGRATION FUNCTION ---
  const handlePayment = () => {
    if (planPrice === 0) {
      alert("Please select a valid plan first.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Yahan apni Razorpay Key Id dalein
      amount: planPrice * 100, // Amount dynamic ho gaya (Price * 100 paise)
      currency: "INR",
      name: "TITAN HOSTING",
      description: `Payment for ${planName}`,
      image: "/codex.png",
      handler: function (response: any) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
        // Success logic yahan aayega (e.g., redirect to success page)
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "91XXXXXXXXXX"
      },
      theme: {
        color: "#2563eb" 
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-4">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Dynamic Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Order <span className="text-blue-400">Summary</span></h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-4 border-b border-white/5">
                <div>
                  <h4 className="font-semibold text-lg">{planName}</h4>
                  <p className="text-sm text-gray-400">High Performance Node</p>
                </div>
                <span className="font-bold text-xl text-blue-400">₹{planPrice}.00</span>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Setup Fee</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>DDoS Protection</span>
                <span className="text-green-400">INCLUDED</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-3xl font-bold pt-4 border-t border-white/10">
              <span className="text-lg font-medium text-gray-400">Total Bill</span>
              <span className="text-blue-500">₹{planPrice}.00</span>
            </div>
          </motion.div>

          {/* Right: Payment Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Shield className="text-blue-400" size={20} />
                Secure Checkout
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <Zap className="text-blue-400" size={18} />
                  </div>
                  <p className="text-sm text-gray-400">Server activation begins immediately after payment.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-600/20 p-2 rounded-lg">
                    <ShieldCheck className="text-green-400" size={18} />
                  </div>
                  <p className="text-sm text-gray-400">Payment is secured by Razorpay encrypted gateway.</p>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={planPrice === 0}
                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform ${
                  planPrice === 0 
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] shadow-lg shadow-blue-600/30'
                }`}
              >
                <CreditCard size={20} />
                {planPrice === 0 ? 'Select a Plan First' : `Pay ₹${planPrice} now`}
              </button>

              <div className="mt-6 flex flex-col items-center gap-2 opacity-60">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-4 invert" />
                <p className="text-[10px] text-gray-500">UPI • CARDS • NETBANKING • WALLETS</p>
              </div>
            </div>

            <div className="text-center px-4">
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                By clicking pay, you agree to our Terms of Service.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
            
