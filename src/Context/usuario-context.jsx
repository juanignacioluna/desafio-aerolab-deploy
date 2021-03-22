import React, { Component, useState, useEffect, useMemo } from 'react';

const UsuarioContext = React.createContext()

export function UsuarioProvider(props){

    const [name, setName] = useState([])
    const [points, setPoints] = useState([])

    useEffect(() => {

    	actualizarDatos()
    
    }, []);

    let actualizarDatos = ()=>{
      fetch("https://coding-challenge-api.aerolab.co/user/me", {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
        'Accept':'application/json',
        'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU2NmU2YWEyNGI1NzAwMjBjNmM2ZTgiLCJpYXQiOjE2MTYyNzcwOTh9.59GKhJKVEp8u48lIqWXuThIYZ3Llju7NyLPyAO6PT8I'
        }
      }).then(res => res.json())
      .then(response => {setName(response.name);setPoints(response.points)}); 
    }

    const value = useMemo(()=>{
    	return({
    		name,
    		points,
    		actualizarDatos
    	})
    }, [name, points, actualizarDatos])

    return <UsuarioContext.Provider value={value} {...props}/>

}


export function useUsuario(){
	const context = React.useContext(UsuarioContext)
	return context
}