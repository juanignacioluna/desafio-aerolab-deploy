import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CardProducto.css';
import buyWhite from '../assets/icons/buy-white.svg';
import buyBlue from '../assets/icons/buy-blue.svg';
import {UsuarioProvider, useUsuario} from '../Context/usuario-context'
import coin from '../assets/icons/coin.svg';



function CardProducto(props){

    const {points, actualizarDatos} = useUsuario()

    const [mostrarPrecio, setMostrarPrecio] = useState(false)

    const [comprandoProducto, setComprandoProducto] = useState(false)

    let redeem = ()=>{

      setComprandoProducto(true)

      fetch("https://coding-challenge-api.aerolab.co/redeem", {
        method: 'POST', 
        body: JSON.stringify({
          productId:props.id
        }), 
        headers:{
          'Content-Type': 'application/json',
          'Accept':'application/json',
          'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU2NmU2YWEyNGI1NzAwMjBjNmM2ZTgiLCJpYXQiOjE2MTYyNzcwOTh9.59GKhJKVEp8u48lIqWXuThIYZ3Llju7NyLPyAO6PT8I'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {

        actualizarDatos()

        setMostrarPrecio(false)

        setComprandoProducto(false)


      })

    }

    return (
      <div className="CardProducto">

          <div
            class="modal fade"
            id={"modal"+props.id}
            data-mdb-backdrop="static"
            data-mdb-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Comprando el producto...</h5>
              </div>
                <div class="modal-body">

                  {(comprandoProducto) &&
                    <div class="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  }

                  {(!comprandoProducto) &&
                    <h5>Felicitaciones, disfrute de su nuevo {props.modelo}</h5>
                  }

                </div>

                {(!comprandoProducto) &&
                  <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-mdb-dismiss="modal">
                       Volver a la tienda
                    </button>
                  </div>
                }

              </div>
            </div>
          </div>


          <div onClick={(e)=>{
            if(mostrarPrecio){
              setMostrarPrecio(false)
            }else{
              setMostrarPrecio(true)
            }
            
          }} className="producto-contenedor">

            <span className="buy-contenedor">
              <img className="buyIcon" src={buyBlue} />
            </span>
            <img className="productImg" src={props.img} />

            <hr></hr>

            <p className="categoria">{props.categoria}</p>

            <p className="modelo">{props.modelo}</p>

            {(points>=props.costo) && (mostrarPrecio) &&
              <div className="redeem-contenedor">
                <span className="buy-contenedor">
                  <img className="buyIcon" src={buyWhite} />
                </span>
                <section>
                  <h1 className="costo">{props.costo}</h1>
                  <img className="coin" src={coin} /><br/>
                  <button onClick={redeem}
                  type="button" data-mdb-toggle="modal" 
                  data-mdb-target={"#modal"+props.id} 
                  className="btn btn-light btn-rounded redeem-boton">Redeem now</button>
                </section>
                
              </div>
            }

            {(points<props.costo) && (mostrarPrecio) &&
              <div className="no-redeem-contenedor">
                  <h6>You need {props.costo - points} more</h6>
                  <img className="coin" src={coin} /><br/>
              </div>
            }
          
        </div>
      </div>
    );

}

export default CardProducto;
