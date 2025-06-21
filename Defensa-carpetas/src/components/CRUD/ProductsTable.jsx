import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { URL_PRODUCTOS } from '../../Constants/endpoints';
import { useNavigate } from 'react-router-dom';

const ProductsTable = () => {
  const navigate = useNavigate();

  const initialState = {
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    sucursal: ''
  };

  const [producto, setProducto] = useState(initialState);

  const categorias = [
    "refrescos",
    "agua",
    "alcohol",
    "jugos",
    "energizantes",
    "deportivos"
  ];

  const sucursales = [
    "Central",
    "Norte",
    "Sur",
    "Oeste",
    "Este"
  ];

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL_PRODUCTOS, producto);
      setProducto(initialState);
      if (response) {
        console.log("producto creado:", response.data);
        navigate('/');
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  return (
    <div>
      <h2>Agregar nuevo producto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="ProductoNombre">
          <Form.Label>Nombre del producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduzca el nombre"
            value={producto.nombre}
            name="nombre"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="PrecioProducto">
          <Form.Label>Precio del producto</Form.Label>
          <Form.Control
            type="number"
            placeholder="Precio"
            value={producto.precio}
            name="precio"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="StockProducto">
          <Form.Label>Stock Disponible</Form.Label>
          <Form.Control
            type="number"
            placeholder="Stock"
            value={producto.stock}
            name="stock"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="CategoriaProducto">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            value={producto.categoria}
            name="categoria"
            onChange={handleChange}
          >
            <option value="">-- Seleccionar categoría --</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="SucursalProducto">
          <Form.Label>Sucursal</Form.Label>
          <Form.Select
            value={producto.sucursal}
            name="sucursal"
            onChange={handleChange}
          >
            <option value="">-- Seleccionar sucursal --</option>
            {sucursales.map((sucursal) => (
              <option key={sucursal} value={sucursal}>
                {sucursal}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar producto
        </Button>
      </Form>
    </div>
  );
};

export default ProductsTable;
