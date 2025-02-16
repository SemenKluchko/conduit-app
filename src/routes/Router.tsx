import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';


import LoadingOverlay from "components/loading-overlay/LoadingOverlay";
import AppLayout from "components/common/AppLayout";

import { appRoutes } from './appRoutes';
import { Home } from 'features/Home';
import { Login } from 'features/Login';
import { Profile } from 'features/Profile';
import { useAuth } from "context/AuthProvider";
import { Settings } from "features/Settings";
import { PrivateRoute } from "routes/PrivateRoute";
import {Article} from "features/Article";
import { Editor } from "features/Editor";



export const Router = () => {
    const { login } = useAuth();
    const { pathname } = useLocation();

    if (login && [appRoutes.login].includes(pathname)) {
        return <Navigate to={appRoutes.main} replace={true} />;
    }

    return (
        <Suspense fallback={<LoadingOverlay />}>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path={appRoutes.main} element={<Home />} />
                    <Route path={appRoutes.login} element={<Login />} />
                    <Route path={appRoutes.register} element={<Login />} />
                    <Route path={appRoutes.article} element={<Article />} />
                    <Route path={appRoutes.editor} element={<PrivateRoute><Editor /></PrivateRoute>} />
                    <Route path={appRoutes.settings} element={<PrivateRoute><Settings /></PrivateRoute>}/>
                    <Route path={appRoutes.profile} element={<PrivateRoute><Profile /></PrivateRoute>}
                    />
                </Route>
            </Routes>
        </Suspense>
    );
};
