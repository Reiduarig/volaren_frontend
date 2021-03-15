import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import { AppWaiting } from "../components/AppStatus";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Home from "../pages/home/Home";
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";

import Dashboard from '../components/dashboard/Dashboard';
import { ListaVuelos } from "../components/vuelos/listaVuelos/ListaVuelos";
import { VuelosReserva } from '../components/vuelos/reserva/VuelosReserva';
import { NotFoundPage } from "../components/notFoundPage/NotFoundPage";
import { Recovery } from '../auth/recovery/Recovery';
import { ResetPassword } from '../auth/recovery/ResetPassword';
import { Blog } from '../components/blog/Blog';
import { Post } from '../components/blog/Post';
import { PostSearch } from '../components/blog/PostSearch';
import { PostCreate } from '../components/blog/PostCreate';
import { PrivateRoute } from './PrivateRoute';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { Loading } from '../components/loading/Loading';
import ErrorBoundary from '../components/ErrorBoundary';
import { RedirectReserva } from '../components/vuelos/reserva/RedirectReserva';

export const Router = () => {

    const user = useSelector(s => s.auth)

    return (
        <BrowserRouter>
        <div className="container">
        <Header />
                <AppWaiting />
                <Switch>
    
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/recovery" component={Recovery} />
                    <Route exact path="/passwordReset" component={ResetPassword} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/post/:id" component={Post} />
                    <Route exact path="/post/search/:search" component={PostSearch}/>
                    <Route exact path="/reserva/:idVuelo" component={VuelosReserva} />
                    <Route exact path="/redirectReserva" component={RedirectReserva} />
                    
                    <Route exact path="/posts/post/create" component={PostCreate}>
                        {!user  ? <Redirect to="/" /> : <PostCreate />}
                    </Route>
                   
    
                     {/** A suspense no se le puede pasar una función como fallback, debe ser un componente o string */}
                    <Route exact path="/listaVuelos" >
                        <ErrorBoundary fallback={<h2>No se han encontrado vuelos</h2>}>
                            <Suspense fallback={<Loading />}>
                                <ListaVuelos />
                            </Suspense>
                        </ErrorBoundary>     
                    </Route>
                    
                    <PrivateRoute
                            path="/dashboard"
                            component={Dashboard}
                            user={user}
                    />
    
                    <Route component={NotFoundPage} />
                    
                </Switch>
        <Footer />
    </div>
    </BrowserRouter>
    )
}
