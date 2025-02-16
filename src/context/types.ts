export interface AuthContextType {
    login: boolean | null;
    setLogin: React.Dispatch<React.SetStateAction<boolean | null>>
}
