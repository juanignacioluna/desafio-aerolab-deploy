import React, { useState, useEffect } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import Productos from './Productos/Productos';

import {UsuarioProvider, useUsuario} from './Context/usuario-context'

import './App.css';


export default ()=> <UsuarioProvider>
  <App></App>
</UsuarioProvider>



function App() {

  return (

      <BrowserRouter>

        <div>

          <NavBar />

          <Redirect
            from="/"
            to="/home" />

          <Switch>

            <Route
              path="/home"
              component={Home} />

            <Route
              path="/productos"
              component={Productos} />

          </Switch>

        </div>

      </BrowserRouter>


  );
}
