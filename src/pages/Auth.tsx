import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// CORRECT PATH: Ek level up, phir components folder ke andar
import { auth } from '../components/firebase'; 
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile 
} from 'firebase/auth';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            if (isLogin) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                localStorage.setItem('user', JSON.stringify({ 
                    name: userCredential.user.displayName || 'User', 
                    email: userCredential.user.email 
                }));
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: name });
                localStorage.setItem('user', JSON.stringify({ name, email }));
            }

            // Refresh Fix: Navbar ko update karne ke liye event trigger karein
            window.dispatchEvent(new Event("storage")); 
            navigate('/'); 
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-gray-900/40 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                        {isLogin ? 'Welcome ' : 'Create '}
                        <span className="text-blue-500">Account</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-2 font-medium">
                        Manage your TitanHosting account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
                            <input 
                                type="text" 
                                placeholder="Full Name"
                                className="w-full bg-black/40 border border-gray-700 rounded-xl py-3 px-10 text-white outline-none focus:border-blue-500 transition-all"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
                        <input 
                            type="email" 
                            placeholder="Email Address"
                            className="w-full bg-black/40 border border-gray-700 rounded-xl py-3 px-10 text-white outline-none focus:border-blue-500 transition-all"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
                        <input 
                            type="password" 
                            placeholder="Password"
                            className="w-full bg-black/40 border border-gray-700 rounded-xl py-3 px-10 text-white outline-none focus:border-blue-500 transition-all"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Login Now' : 'Create Account')} 
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

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
