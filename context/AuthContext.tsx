import React, { createContext, useContext, useEffect, useState } from 'react';
import { insforge } from '../lib/insforge';

// Using relaxed types to handle SDK differences
interface AuthContextType {
    session: any | null;
    user: any | null;
    role: string | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<any | null>(null);
    const [user, setUser] = useState<any | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initSession = async () => {
            try {
                // @ts-ignore - Create session from user if GetUser exists
                const { data } = await insforge.auth.getUser();

                if (data?.user) {
                    setUser(data.user);
                    setSession({ user: data.user, access_token: (data as any).accessToken });
                    const userRole = data.user.metadata?.role || 'patient';
                    setRole(userRole);
                }
            } catch (err) {
                // Silent fail on no user
            } finally {
                setLoading(false);
            }
        };

        initSession();

        // @ts-ignore
        if (insforge.auth.onAuthStateChange) {
            // @ts-ignore
            const { data } = insforge.auth.onAuthStateChange((_event: string, session: any) => {
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    const userRole = session.user.metadata?.role || 'patient';
                    setRole(userRole);
                } else {
                    setRole(null);
                }
                setLoading(false);
            });
            return () => {
                data?.subscription?.unsubscribe();
            };
        }
    }, []);

    const signInWithGoogle = async () => {
        const { error } = await insforge.auth.signInWithOAuth({
            provider: 'google',
            redirectTo: `${window.location.origin}/dashboard`
        });
        if (error) throw error;
    };

    const signOut = async () => {
        await insforge.auth.signOut();
        setUser(null);
        setSession(null);
        setRole(null);
    };

    const value = {
        session,
        user,
        role,
        loading,
        signInWithGoogle,
        signOut
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
