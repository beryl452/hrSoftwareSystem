import { createContext, useState , Dispatch, SetStateAction} from "react";

export type Auth={
    user: {},
    token: '',
};

export interface AuthContextInterface {
    auth: any;
    setAuth: Dispatch<SetStateAction<Auth>>
}

const defaultAuth = {
    auth: {
        user: {},
        token: '',
    },
    setAuth: () => {},
} as AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface>(defaultAuth);

type AuthProviderProps = {
    children: React.ReactNode;
};
export default function AuthProvider  ({ children } : AuthProviderProps) {
    const [auth, setAuth] = useState<Auth>({
        user: {},
        token: '',
    });
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};