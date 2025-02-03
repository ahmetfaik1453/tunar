import React from 'react';
import { User, Bell, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  onLogoClick: () => void;
}

export default function Layout({ children, onLogoClick }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <motion.button
                onClick={onLogoClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center text-blue-600"
              >
                <Send className="w-6 h-6 mr-2" />
                <span className="text-xl font-semibold">ThriftWire</span>
              </motion.button>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Bell className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50"
              >
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
