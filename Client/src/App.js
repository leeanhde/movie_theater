import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, privateRoutesAdmin, privateRoutesStaff, privateRoutesSupervisor, publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';

import ProtectedRoute from '../src/utils/ProtectedRoute';
import { AuthProvider } from '../src/utils/AuthContext';
import Unauthorized from '../src/utils/Unauthorized';
import Login from '../src/pages/Login/index';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public routes */}
                    {publicRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={<route.component />} />
                    ))}

                    {/* Protected routes for all authenticated users */}
                    <Route element={<ProtectedRoute allowedRoles={['member']} />}>
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = React.Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>

                    {/* Protected routes for staff */}
                    <Route element={<ProtectedRoute allowedRoles={['staff']} />}>
                        {privateRoutesStaff.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = React.Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>

                    {/* Protected routes for supervisor */}
                    <Route element={<ProtectedRoute allowedRoles={['supervisor']} />}>
                        {privateRoutesSupervisor.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = React.Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>

                    {/* Protected routes for admin */}
                    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                        {privateRoutesAdmin.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = React.Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>

                    {/* Login and unauthorized routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
