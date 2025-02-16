import React from 'react';
import { useAuth } from "context/AuthProvider";
import { appRoutes } from "routes/appRoutes";
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { login } = useAuth();

    if (!login) {
        return <Navigate to={appRoutes.login} replace={true} />;
    }

    return children ? <>{children}</> : <Outlet />;
};

export { PrivateRoute };