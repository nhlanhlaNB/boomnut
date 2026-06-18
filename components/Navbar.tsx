'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, Home, BookOpen, Brain, Mic, Video, 
  Gamepad2, FileText, Lightbulb, GraduationCap, PenTool, 
  Users, TrendingUp, Target, DollarSign, LogOut, Gift
} from 'lucide-react';
import AuthButton from './AuthButton';
import SubscriptionBadge from './SubscriptionBadge';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Navbar() {
  const { user, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };



  const mainLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Study Dashboard', href: '/study', icon: BookOpen },
    { name: 'Study Plan', href: '/study-plan', icon: Target },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Affiliate', href: '/affiliate', icon: Gift },
    { name: 'Pricing', href: '/pricing', icon: DollarSign },
  ];

  // Filter links based on auth state
  const visibleLinks = mainLinks.filter(link => {
    if (!user && (link.href === '/study-plan' || link.href === '/affiliate')) {
      return false;
    }
    return true;
  });

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <img 
                src="/logoBoomNut.png" 
                alt="BoomNut Logo" 
                className="h-12 md:h-16 w-auto object-contain mix-blend-multiply"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {visibleLinks.map((link) => {
                if (link.href === '/pricing') {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg hover:opacity-90 transition font-bold text-sm shadow-lg"
                    >
                      💸 Pricing
                    </Link>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      isActive(link.href)
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Side - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <SubscriptionBadge />
              {!loading && user && (
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <span className="text-sm font-semibold text-gray-900">👋 {user.displayName?.split(' ')[0] || 'User'}</span>
                </div>
              )}
              {!loading && (
                user ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/signin"
                    className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </Link>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto">
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-between items-center mb-6">
                <img 
                  src="/logoBoomNut.png" 
                  alt="BoomNut Logo" 
                  className="h-12 w-auto object-contain mix-blend-multiply"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Auth & Subscription */}
              <div className="mb-6 space-y-3">
                <SubscriptionBadge />
                {!loading && (
                  user ? (
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  ) : (
                    <Link
                      href="/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      Sign In
                    </Link>
                  )
                )}
              </div>

              {/* Main Links */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Navigation
                </h3>
                <div className="space-y-1">
                  {visibleLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(link.href)
                          ? 'bg-orange-100 text-orange-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <link.icon className="w-5 h-5" />
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
