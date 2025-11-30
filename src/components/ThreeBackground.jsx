import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
export default function ThreeBackground(){
  const ref = useRef(null)
  const location = useLocation()
  useEffect(()=>{
    let mounted = true
    const start = async () => {
      await new Promise(r => setTimeout(r, 250))
      const mod = await import('../three/main')
      if(mounted && ref.current){ mod.initThreeBackground(ref.current, location.pathname) }
    }
    start()
    return () => { mounted = false }
  },[location.pathname])
  return (
    <canvas ref={ref} className="fixed inset-0 -z-10 w-full h-full"/>
  )
}
