// la func recibe de param un usuario con email y password

// Guardamos la variable de entorno en una constant 
//  import.meta.env.+nombre de mi variable de entorno 
// esto es una config propia de VITE para traer las variables de entorno.
const uriUsuario = import.meta.env.VITE_API_USUARIO

const uriProducto = import.meta.env.VITE_API_PRODUCTO


// export const login = async (usuario) => {
//   try {
//     // pedir la lista de usuarios a json-server

//     const respuesta = await fetch(uriUsuario);
//     const listaUsuarios = await respuesta.json();
//     // buscar si el usuario que completo el formulario esta dentro de la lista de json-server 
//     const usuarioBuscado = listaUsuarios.find((itemUsuario) => itemUsuario.email === usuario.email)

//     // preguntar si encontre el usuario
//     if (usuarioBuscado) {
//       // si encontré el usuario y su password es correcto, esta todo ok 
//       if (usuarioBuscado.password === usuario.password) {
//         console.log('todo esta perfecto!');
//         return usuarioBuscado
//       } else {
//         console.log('el password es erróneo');
//       }
//     } else {
//       // caso contrario tendría que decir que salio todo mal 
//       console.log('el email es incorrecto');
//       return null;
//     }
//   } catch (error) {
//     console.log("file: queries.js:5 ~ login ~ error:", error)
//   }
// }

export const login = async (usuario) => {
  try {
    console.log(usuario);
    const respuesta = await fetch(uriUsuario, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    const datos = await respuesta.json();
    return {
      status: respuesta.status,
      mensaje: datos.mensaje,
      usuario: datos.nombreUsuario,
      // token: datos.token,
      uid: datos.uid,
    };
  } catch (error) {
    console.log("errores en el login");
    return;
  }
}

// solicitudes o peticiones a la API
// petición GET devuelve un listado de elementos o un elemento(string,object, array etc)
// petición POST, crear un elemento nuevo. Situación especial (login)
// petición PUT, modificar todos los valores de un elemento.
// petición PATCH, modifica un valor o algún valor de un elemento.
// petición DELETE, eliminar un elemento.

// Get
export const listarProducto = async () => {
  try {
    const respuesta = await fetch(uriProducto)
    // body = respuesta
    // status = status de la respuesta
    const listaProductos = await respuesta.json(); // extraigo los datos del body con .json()

    return listaProductos

  } catch (error) {
    console.log(error);
  }

}

// POST
export const crearProducto = async (producto) => {
  try {
    // como segundo parámetro le vamos a pasar un object 
    const resp = await fetch(uriProducto, {
      // propiedad 1:  method para hacer la petición Post
      method: 'POST',
      // propiedad 2:  almacenamos en el headers en que formato o tipo de contenido vamos a guardar el object producto.
      headers: {
        'Content-Type': 'application/json'
      },
      // tercer propiedad le pasamos en body lo que mandamos pero em JSON
      body: JSON.stringify(producto)
    })
    return resp
  } catch (error) {
    console.log(error);
  }

}

// obtener un producto
export const obtenerProducto = async (id) => {
  try {
    const resp = await fetch(`${uriProducto}/${id}`);
    const data = await resp.json();
    return data
  } catch (error) {
    console.log(error);
  }

}

// PUT
export const editarProducto = async (id, productoEditado) => {
  try {
    const resp = await fetch(`${uriProducto}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productoEditado)
    });
    return resp
  } catch (error) {
    console.log(error);
  }

}

// DELETE

export const borrarProductoAPI = async (id) => {
  try {
    const respuesta = await fetch(`${uriProducto}/${id}`, {
      method: "DELETE"
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
}