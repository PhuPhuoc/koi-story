import React, { createContext, useState, ReactNode, useContext } from 'react';

const duumyEmail: string = "tam"
const duumyPass: string = "123"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const loginByExistUser = async () => {
        setIsLoggedIn(true)
    }

    const loginWithEmailPassword = (email: string | null, password: string | null) => {

    }

    const logout = async () => {

    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, loginByExistUser, loginWithEmailPassword, logout }} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
