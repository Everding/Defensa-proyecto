import React from 'react'
import '../Styles/Main.css';
import {Table, Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {URL_PRODUCTOS} from '../Constants/endpoints';
import {Link} from 'react-router-dom'
const Main = () => {

const [datos, setDatos] = useState ([]);

const getProductos = async () => {
  try {
    const response = await axios.get (URL_PRODUCTOS);
    setDatos (response.data);
    console.log (response.data);
  } catch (error){
    console.error("Error al obtener los productos", error);
  }
}

useEffect (() =>{
  getProductos();
}, []);

const Borrar = async (id) =>{
  try{
    await axios.delete(`${URL_PRODUCTOS}/${id}`);
    getProductos();
  } catch{
    console.error("error al eliminar producto", error);
  }
}

  return (
    <div>
      <h1>Productos</h1>
      <div className='containerMain'>
      <Link to='/productoNuevo' className='btn btn-success'> Crear Producto nuevo </Link>
           <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoria</th>
              <th>Sucursal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>{producto.categoria}</td>
                <td>{producto.sucursal}</td>
                <td>
                  <Button className='btn btn-primary'>Editar</Button>{' '}
                  <Button className='btn btn-danger'>Ver</Button>{' '}
                  <Button onClick={() => Borrar(producto.id)} className='btn btn-success'>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>


      </div>
    </div>
  )
}

export default Main