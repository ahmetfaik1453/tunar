import React from 'react';
import { CheckCircle, ArrowLeft, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency, formatExchangeRate, formatIBAN } from '../../utils/formatters';

interface TransferDetailsProps {
  amount: number;
  fee: number;
  exchangeRate: number;
  recipientGets: number;
  recipientName: string;
  iban: string;
  date: string;
  onGoBack: () => void;
  targetCurrency: string;
}

export default function TransferDetails({
  amount,
  fee,
  exchangeRate,
  recipientGets,
  recipientName,
  iban,
  date,
  onGoBack,
  targetCurrency
}: TransferDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
    >
      <div className="flex items-center justify-center text-green-500 mb-6">
        <CheckCircle className="w-12 h-12" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">Transfer Successful!</h2>

      <div className="space-y-6">
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <div className="text-gray-600">Amount Sent</div>
          <div className="font-medium">{formatCurrency(amount)}</div>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <div className="text-gray-600">Transfer Fee (0.5%)</div>
          <div className="font-medium text-blue-600">-{formatCurrency(fee)}</div>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <div className="text-gray-600">Exchange Rate</div>
          <div className="font-medium">1 USD = {formatExchangeRate(exchangeRate)} {targetCurrency}</div>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <div className="text-gray-600">Recipient Gets</div>
          <div className="text-xl font-bold text-green-600">
            {recipientGets.toFixed(2)} <span className="text-base">{targetCurrency}</span>
          </div>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <div className="text-gray-600">Recipient Name</div>
          <div className="font-medium">{recipientName}</div>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <div className="text-gray-600">Recipient IBAN</div>
          <div className="font-medium">{formatIBAN(iban)}</div>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <div className="text-gray-600">Transfer Date</div>
          <div className="font-medium">{date}</div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <motion.button
          onClick={onGoBack}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center justify-center group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Go Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 flex items-center justify-center group"
        >
          <Printer className="w-4 h-4 mr-2 group-hover:rotate-6 transition-transform" />
          Print Receipt
        </motion.button>
      </div>
    </motion.div>
  );
}
