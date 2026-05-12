import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../components/firebase'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Signup validation
        if (!isLogin && password !== confirmPassword) {
            return toast.error("Passwords match nahi ho rahe!");
        }

        setLoading(true);
        const loadToast = toast.loading(isLogin ? 'Logging in...' : 'Creating account...');
        
        try {
            if (isLogin) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                localStorage.setItem('user', JSON.stringify({ 
                    name: userCredential.user.displayName || 'User', 
                    email: userCredential.user.email 
                }));
                toast.success('Welcome back!', { id: loadToast });
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: name });
                localStorage.setItem('user', JSON.stringify({ name, email }));
                toast.success('Account created successfully!', { id: loadToast });
            }

            window.dispatchEvent(new Event("storage")); 
            setTimeout(() => navigate('/'), 1500); 
        } catch (error: any) {
            toast.error(error.message, { id: loadToast });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
            <Toaster position="top-center" reverseOrder={false} />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-gray-900/60 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
                        {isLogin ? 'Login ' : 'Join '}
                        <span className="text-blue-500">Titan</span>
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative group">
                            <User className="absolute left-4 top-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input 
                                type="text" placeholder="Full Name"
                                className="w-full bg-black/50 border border-gray-800 rounded-2xl py-4 px-12 text-white outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                required value={name} onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="relative group">
                        <Mail className="absolute left-4 top-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                            type="email" placeholder="Email Address"
                            className="w-full bg-black/50 border border-gray-800 rounded-2xl py-4 px-12 text-white outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                            required value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-4 top-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                            type="password" placeholder="Password"
                            className="w-full bg-black/50 border border-gray-800 rounded-2xl py-4 px-12 text-white outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                            required value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* REPEAT PASSWORD FIELD */}
                    <AnimatePresence>
                        {!isLogin && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="relative group"
                            >
                                <ShieldCheck className="absolute left-4 top-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input 
                                    type="password" placeholder="Confirm Password"
                                    className="w-full bg-black/50 border border-gray-800 rounded-2xl py-4 px-12 text-white outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-blue-500/20"
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Login Now' : 'Create Account')} 
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-8 font-medium">
                    {isLogin ? "New to TitanHosting?" : "Already a member?"}
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-400 font-bold ml-2 hover:text-blue-300 underline-offset-4 hover:underline"
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default Auth;
