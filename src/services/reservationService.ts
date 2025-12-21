import { supabase } from '../lib/supabase';
import { Reservation } from '../types';

export async function fetchUserReservations(userId: string): Promise<Reservation[]> {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }

  return (data || []).map(reservation => ({
    id: reservation.id,
    userId: reservation.user_id,
    offerId: reservation.offer_id,
    status: reservation.status,
    guests: reservation.guests,
    totalPrice: reservation.total_price,
    departureDate: new Date(reservation.departure_date),
    createdAt: new Date(reservation.created_at),
    blockedUntil: reservation.blocked_until ? new Date(reservation.blocked_until) : undefined,
    paymentDeadline: reservation.payment_deadline ? new Date(reservation.payment_deadline) : undefined
  }));
}

export async function createReservation(
  userId: string,
  offerId: string,
  guests: number,
  totalPrice: number,
  departureDate: Date,
  status: 'blocked' | 'confirmed' = 'blocked'
): Promise<Reservation | null> {
  const blockedUntil = status === 'blocked'
    ? new Date(Date.now() + 2 * 60 * 60 * 1000)
    : undefined;

  const paymentDeadline = status === 'confirmed'
    ? new Date(departureDate.getTime() - 30 * 24 * 60 * 60 * 1000)
    : undefined;

  const { data, error } = await supabase
    .from('reservations')
    .insert({
      user_id: userId,
      offer_id: offerId,
      status,
      guests,
      total_price: totalPrice,
      departure_date: departureDate.toISOString().split('T')[0],
      blocked_until: blockedUntil?.toISOString(),
      payment_deadline: paymentDeadline?.toISOString()
    })
    .select()
    .single();

  if (error || !data) {
    console.error('Error creating reservation:', error);
    return null;
  }

  return {
    id: data.id,
    userId: data.user_id,
    offerId: data.offer_id,
    status: data.status,
    guests: data.guests,
    totalPrice: data.total_price,
    departureDate: new Date(data.departure_date),
    createdAt: new Date(data.created_at),
    blockedUntil: data.blocked_until ? new Date(data.blocked_until) : undefined,
    paymentDeadline: data.payment_deadline ? new Date(data.payment_deadline) : undefined
  };
}

export async function updateReservationStatus(
  reservationId: string,
  status: 'blocked' | 'confirmed' | 'cancelled'
): Promise<boolean> {
  const { error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', reservationId);

  if (error) {
    console.error('Error updating reservation:', error);
    return false;
  }

  return true;
}

export async function deleteReservation(reservationId: string): Promise<boolean> {
  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', reservationId);

  if (error) {
    console.error('Error deleting reservation:', error);
    return false;
  }

  return true;
}

export async function fetchAllReservations(): Promise<Reservation[]> {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all reservations:', error);
    return [];
  }

  return (data || []).map(reservation => ({
    id: reservation.id,
    userId: reservation.user_id,
    offerId: reservation.offer_id,
    status: reservation.status,
    guests: reservation.guests,
    totalPrice: reservation.total_price,
    departureDate: new Date(reservation.departure_date),
    createdAt: new Date(reservation.created_at),
    blockedUntil: reservation.blocked_until ? new Date(reservation.blocked_until) : undefined,
    paymentDeadline: reservation.payment_deadline ? new Date(reservation.payment_deadline) : undefined
  }));
}
