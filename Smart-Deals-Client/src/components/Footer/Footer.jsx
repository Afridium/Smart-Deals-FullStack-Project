import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#031525] text-gray-400 text-sm font-sans">
      {/* Top Container */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-4">
        
        {/* Brand / Logo Section */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Smart<span className="text-violet-400">Deals</span>
          </h2>
          <p className="leading-relaxed text-gray-400 max-w-xs">
            Your trusted marketplace for authentic local products. Discover the best deals from across Bangladesh.
          </p>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-white font-semibold tracking-wide">Quick Links</h3>
          <ul className="space-y-2.5">
            <li><a href="#" className="hover:text-white transition-colors duration-200">All Products</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Dashboard</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Login</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Register</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-white font-semibold tracking-wide">Categories</h3>
          <ul className="space-y-2.5">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Electronics</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Fashion</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Home & Living</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Groceries</a></li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-white font-semibold tracking-wide">Contact & Support</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:support@Smartdeals.com" className="hover:text-white transition-colors duration-200 break-all">
                support@Smartdeals.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+880123456789" className="hover:text-white transition-colors duration-200">
                +880 123 456 789
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="leading-tight">
                123 Commerce Street,<br />Dhaka, Bangladesh
              </span>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-white font-semibold tracking-wide">Social Links</h3>
          <div className="flex items-center gap-3">
            {/* X (formerly Twitter) */}
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="X (Twitter)">
              <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
              <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Facebook">
              <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-800/60 w-full"></div>

      {/* Bottom Copyright Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-xs tracking-wide text-gray-500">
        &copy; 2025 SmartDeals. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;