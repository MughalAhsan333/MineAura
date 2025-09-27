'use client';

import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Points Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Your Points</h2>
            <p className="text-2xl font-bold text-blue-600">1,000</p>
            <p className="text-sm text-gray-500">Redeemable Points</p>
          </div>

          {/* Rank Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Your Rank</h2>
            <p className="text-2xl font-bold text-green-600">Opal</p>
            <p className="text-sm text-gray-500">Current Level</p>
          </div>

          {/* Referral Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Referral Code</h2>
            <p className="text-xl font-mono bg-gray-100 p-2 rounded">Loading...</p>
            <p className="text-sm text-gray-500">Share this to earn points</p>
          </div>
        </div>
      </div>
    </div>
  );
}
