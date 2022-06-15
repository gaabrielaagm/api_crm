import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"

const VerCliente = () => {
    const [cliente, setCliente] = useState({})
    const  [cargando, setCargando] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        setCargando(!cargando)
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
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
            {cargando ? (
                <Spinner />
                ) : (Object.keys(cliente).length > 0 ? ( 
                        <>
                        <h1 className="font-black text-4xl text-blue-900">
                            Ver Cliente
                        </h1>
                        <p className="mt-2">Información del Cliente</p>

                        <p className="text-gray-600 text-xl mt-10">
                            <span className="text-gray-800 capitalize font-bold">Cliente: </span> 
                            {cliente.nombre} 
                        </p> 
                        <p className="text-gray-600 text-xl mt-4">
                            <span className="text-gray-800 capitalize font-bold">Email: </span> 
                            {cliente.email}
                        </p> 
                        <p className="text-gray-600 text-xl mt-4">
                            <span className="text-gray-800 capitalize font-bold">Teléfono: </span> 
                            {cliente.telefono ? cliente.telefono : '-'}
                        </p>
                        <p className="text-gray-600 text-xl mt-4">
                            <span className="text-gray-800 capitalize font-bold">Empresa: </span> 
                            {cliente.empresa}
                        </p>
                        {cliente.notas && (
                            <p className="text-gray-600 text-xl mt-4">
                                <span className="text-gray-800 capitalize font-bold">Notas: </span> 
                                {cliente.notas}
                            </p>
                        )}
                    </>
                    ) : (
                        <p className="text-gray-900 font-bold text-xl"> Cliente No Existe</p>
                    )
                )
            }
             
        </div>
    )
}

export default VerCliente