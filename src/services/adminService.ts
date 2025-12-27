import { supabase } from '../lib/supabase';

export interface AdminStats {
  totalClients: number;
  totalAdmins: number;
  totalOffers: number;
  totalReservations: number;
  confirmedReservations: number;
  blockedReservations: number;
  cancelledReservations: number;
  totalRevenue: number;
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const { data, error } = await supabase.rpc('get_admin_stats' as any, {});

  if (error) {
    console.log('RPC not available, fetching stats manually');

    const [clientsRes, adminsRes, offersRes, reservationsRes] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'client'),
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'admin'),
      supabase.from('offers').select('id', { count: 'exact', head: true }),
      supabase.from('reservations').select('status, total_price')
    ]);

    const reservations = reservationsRes.data || [];
    const confirmed = reservations.filter(r => r.status === 'confirmed');
    const blocked = reservations.filter(r => r.status === 'blocked');
    const cancelled = reservations.filter(r => r.status === 'cancelled');

    const totalRevenue = confirmed.reduce((sum, r) => sum + parseFloat(r.total_price || '0'), 0);

    return {
      totalClients: clientsRes.count || 0,
      totalAdmins: adminsRes.count || 0,
      totalOffers: offersRes.count || 0,
      totalReservations: reservations.length,
      confirmedReservations: confirmed.length,
      blockedReservations: blocked.length,
      cancelledReservations: cancelled.length,
      totalRevenue
    };
  }

  return data;
}

export async function deleteOffer(offerId: string): Promise<boolean> {
  const { error } = await supabase
    .from('offers')
    .delete()
    .eq('id', offerId);

  if (error) {
    console.error('Error deleting offer:', error);
    return false;
  }

  return true;
}
