import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png"
import { LiaTimesSolid } from 'react-icons/lia';
import { FaBars, FaPhone } from 'react-icons/fa';
import { FaSearch, FaTicketAlt, FaRoute, FaUser } from 'react-icons/fa';
import Theme from '../theme/Theme';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    // Public links (always visible)
    const publicLinks = [
        { href: "/", label: "Home", icon: null },
        { href: "/services", label: "Services", icon: null },
    ];

    // Protected links (only visible when logged in)
    const protectedLinks = [
        { href: "/routes", label: "Routes", icon: FaRoute },
        { href: "/bus", label: "Find Bus", icon: FaSearch },
        { href: "/track", label: "Track Bus", icon: null },
        { href: "/manage-booking", label: "Manage Booking", icon: FaTicketAlt },
    ];

    // Get current navigation links based on auth status
    const navLinks = user ? [...publicLinks, ...protectedLinks] : publicLinks;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
        setShowUserMenu(false);
    }, [location]);

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    const UserMenu = () => (
        <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-sm shadow-lg">
            <div className="py-2">
                <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                    Profile
                </Link>
                <Link
                    to="/manage-booking"
                    className="block px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                    My Bookings
                </Link>
                <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <nav className={`w-full h-[8ch] fixed top-0 z-50 transition-all duration-300
            ${scrolled ? 'bg-black/90' : 'bg-transparent'}
            backdrop-blur-md`}>
            
            {/* Main Navigation Bar */}
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="relative group">
                    <img 
                        src={Logo} 
                        alt="MS Coaches" 
                        className="w-16 h-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={`flex items-center space-x-2 text-sm font-medium
                                ${location.pathname === link.href 
                                    ? 'text-violet-500' 
                                    : 'text-white hover:text-violet-400'} 
                                transition-colors duration-300`}
                        >
                            {link.icon && <link.icon className="text-lg" />}
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Right Section */}
                <div className="hidden lg:flex items-center space-x-6">
                    {/* Theme Toggle */}
                    <Theme />

                    {/* Auth Buttons */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center space-x-2 text-white hover:text-violet-400 transition-colors duration-300"
                            >
                                <FaUser />
                                <span>{user.email}</span>
                            </button>
                            {showUserMenu && <UserMenu />}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-violet-600 text-white px-6 py-2 rounded-sm 
                                hover:bg-violet-700 transition-colors duration-300"
                        >
                            Sign In
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden text-white hover:text-violet-400 
                        transition-colors duration-300"
                >
                    {open ? (
                        <LiaTimesSolid className="text-2xl" />
                    ) : (
                        <FaBars className="text-2xl" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {open && (
                <div className="lg:hidden absolute top-[8ch] left-0 w-full bg-black/95 backdrop-blur-md">
                    <div className="container mx-auto px-4 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`flex items-center space-x-2 py-3 px-4 
                                    ${location.pathname === link.href 
                                        ? 'text-violet-500' 
                                        : 'text-white hover:text-violet-400'} 
                                    transition-colors duration-300`}
                                onClick={() => setOpen(false)}
                            >
                                {link.icon && <link.icon className="text-lg" />}
                                <span>{link.label}</span>
                            </Link>
                        ))}
                        
                        {/* Mobile Auth Buttons */}
                        <div className="mt-4 pt-4 border-t border-white/10">
                            {user ? (
                                <div className="space-y-3">
                                    <Link
                                        to="/profile"
                                        className="block text-white hover:text-violet-400 
                                            transition-colors duration-300"
                                        onClick={() => setOpen(false)}
                                    >
                                        My Account
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setOpen(false);
                                        }}
                                        className="w-full bg-violet-600 text-white px-4 py-2 
                                            rounded-sm hover:bg-violet-700 transition-colors duration-300"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="block w-full bg-violet-600 text-white px-4 
                                        py-2 rounded-sm hover:bg-violet-700 text-center 
                                        transition-colors duration-300"
                                    onClick={() => setOpen(false)}
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;