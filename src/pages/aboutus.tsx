import { motion } from 'framer-motion';
import { Users, Zap, Shield, Heart } from 'lucide-react';

// Updated Team Data based on your request
const teamMembers = [
    { 
        name: 'Aakash', 
        role: 'Founder', 
        image: 'https://placehold.co/500x500/1E293B/FFFFFF?text=Aakash' 
    },
    { 
        name: 'Me.Hacker', 
        role: 'Founder', 
        image: 'https://placehold.co/500x500/1E293B/FFFFFF?text=MH' 
    },
    { 
        name: 'DarkPrince', 
        role: 'Web Developer', 
        image: 'https://placehold.co/500x500/1E293B/FFFFFF?text=DP' 
    },
];

// Company Values Data
const coreValues = [
    { icon: Zap, title: 'Performance', description: 'We are obsessed with speed and low latency to deliver the best experience.' },
    { icon: Shield, title: 'Security', description: 'Keeping your servers and data secure is our top priority.' },
    { icon: Heart, title: 'Customer Support', description: 'Our team is always ready to help you 24/7 with a fast and friendly response.' },
    { icon: Users, title: 'Community', description: 'We build more than just a service; we build a community.' },
];

const AboutUs = () => {
    return (
        <div className="min-h-screen text-white bg-transparent">
            {/* Background Image Wrapper */}
            <div 
                className="fixed inset-0 -z-10" 
                style={{ 
                    backgroundImage: `url('/background.png')`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                }} 
            />

            <div className="container mx-auto px-4 py-20 pt-32">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.7 }} 
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl md:text-6xl font-black uppercase italic mb-4">
                        About <span className="text-blue-500">Titan</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto italic">
                        Providing high-performance hosting solutions with leading technology for developers, gamers, and businesses worldwide.
                    </p>
                </motion.div>

                {/* Our Mission */}
                <div className="text-center mb-24">
                    <motion.h2 
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-black uppercase italic mb-6"
                    >
                        Our <span className="text-blue-500">Mission</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-400 max-w-4xl mx-auto leading-relaxed text-sm md:text-base"
                    >
                        Our mission is to empower creativity and innovation by providing reliable, fast, and secure server infrastructure. We believe that everyone deserves access to high-quality hosting without compromising on performance or security. At Titan Hosting, we are committed to being the trusted hosting partner for your every project, from the smallest to enterprise scale.
                    </motion.p>
                </div>

                {/* Our Team - Updated with your names */}
                <div className="mb-24">
                    <motion.h2 
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-black uppercase italic text-center mb-12"
                    >
                        Meet The <span className="text-blue-500">Legends</span>
                    </motion.h2>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        {teamMembers.map((member, index) => (
                            <motion.div 
                                key={member.name}
                                initial={{ opacity: 0, scale: 0.9 }} 
                                whileInView={{ opacity: 1, scale: 1 }} 
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-32 h-32 md:w-44 md:h-44 mx-auto rounded-full object-cover border-4 border-white/5 group-hover:border-blue-500/50 transition-all duration-300 relative z-10 shadow-2xl" 
                                    />
                                </div>
                                <h3 className="font-black text-xl uppercase italic mb-1">{member.name}</h3>
                                <p className="text-blue-500 text-xs font-bold tracking-widest uppercase">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Our Values */}
                <div className="pb-20">
                    <motion.h2 
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-black uppercase italic text-center mb-12"
                    >
                        Core <span className="text-blue-500">Values</span>
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreValues.map((value, index) => (
                            <motion.div 
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors"
                            >
                                <value.icon className="w-10 h-10 text-blue-500 mb-6" />
                                <h3 className="font-black text-lg uppercase italic mb-3">{value.title}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;
