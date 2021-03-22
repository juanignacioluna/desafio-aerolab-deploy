import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Productos.css';
import header from '../assets/header-x2.png';
import flechaIzq from '../assets/icons/arrow-left.svg';
import flechaDer from '../assets/icons/arrow-right.svg';
import CardProducto from '../CardProducto/CardProducto';

function Productos(props){

	const [productos, setProductos] = useState([])

	const [pagina, setPagina] = useState(1)

	useEffect(() => {

		fetch("https://coding-challenge-api.aerolab.co/products", {
		  method: 'GET',
		  headers:{
		    'Content-Type': 'application/json',
			'Accept':'application/json',
			'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU2NmU2YWEyNGI1NzAwMjBjNmM2ZTgiLCJpYXQiOjE2MTYyNzcwOTh9.59GKhJKVEp8u48lIqWXuThIYZ3Llju7NyLPyAO6PT8I'
		  }
		}).then(res => res.json())
		.then(response => setProductos(response)); 
  
 	}, []);

 	let ordenarProductos = (e)=>{
 		const elemento = e.target
 		let botones = document.querySelectorAll(".header-grilla .boton")
		botones.forEach((boton)=>{
			boton.style.background="#b8b8b8"
			boton.style.color="#4F4F4F"
		})
		elemento.style.background="#1AD7FA"
		elemento.style.color="white"

		let productosAux = productos

		switch (elemento.dataset.order) {
		  case "1":
			productosAux.sort((a, b)=>{
			  if (a._id > b._id) {
			    return 1;
			  }
			  if (a._id < b._id) {
			    return -1;
			  }
			  return 0;
			})
			break;
		  case "2":
			productosAux.sort((a, b)=>{
				return a.cost - b.cost;
			})
			break;
		  case "3":
			productosAux.sort((a, b)=>{
				return b.cost - a.cost;
			})
			break;
		}

		setProductos([...productosAux])

		setPagina(1)

 	}

    return (


      <div className="Productos">

      	<header style={{
      		backgroundImage: "url("+header+")",
      		color:"white",
      		display:"flex",
      		alignItems:"flex-end",
      		fontWeight: "bold",
      		backgroundSize:"100% auto",
      		backgroundRepeat: "no-repeat"
      	}}>
      		<h1>Electronics</h1>
      	</header>

      	<section className="header-grilla">

      		<div className="cantidad-contenedor">
		      	<span className="cantidadProductos">{pagina*8} of {productos.length} products</span>
      		</div>

	      	<span className="sortBy">Sort by:</span>

	      	<p data-order="1" style={{
				background:"#1AD7FA",
				color:"white"
      		}}
	      	className="boton recent" onClick={ordenarProductos}>Most recent</p>

	      	<p data-order="2" 
	      	className="boton lowestPrice" onClick={ordenarProductos}>Lowest price</p>

	      	<p data-order="3" 
	      	className="boton highestPrice" onClick={ordenarProductos}>Highest price</p>

	      	<span className="flechas">
		      	<span onClick={()=>{
		      		if(pagina!=1){
		      			setPagina(pagina-1)
		      		}
		      		
		      	}} 
		      	className="flecha"><img src={flechaIzq} /></span>

		      	<span onClick={()=>{
		      		if(pagina!=(productos.length/8)){
		      			setPagina(pagina+1)
		      		}
		      		
		      	}} 
		      	className="flecha"><img src={flechaDer} /></span>
	      	</span>

	    </section>

	    <hr></hr>

		<section className="contenedorProductos">

			{
					productos.map((producto, index) => {

						if((index>=((pagina-1)*8))&&(index<(pagina*8))){

							return <CardProducto key={producto._id} img={producto.img.hdUrl} id={producto._id}
							categoria={producto.category} modelo={producto.name} costo={producto.cost}/>

						}
					})

			}

	    </section>

      </div>


    );

}

export default Productos;
