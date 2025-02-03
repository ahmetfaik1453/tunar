import React, { useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import ConfettiEffect from '../ui/ConfettiEffect';
import { formatCurrency } from '../../utils/formatters';

interface TransferSuccessProps {
  amount: number;
  recipientName: string;
  onNewTransfer: () => void;
  onViewDetails: () => void;
}

export default function TransferSuccess({ amount, recipientName, onNewTransfer, onViewDetails }: TransferSuccessProps) {
  return (
    <div className="text-center">
      <ConfettiEffect />
      <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
        <Check className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Transfer Successful! 🎉</h2>
      <div className="text-gray-600 mb-6">
        You've sent <span className="font-semibold">{formatCurrency(amount)}</span> to {recipientName}
      </div>
      <div className="space-y-4">
        <button
          onClick={onNewTransfer}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center group"
        >
          Start New Transfer
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={onViewDetails}
          className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          View Transfer Details
        </button>
      </div>
    </div>
  );
}
