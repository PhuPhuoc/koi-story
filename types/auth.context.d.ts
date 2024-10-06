type AuthContextType = {
    isLoggedIn: boolean;
    loginWithEmailPassword: (email: string | null, password: string | null) => void;
    loginByExistUser: () => void;
    logout: () => void;
};
