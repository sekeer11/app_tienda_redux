const estadoInicial = {
  productos: [
    {
      id: 1,
      nombre: "Producto #1",
      descripcion: "Este el producto 1",
    },
    {
      id: 2,
      nombre: "Producto #2",
      descripcion: "Este el producto 2",
    },
    {
      id: 3,
      nombre: "Producto #3",
      descripcion: "Este el producto 3",
    },
    {
      id: 4,
      nombre: "Producto #4",
      descripcion: "Este el producto 4",
    },
  ],
  carrito: [],
};

const reducer = (estado = estadoInicial, accion) => {
  switch (accion.type) {
    case "AGREGAR_PRODUCTO_AL_CARRITO":
        const { idProducto, nombreProducto } = accion;
        // Añadiendo producto al carrito si está vacío
        if (estado.carrito.length === 0) {
          return {
            ...estado,
            carrito: [{ id: idProducto, nombre: nombreProducto, cantidad: 1 }],
          };
        } else {
          // Si no exite entonces lo agregamos

          // Clonamos el carrito
          const nuevoCarrito = [...estado.carrito];

          // Comprobamos si el producto que deseamos agregar ya esta en el carrito
          const yaEstaEnCarrito =
            nuevoCarrito.filter((producto) => {
              return producto.id === idProducto;
            }).length > 0;
          
          // Si ya existe en el carrito se actualiza la cantidad
          if (yaEstaEnCarrito) {
            // Para ello debemos de buscarlo y obtener su posicion en el arreglo
            // Y en base a su posiscion ya actualizamos el valor
            nuevoCarrito.forEach((producto, index) => {
              if (producto.id === idProducto) {
                const cantidad = nuevoCarrito[index].cantidad;
                nuevoCarrito[index] = {
                  id: idProducto,
                  nombre: nombreProducto,
                  cantidad: cantidad + 1
                }
              }
            });
          } else {
            nuevoCarrito.push({ id: idProducto, nombre: nombreProducto, cantidad: 1 });
          }

          return {
            ...estado,
            carrito: nuevoCarrito
          }

        }

    default:
      return estado;
  }
};

export default reducer;
