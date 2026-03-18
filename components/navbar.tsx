"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, MapPin, Calendar, Camera, BarChart3, Home, Compass, Route } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/map", label: "Explore Map", icon: MapPin },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/virtual-tour", label: "Virtual Tour", icon: Camera },
  { href: "/crowd-prediction", label: "Crowd Info", icon: BarChart3 },
  { href: "/trip-planner", label: "Trip Planner", icon: Route },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">
              Heritage Explorer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/trip-planner">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Plan Your Visit
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-primary/10 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="w-5 h-5 text-primary" />
                  {link.label}
                </Link>
              ))}
              <Link href="/trip-planner" onClick={() => setIsOpen(false)}>
                <Button className="mt-4 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Plan Your Visit
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
