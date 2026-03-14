import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import LogoAnimated from "../LogoAnimated"

export function NavBar({ items, className }) {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(items[0]?.name || "")

  // Sync activeTab with current route
  useEffect(() => {
    const currentItem = items.find(item => item.url === location.pathname)
    if (currentItem) {
      setActiveTab(currentItem.name)
    }
  }, [location.pathname, items])

  return (
    <>
      {/* Landscape Logo - Fixed Top Left */}
      <div className="fixed top-6 left-8 z-50 pointer-events-auto hidden sm:block">
        <Link to="/" className="block hover:scale-105 transition-transform">
          <LogoAnimated variant="dark" />
        </Link>
      </div>

      {/* Mobile Logo (Smaller/Different?) or just same */}
      <div className="fixed top-4 left-4 z-50 pointer-events-auto sm:hidden">
        <Link to="/" className="block hover:scale-105 transition-transform">
           {/* Maybe scale down for mobile */}
           <div style={{ transform: 'scale(0.8)', transformOrigin: 'top left' }}>
             <LogoAnimated variant="dark" />
           </div>
        </Link>
      </div>

      {/* Navigation Pill - Centered */}
      <div
        className={cn(
          "fixed bottom-4 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-0 sm:pt-6 pointer-events-none",
          className,
        )}
      >
        <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg pointer-events-auto">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                  "text-foreground/80 hover:text-primary",
                  isActive && "bg-muted text-primary",
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
