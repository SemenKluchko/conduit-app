import React from 'react';
import { useNavigate } from "react-router-dom";
import { appRoutes } from "routes/appRoutes";

export const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center' }}>
            <h1 className="logo-font">Something went wrong...</h1>
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                    navigate(appRoutes.main, { replace: true });
                    window.location.reload();
                }}
            >
                Back Home
            </button>
        </div>
    );
};
