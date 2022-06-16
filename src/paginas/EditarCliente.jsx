import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Formulario from "../components/Formulario"
import Spinner from "../components/Spinner"

const EditarCliente = () => {
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    setCargando(!cargando)
    const obtenerClienteAPI = async () => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/${id}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            setCliente(resultado)
        } catch (err) {
            console.log(err)
        }
        setCargando(false)
    }
    obtenerClienteAPI()
}, [])

  return (
    <div>
      { cargando ? (
        <Spinner/>
      ) : (
        cliente?.nombre ? (
          <>
            <h1 className="font-black text-4xl text-blue-900">
              Editar Cliente
            </h1>
            <p className="mt-3">Utiliza el formulario para realizar cambios:</p>
            <Formulario
              cliente={cliente}
              cargando={cargando}
            />
          </>
        ) : (
          <p className="font-bold text-xl">Cliente No Válido</p>
        )
      )}
    </div>
  )
}

export default EditarCliente