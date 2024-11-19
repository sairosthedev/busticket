import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, supabaseAdmin } from '../utils/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for changes on auth state (sign in, sign out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        try {
            // Clear all local storage
            localStorage.clear();
            sessionStorage.clear();
            
            try {
                // Attempt to sign out from Supabase
                await supabase.auth.signOut();
            } catch (supabaseError) {
                console.log('Supabase signout error:', supabaseError);
                // Continue with cleanup even if Supabase throws an error
            }

            // Clear user state
            setUser(null);

            // Clear any Supabase-specific items
            for (let key in localStorage) {
                if (key.startsWith('sb-')) {
                    localStorage.removeItem(key);
                }
            }

            // Force a clean reload to the home page
            window.location.replace('/');
            
        } catch (error) {
            console.error('Error during signout cleanup:', error);
            // Force sign out anyway
            setUser(null);
            window.location.replace('/');
        }
    };

    const signUp = async ({ email, password }) => {
        try {
            const { data, error } = await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: true,
                user_metadata: {
                    email_confirmed: true
                }
            });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error('SignUp error:', error);
            return { 
                data: null, 
                error: {
                    message: error.message || 'Failed to create account',
                    details: error
                }
            };
        }
    };

    const signIn = async ({ email, password }) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            console.error('SignIn error:', error);
            return { data: null, error };
        }
    };

    const value = {
        signUp,
        signIn,
        signOut,
        user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}; 