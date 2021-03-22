import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './Home.css';


function Home(){

    return (

      <div className="Home">

		<header>
		  <div class="p-5 text-center bg-light">
		    <h1 class="mb-3">Bienvenido a la tienda de electronica</h1>
		    <h4 class="mb-3">Aquí podras comprar productos de excelente calidad, a bajo precio!</h4>
		    <Link to="/productos">
		    	<button type="button" class="btn bg-info text-white">Ver productos</button>
		    </Link>
		  </div>
		</header>

      </div>


    );

}

export default Home;
