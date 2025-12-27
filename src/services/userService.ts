import { supabase } from '../lib/supabase';
import { User } from '../types';

export async function fetchAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }

  return (data || []).map(profile => ({
    id: profile.id,
    email: profile.email,
    name: profile.name,
    role: profile.role,
    createdAt: new Date(profile.created_at)
  }));
}

export async function deleteUser(userId: string): Promise<boolean> {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error('Error deleting user:', error);
    return false;
  }

  return true;
}

export async function getUserStats(userId: string): Promise<{
  reservationsCount: number;
  totalSpent: number;
}> {
  const { data: reservations, error } = await supabase
    .from('reservations')
    .select('status, total_price')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user stats:', error);
    return { reservationsCount: 0, totalSpent: 0 };
  }

  const totalSpent = (reservations || [])
    .filter(r => r.status === 'confirmed')
    .reduce((sum, r) => sum + parseFloat(r.total_price), 0);

  return {
    reservationsCount: reservations?.length || 0,
    totalSpent
  };
}
