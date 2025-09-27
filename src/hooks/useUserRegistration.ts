'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { supabase } from '@/lib/supabase';

export function useUserRegistration() {
  const { address, isConnected } = useAccount();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function registerUser() {
      if (!isConnected || !address) return;

      setLoading(true);

      try {
        // Check if user already exists
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('wallet_address', address.toLowerCase())
          .single();

        if (!existingUser) {
          // Create referral code (first 6 chars of wallet address)
          const referralCode = address.slice(2, 8).toLowerCase();
          
          // Create new user with 1000 points starting bonus
          const { error } = await supabase
            .from('users')
            .insert([
              {
                wallet_address: address.toLowerCase(),
                referral_code: referralCode,
                total_points: 1000,
                redeemable_points: 1000,
                locked_points: 0,
                current_rank: 'Opal'
              }
            ]);

          if (error) {
            console.error('Error creating user:', error);
          } else {
            console.log('User registered successfully!');
          }
        }

        setIsRegistered(true);
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        setLoading(false);
      }
    }

    registerUser();
  }, [isConnected, address]);

  return { isRegistered, loading };
}
