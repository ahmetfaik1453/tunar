import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import CurrencyBadge from './ui/CurrencyBadge';
import { motion } from 'framer-motion';

const countries = [
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
];

interface TransferFormProps {
  onSubmit: (data: { amount: number; fee: number; country: string }) => void;
}

interface IBANInputProps {
  value: string;
  onChange: (value: string) => void;
}

const IBANInput = ({ value, onChange }: IBANInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursor, setCursor] = useState<number | null>(null);

  // Formatı təmizlə və tətbiq et
  const formatIBAN = useCallback((raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  }, []);

  // Kursor pozisiyasını hesabla
  const getCursorPosition = useCallback((input: string, selectionStart: number) => {
    const beforeCursor = input.slice(0, selectionStart);
    const spacesBeforeCursor = (beforeCursor.match(/ /g) || []).length;
    return selectionStart - spacesBeforeCursor;
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = formatIBAN(e.target.value);
    const cursorPos = getCursorPosition(e.target.value, e.target.selectionStart || 0);
    
    onChange(newValue);
    setCursor(cursorPos);
  }, [formatIBAN, getCursorPosition, onChange]);

  // Kursoru yenilə
  useEffect(() => {
    if (inputRef.current && cursor !== null) {
      const visualPos = cursor + Math.floor(cursor / 4);
      inputRef.current.setSelectionRange(visualPos, visualPos);
    }
  }, [cursor, value]);

  return (
    <div className="relative font-mono">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
        placeholder="xxxx xxxx xxxx xxxx"
        maxLength={19}
        inputMode="numeric"
      />
    </div>
  );
};

export default function TransferForm({ onSubmit }: TransferFormProps) {
  const [amount, setAmount] = useState('');
  const [country, setCountry] = useState('');
  const [iban, setIban] = useState('xxxx xxxx xxxx xxxx');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(amount) < 10 || Number(amount) > 10000) {
      setError('Amount must be between $10 and $10,000');
      return;
    }
    const fee = Number(amount) * 0.005;
    onSubmit({ amount: Number(amount), fee, country });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Money</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (USD)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-20"
                placeholder="Enter amount"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {amount && <CurrencyBadge amount={Number(amount)} />}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient's IBAN
            </label>
            <IBANInput value={iban} onChange={setIban} />
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center group"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
