import React from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">MS Coaches</h2>
            <p className="text-sm opacity-80">
              Elevating your journey with comfort, safety, and reliability.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Contact Us', 'Privacy Policy', 'Terms and Conditions'].map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="opacity-80 hover:opacity-100 transition duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              {['Safety Guarantee', '24/7 Support', 'Luxury Buses', 'Comfortable Facilities'].map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="opacity-80 hover:opacity-100 transition duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm">
              {[
                { icon: FaMapMarkerAlt, text: '17171, Roan Close, Borrowdale, Harare' },
                { icon: FaPhone, text: '+263 786 033 933', href: 'tel:+263786033933' },
                { icon: FaEnvelope, text: 'macdonaldsairos24@gmail.com', href: 'mailto:macdonaldsairos24@gmail.com' }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <item.icon className="opacity-80 mt-1" />
                  <p className="opacity-80">
                    {item.href ? <a href={item.href} className="hover:opacity-100 transition duration-300">{item.text}</a> : item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} MS Coaches. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
              <a key={index} href="#" className="text-white opacity-80 hover:opacity-100 transition duration-300">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer