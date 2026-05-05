import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userdata);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-16"
        >
            {/* Giant Bleed Banner */}
            <div className="relative w-full h-[50vh] md:h-[60vh] max-h-[700px] overflow-hidden mb-12">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10" />
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                
                <Container>
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20 flex flex-col items-start justify-end h-full">
                        <motion.h1 
                           initial={{ y: 30, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.3 }}
                           className="text-4xl md:text-6xl font-black text-white max-w-4xl tracking-tight leading-tight mb-6"
                        >
                            {post.title}
                        </motion.h1>

                        {isAuthor && (
                            <motion.div 
                               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                               className="flex space-x-3"
                            >
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 rounded-xl shadow-[0_4px_20px_-3px_rgba(0,0,0,0.2)]">
                                        Edit Post
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500/80 hover:bg-red-500 backdrop-blur-md text-white border border-red-400/50 rounded-xl shadow-[0_4px_20px_-3px_rgba(0,0,0,0.2)]" onClick={deletePost}>
                                    Delete Post
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </Container>
            </div>

            <Container>
                <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700/50 -mt-24 relative z-30">
                    <div className="browser-css prose prose-lg md:prose-xl dark:prose-invert prose-purple max-w-none text-slate-700 dark:text-slate-300">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </motion.div>
    ) : null;
}
