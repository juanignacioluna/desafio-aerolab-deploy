import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../assets/aerolab-logo.svg';
import coin from '../assets/icons/coin.svg';
import {UsuarioProvider, useUsuario} from '../Context/usuario-context'


function NavBar(){

    const {name, points} = useUsuario()


    return (
      <div className="NavBar">



          <nav class="navbar navbar-expand-lg navbar-light bg-light">

            <div class="container-fluid">

              <Link class="navbar-brand" to="/home">
                <img src={logo} />
              </Link>

              <div class="datosPersonales">
                  
                <span>{name}</span>

                <span>
                  {points}
                  <img src={coin} />
                </span>

              </div>

            </div>

          </nav>

      </div>
    );

}

export default NavBar;
