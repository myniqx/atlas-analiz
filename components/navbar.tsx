"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { navigation, siteInfo, siteColors } from "@/data/site-content"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { navItems } = navigation

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={siteInfo.logo || "/placeholder.svg"}
            alt={siteInfo.siteName}
            width={32}
            height={32}
            className="rounded-full shadow-xl"
          />
          <span className={`font-bold text-xl ${isScrolled || isMenuOpen ? "text-black" : "text-white"}`}>
            {siteInfo.siteName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={`#${item.key}`}
              className={`text-sm hover:text-black transition-colors ${isScrolled ? "text-gray-600" : "text-white"}`}
            >
              {item.label}
            </Link>
          ))}
          <Button
            variant="default"
            style={{
              backgroundColor: isScrolled ? siteColors.accent : "white",
              color: isScrolled ? "white" : "black",
            }}
            className="hover:opacity-90"
          >
            {navigation.contactButton}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? (
            <X size={24} className="text-black" />
          ) : (
            <Menu size={24} className={isScrolled ? "text-black" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={`#${item.key}`}
                className="text-gray-600 hover:text-black transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="default"
              style={{ backgroundColor: siteColors.accent }}
              className="w-full hover:opacity-90"
              onClick={() => setIsMenuOpen(false)}
            >
              {navigation.contactButton}
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
