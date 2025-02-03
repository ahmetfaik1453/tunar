import React from 'react';
import { Wallet, Mail, ArrowRight } from 'lucide-react';
import CurrencyBadge from './ui/CurrencyBadge';
import { motion } from 'framer-motion';

interface AccountCardProps {
  onTransfer: () => void;
}

export default function AccountCard({ onTransfer }: AccountCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Account Balance</h2>
          <div className="mt-2">
            <CurrencyBadge amount={1234.56} />
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center"
        >
          <Wallet className="w-6 h-6 text-blue-500" />
        </motion.div>
      </div>
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg"
        >
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          <span>john.doe@gmail.com</span>
        </motion.div>
        <motion.button
          onClick={onTransfer}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center group"
        >
          Send Money
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}
