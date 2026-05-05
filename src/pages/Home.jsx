import React, {useEffect, useState} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { motion } from "framer-motion";

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    return (
        <div className='w-full min-h-[90vh] flex flex-col justify-center py-20 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden'>
            <Container>
                <div className='text-center mb-16 relative z-10'>
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 1, ease: "easeOut" }}
                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 dark:bg-purple-900/40 rounded-full blur-[120px] -z-10 pointer-events-none"
                   />
                   <motion.h1 
                     initial={{ opacity: 0, y: -30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, type: 'spring' }}
                     className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 dark:from-purple-400 dark:via-indigo-400 dark:to-purple-400 tracking-tighter mb-6 pb-2"
                   >
                     Inkspire
                   </motion.h1>
                   <motion.p 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.4, duration: 1 }}
                     className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium"
                   >
                     A mesmerizing platform to share your thoughts. Powered by React, Appwrite, and Framer Motion.
                   </motion.p>
                </div>

                {posts.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: 0.6 }}
                      className="flex flex-wrap justify-center mt-12"
                    >
                        <div className="p-10 w-full max-w-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl text-center shadow-purple-500/10">
                            <h1 className="text-2xl font-bold dark:text-slate-200 mb-4">
                                Welcome to the Community
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400">Login to read incredible posts or check back later.</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.15 }
                            }
                        }}
                        className='flex flex-wrap -mx-3'
                    >
                        {posts.map((post) => (
                            <motion.div 
                                variants={{
                                    hidden: { y: 40, opacity: 0 },
                                    visible: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4 } }
                                }}
                                key={post.$id} 
                                className='p-3 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex'
                            >
                                <PostCard {...post} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </Container>
        </div>
    )
}

export default Home
