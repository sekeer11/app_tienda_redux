import React, {useState} from 'react';
import styled from 'styled-components';
import { NavLink, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio';
import Blog from './components/Blog';
import Tienda from './components/Tienda';
import Error404 from './components/Error404'
import Carrito from './components/Carrito';


const App = () => {

  const productos = [
    {
        id: 1,
        nombre: 'Producto #1',
        descripcion: 'Este el producto 1'
    },
    {
        id: 2,
        nombre: 'Producto #2',
        descripcion: 'Este el producto 2'
    },
    {
        id: 3,
        nombre: 'Producto #3',
        descripcion: 'Este el producto 3'
    },
    {
        id: 4,
        nombre: 'Producto #4',
        descripcion: 'Este el producto 4'
    }
  ]
  
  const[carrito, cambiarCarrito] = useState([]);

  const agregarProductoAlCarrito = (idProducto, nombreProducto) => {
    if (carrito.length === 0) {
      // Añadiendo producto al carrito si está vacío
      cambiarCarrito([
        {id: idProducto, nombre: nombreProducto, cantidad: 1}
      ]);
    } else {
      // Si no exite entonces lo agregamos
      
      // Clonamos el carrito
      const nuevoCarrito = [...carrito];
      
      // Comprobamos si el producto que deseamos agregar ya esta en el carrito
      const yaEstaEnCarrito = nuevoCarrito.filter((producto) => {
        return producto.id === idProducto
      }).length > 0;
      
      // Si ya existe en el carrito se actualiza la cantidad
      if (yaEstaEnCarrito) {
        // Para ello debemos de buscarlo y obtener su posicion en el arreglo
        // Y en base a su posiscion ya actualizamos el valor
        nuevoCarrito.forEach((producto, index) => {
          if (producto.id === idProducto) {
            const cantidad = nuevoCarrito[index].cantidad
            nuevoCarrito[index] = {id: idProducto, nombre: nombreProducto, cantidad: cantidad+1} 
          }
        });
      // De otra forma entonces agregamos el producto al arreglo  
      } else {
        nuevoCarrito.push(
          {id: idProducto, nombre: nombreProducto, cantidad: 1}
        );
      }
      cambiarCarrito(nuevoCarrito);
    }
  }

  return ( 
    
      <Contenedor>
        <Menu>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/tienda">Tienda</NavLink>
        </Menu>
        <main>
          <Routes>
            <Route path="/" element={<Inicio /> } />
            <Route path="/blog" element={<Blog /> } />
            <Route 
              path="/tienda" 
              element={
                <Tienda productos={productos} agregarProductoAlCarrito={agregarProductoAlCarrito} /> 
              } 
            />
            <Route path="*" element={<Error404 /> } />
          </Routes>
        </main>
        <aside>
          <Carrito carrito={carrito} />
        </aside>
      </Contenedor>
   );
}

const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;
 
const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;
export default App;
