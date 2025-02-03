import React from 'react';
import { TrendingUp, Clock, Shield, Users } from 'lucide-react';
import StatCard from './stats/StatCard';
import { TRANSFER_STATS } from '../../constants/stats';

export default function TransferStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {TRANSFER_STATS.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
