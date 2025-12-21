import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { supabase } from '../lib/supabase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((async (_event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setUser(null);
        setFavorites([]);
        setIsLoading(false);
      }
    }) as any);

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      console.log('Loading profile for user:', userId);

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) {
        console.error('Error loading profile:', profileError);
        setIsLoading(false);
        return;
      }

      if (profile) {
        console.log('Profile loaded:', profile);
        setUser({
          id: profile.id,
          email: profile.email,
          name: profile.name,
          role: profile.role,
          createdAt: new Date(profile.created_at)
        });

        const { data: favoritesData, error: favError } = await supabase
          .from('favorites')
          .select('offer_id')
          .eq('user_id', userId);

        if (favError) {
          console.error('Error loading favorites:', favError);
        }

        if (favoritesData) {
          setFavorites(favoritesData.map(f => f.offer_id));
        }
      } else {
        console.error('No profile found for user:', userId);
      }
    } catch (err) {
      console.error('Exception loading profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        setIsLoading(false);
        return false;
      }

      if (!data.user) {
        console.error('No user data returned');
        setIsLoading(false);
        return false;
      }

      await loadUserProfile(data.user.id);
      return true;
    } catch (err) {
      console.error('Exception during login:', err);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error || !data.user) {
      setIsLoading(false);
      return false;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        email,
        name,
        role: 'client'
      });

    if (profileError) {
      setIsLoading(false);
      return false;
    }

    await loadUserProfile(data.user.id);
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setFavorites([]);
  };

  const addToFavorites = async (offerId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('favorites')
      .insert({
        user_id: user.id,
        offer_id: offerId
      });

    if (!error) {
      setFavorites([...favorites, offerId]);
    }
  };

  const removeFromFavorites = async (offerId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('offer_id', offerId);

    if (!error) {
      setFavorites(favorites.filter(id => id !== offerId));
    }
  };

  const isFavorite = (offerId: string) => {
    return favorites.includes(offerId);
  };
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading, 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};