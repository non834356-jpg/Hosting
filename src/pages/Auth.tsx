import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Yahan aap Firebase ya Backend logic add karenge
        console.log("User Data:", { name, email, password });
        
        // Login ke baad user ko home ya checkout par bhej sakte hain
        alert(`${isLogin ? 'Login' : 'Signup'} Successful!`);
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                        {isLogin ? 'Welcome ' : 'Create '}
                        <span className="text-blue-500">Account</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                        {isLogin ? 'Manage your servers and orders' : 'Join TaitanHosting community today'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
                            <input 
                                type="text" 
                                placeholder="Full Name"
                                className="w-full bg-black/40 border border-gray-700 rounded-xl py-3 px-10 text-white focus:border-blue-500 outline-none transition-all"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
                        <input 
                            type="email" 
                            placeholder="Email Address"
                            className="w-full bg-black/40 border border-gray-700 rounded-xl py-3 px-10 text-white focus:border-blue-500 outline-none transition-all"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
                        <input 
                            type="password" 
                            placeholder="Password"
                            className="w-full bg-black/40 border border-gray-700 rounded-xl py-3 px-10 text-white focus:border-blue-500 outline-none transition-all"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                        {isLogin ? 'Login Now' : 'Create Account'} <ArrowRight size={18} />
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between gap-4">
                    <hr className="flex-1 border-gray-800" />
                    <span className="text-gray-500 text-xs uppercase font-bold">OR</span>
                    <hr className="flex-1 border-gray-800" />
                </div>

                <button className="w-full mt-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                    <Github size={18} /> Continue with GitHub
                </button>

                <p className="text-center text-gray-500 text-sm mt-8">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-400 font-bold ml-2 hover:underline"
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default Auth;
