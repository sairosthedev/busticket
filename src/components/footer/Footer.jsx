import React from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaBus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-black">
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center space-y-12">
          <div className="space-y-6 max-w-md">
            <div className="flex items-center justify-center space-x-3">
              <FaBus className="text-4xl text-violet-500" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent">
                MS Coaches
              </h2>
            </div>
            <p className="text-neutral-400 text-lg leading-relaxed">
              For digital natives. Modern design. Instant access. Your trusted partner in modern bus travel.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-neutral-400">
            {[
              { icon: FaPhone, text: '+263 786 033 933', href: 'tel:+263786033933' },
              { icon: FaEnvelope, text: 'macdonaldsairos24@gmail.com', href: 'mailto:macdonaldsairos24@gmail.com' }
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center space-x-2 hover:text-violet-400 transition-colors duration-300"
              >
                <item.icon className="text-violet-500" />
                <span>{item.text}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center space-y-6 pt-6 border-t border-neutral-800/50 w-full">
            <div className="flex justify-center space-x-6">
              {[
                { Icon: FaFacebookF, href: "#", label: "Facebook" },
                { Icon: FaTwitter, href: "#", label: "Twitter" },
                { Icon: FaInstagram, href: "#", label: "Instagram" },
                { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-12 h-12 rounded-full bg-neutral-900 hover:bg-violet-500 flex items-center justify-center transition-all duration-300 group"
                >
                  <Icon className="text-lg text-neutral-400 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 text-sm text-neutral-500">
              <p className="sm:mr-8">
                © {new Date().getFullYear()} MS Coaches. All rights reserved.
              </p>
              <div className="flex space-x-8">
                <Link to="/privacy-policy" className="hover:text-violet-400 transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-violet-400 transition-colors duration-300">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer