import React from 'react'
import { Link } from 'react-router-dom'

function Logo({width = '100px'}) {
  return (
    <div className={`font-extrabold text-2xl tracking-tighter`} style={{width}}>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Ink</span>
      <span className="text-slate-800 dark:text-slate-100">spire</span>
      <span className="text-purple-500 text-3xl leading-none">.</span>
    </div>
  )
}

export default Logo
