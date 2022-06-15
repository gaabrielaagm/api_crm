import { useState, useEffect } from "react"
import Cliente from '../components/Cliente'
import Spinner from '../components/Spinner'

const Inicio = () => {
  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = "http://localhost:4000/clientes"
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setClientes(resultado)
      } catch (e) {
        console.error(e)
      }
      setCargando(false)
    }

    obtenerClientesAPI()
  }, [])

  const handleEliminar = async id => {
    const confirmar = confirm('¿Deseas eliminar el cliente?')

    if (confirmar) {
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
        })
        const clientesUpdated = clientes.filter(cliente => cliente.id !== id)
        setClientes(clientesUpdated)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      {!cargando ? (
          clientes && clientes.length > 0? (
            <>
              <h1 className="font-black text-4xl text-blue-900">
                Clientes
              </h1>
              <p className="mt-3">Administra tus Clientes</p>

              <table className="w-full mt-5 table-auto shadow bg-white">
                  <thead className="bg-blue-800  text-white">
                    <tr>
                      <th className="p-2">Nombre</th>
                      <th className="p-2">Contacto</th>
                      <th className="p-2">Empresa</th>
                      <th className="p-2">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {clientes.map(cliente => (
                      <Cliente
                        key={cliente.id}
                        cliente={cliente}
                        handleEliminar={handleEliminar}/>
                    ))}
                  </tbody>
              </table>
            </>
          ) : (
            <>
              <p className="text-gray-900 font-bold text-xl">No Existen Clientes Registrados</p>
              <p className="text-gray-900 text-md">
                Comienza a crear uno nuevo en el menú 
                <span className="font-bold text-blue-600"> 'Nuevo Cliente'</span>
              </p>
            </>
          )
      ) : (
        <Spinner/>
      )}
    </>
  )
}

export default Inicio