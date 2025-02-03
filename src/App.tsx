import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Layout from './components/Layout';
import AccountCard from './components/AccountCard';
import TransferForm from './components/TransferForm';
import TransferSummary from './components/TransferSummary';
import TransferProgress from './components/transfer/TransferProgress';
import TransferSuccess from './components/transfer/TransferSuccess';
import CountryGrid from './components/features/CountryGrid';
import TransferStats from './components/features/TransferStats';
import TransferDetails from './components/transfer/TransferDetails';

interface CurrencyData {
  code: string;
  rate: number;
}

const currencies: Record<string, CurrencyData> = {
  AZ: { code: 'AZN', rate: 1.7 },
  TR: { code: 'TRY', rate: 32.83 },
  US: { code: 'USD', rate: 1 },
  GB: { code: 'GBP', rate: 0.79 },
  CA: { code: 'CAD', rate: 1.35 },
  AU: { code: 'AUD', rate: 1.51 },
  JP: { code: 'JPY', rate: 156.26 },
  CN: { code: 'CNY', rate: 7.24 },
  IN: { code: 'INR', rate: 83.45 },
  BR: { code: 'BRL', rate: 4.97 },
  MX: { code: 'MXN', rate: 16.69 },
  ZA: { code: 'ZAR', rate: 18.92 },
};

function App() {
  const [step, setStep] = useState<'account' | 'form' | 'summary' | 'success' | 'details'>('account');
  const [transferData, setTransferData] = useState({
    amount: 0,
    fee: 0,
    exchangeRate: 1,
    recipientGets: 0,
    recipientName: 'John Smith',
    iban: '',
    date: new Date().toLocaleDateString(),
    targetCurrency: 'USD',
  });

  useEffect(() => {
    const fetchExchangeRates = async () => {
      // Simulate fetching latest exchange rates
      setTransferData(prev => ({
        ...prev,
        exchangeRate: currencies[prev.targetCurrency]?.rate || 1,
      }));
    };

    fetchExchangeRates();
  }, []);

  const handleFormSubmit = (data: { amount: number; fee: number; country: string }) => {
    const { amount, fee, country } = data;
    const currencyData = currencies[country] || { code: 'USD', rate: 1 };
    const exchangeRate = currencyData.rate;
    const recipientGets = (amount - fee) * exchangeRate;
    const targetCurrency = currencyData.code;
    setTransferData(prev => ({
      ...prev,
      amount,
      fee,
      exchangeRate,
      recipientGets,
      targetCurrency,
    }));
    setStep('summary');
  };

  const handleGoToAccount = () => {
    setStep('account');
  };

  return (
    <Layout onLogoClick={handleGoToAccount}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {step !== 'account' && step !== 'details' && (
          <TransferProgress
            currentStep={
              step === 'form' ? 'details' :
              step === 'summary' ? 'review' :
              'complete'
            }
          />
        )}

        <div className={`transition-all duration-500 ${
          step !== 'account' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <AccountCard onTransfer={() => setStep('form')} />
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white flex flex-col justify-center transform transition hover:scale-105 duration-300">
              <h2 className="text-2xl font-semibold mb-4">Fast & Secure Transfers</h2>
              <p className="text-blue-100 mb-6">
                Send money internationally with competitive rates and low fees.
                Your transfers are protected with bank-grade security.
              </p>
              <button
                onClick={() => setStep('form')}
                className="bg-white text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center justify-center group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <TransferStats />
          <CountryGrid />
        </div>

        <div className={`transition-all duration-500 ${
          step !== 'form' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}>
          <TransferForm onSubmit={handleFormSubmit} />
        </div>

        <div className={`transition-all duration-500 ${
          step !== 'summary' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}>
          <TransferSummary
            {...transferData}
            onConfirm={() => setStep('success')}
            onBack={() => setStep('form')}
          />
        </div>

        <div className={`transition-all duration-500 ${
          step !== 'success' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}>
          <TransferSuccess
            amount={transferData.amount}
            recipientName={transferData.recipientName}
            onNewTransfer={() => setStep('account')}
            onViewDetails={() => setStep('details')}
          />
        </div>

        <div className={`transition-all duration-500 ${
          step !== 'details' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}>
          <TransferDetails
            {...transferData}
            onGoBack={() => setStep('success')}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
