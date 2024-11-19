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

    const signUp = async ({ email, password }) => {
        try {
            // Use admin client to create user
            const { data, error } = await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: true,
                user_metadata: {
                    email_confirmed: true
                }
            });

            if (error) {
                console.error('SignUp error details:', error);
                throw error;
            }

            console.log('Signup successful:', data);
            
            // Automatically sign in the user
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (signInError) throw signInError;

            return { data, error: null };
        } catch (error) {
            console.error('SignUp error caught:', error);
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
        signOut: () => supabase.auth.signOut(),
        user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}; 