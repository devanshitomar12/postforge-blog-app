import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`} className="w-full flex">
        <motion.div 
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className='w-full flex flex-col bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-[0_4px_20px_-3px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-purple-500/10 border border-slate-100 dark:border-slate-700/50 group'
        >
            <div className='w-full aspect-[4/3] justify-center mb-5 overflow-hidden rounded-2xl'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110' />
            </div>
            <h2 className='text-2xl flex-wrap font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300'>
              {title}
            </h2>
        </motion.div>
    </Link>
  )
}

export default PostCard
