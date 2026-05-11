import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Zap, ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  // --- RAZORPAY INTEGRATION FUNCTION ---
  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Yahan apni Razorpay Key Id dalein
      amount: 50000, // Amount in paise (500 INR)
      currency: "INR",
      name: "TITAN HOSTING",
      description: "Premium Hosting Solution",
      image: "/codex.png",
      handler: function (response: any) {
        // Payment success hone ke baad ye code chalega
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
        console.log("Payment Details:", response);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "91XXXXXXXXXX"
      },
      notes: {
        address: "Jharkhand, India"
      },
      theme: {
        color: "#2563eb" // Blue theme to match your brand
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
          {/* Left: Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Order <span className="text-blue-400">Summary</span></h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-4 border-b border-white/5">
                <div>
                  <h4 className="font-semibold">Titan Premium Node</h4>
                  <p className="text-sm text-gray-400">32GB RAM / 8 vCPU</p>
                </div>
                <span className="font-bold">₹500.00</span>
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
              <span className="text-lg font-medium text-gray-400">Total</span>
              <span className="text-blue-500">₹500.00</span>
            </div>
          </motion.div>

          {/* Right: Payment Method Section */}
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
                  <p className="text-sm text-gray-400">Servers are activated instantly after payment confirmation.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-600/20 p-2 rounded-lg">
                    <ShieldCheck className="text-green-400" size={18} />
                  </div>
                  <p className="text-sm text-gray-400">Your transaction is protected by 256-bit SSL encryption.</p>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/30"
              >
                <CreditCard size={20} />
                Pay with Razorpay
              </button>

              <div className="mt-6 flex justify-center gap-4 grayscale opacity-50">
                {/* Yahan payment icons placeholder hain */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-4 invert" />
              </div>
            </div>

            {/* Trust Badges */}
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Money Back Guarantee</p>
              <p className="text-xs text-gray-600">Cancel within 24 hours if you're not satisfied.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

