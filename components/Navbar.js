"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const router = useRouter();

  useEffect(() => {
    // Check if theme exists in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      unsubscribe();
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="bg-base-100 shadow-md relative z-50">
        <div className="navbar container mx-auto px-4">
          <div className="navbar-start">
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="btn btn-ghost"
              >
                {!isMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
            <Link href="/" className="btn btn-ghost text-xl normal-case">
              SaaS Starter Kit
            </Link>
          </div>
          
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><a href="/#features">Features</a></li>
              <li><a href="/#pricing">Pricing</a></li>
              {user && <li><Link href="/dashboard">Dashboard</Link></li>}
            </ul>
          </div>
          
          <div className="navbar-end">
            <button 
              className="btn btn-ghost btn-circle mr-2"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            {user ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSignOut}
                  className="btn btn-ghost btn-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/auth/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link href="/auth/register" className="btn btn-primary btn-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-screen mobile menu */}
      <div className={`fixed inset-0 bg-base-100 z-40 lg:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-20 px-4">
          <ul className="menu menu-lg gap-2">
            <li>
              <a href="#features" onClick={closeMenu}>
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" onClick={closeMenu}>
                Pricing
              </a>
            </li>
            {user && (
              <li>
                <Link href="/dashboard" onClick={closeMenu}>
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
          {!user && (
            <div className="mt-8 flex flex-col gap-4">
              <Link 
                href="/auth/login" 
                className="btn btn-ghost btn-lg w-full"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="btn btn-primary btn-lg w-full"
                onClick={closeMenu}
              >
                Get Started
              </Link>
            </div>
          )}
          <div className="mt-auto mb-8 flex justify-center">
            <button 
              className="btn btn-ghost gap-2"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  Dark mode
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Light mode
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
