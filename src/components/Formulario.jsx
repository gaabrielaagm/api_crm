import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {
    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(5, 'Nombre muy corto')
                    .max(20, 'Nombre muy largo')
                    .required('El Nombre del Cliente es Obligatorio'),
        empresa: Yup.string()
                    .required('El Nombre de la Empresa es Obligatorio'),
        email: Yup.string()
                    .email('Email no válido')
                    .required('El Email es Obligatorio'),
        telefono: Yup.number().typeError('El teléfono no es válido')
                    .integer('Número no válido')
                    .positive('Número no válido')
    })


    const handleSubmit = async (valores) => {
        try {
            let respuesta
            if (cliente.id) { 
                // Editando Registro
                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                // Nuevo Registro
                const url = 'http://localhost:4000/clientes'
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            await respuesta.json()
            navigate('/clientes')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        cargando ? <Spinner/> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-xl shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl uppercase text-center"> 
                    {cliente?.nombre ? 'Editar' : 'Agregar'} Cliente
                </h1>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? "",
                        empresa: cliente?.empresa ?? "",
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        notas: ''
                    }}
                    enableReinitialize={true}
                    validationSchema={nuevoClienteSchema}
                    onSubmit={ async (values, {resetForm}) => {
                        await handleSubmit(values)
                        resetForm()
                    }}
                >   
                    {(data) => {
                        const {errors, touched} = data
                        return (
                            <Form className="mt-10">
                                <div className="mb-4">
                                    <label className="text-gray-800" htmlFor="nombre">
                                        Nombre:
                                    </label>
                                    <Field
                                        id="nombre"
                                        type="text"   
                                        className="mt-2 block w-full p-3 bg-gray-100" 
                                        placeholder="Nombre del Cliente"
                                        name="nombre"
                                    />
                                    {errors.nombre && touched.nombre && (
                                        <Alerta>{errors.nombre}</Alerta>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="text-gray-800" htmlFor="empresa">
                                        Empresa:
                                    </label>
                                    <Field
                                        id="empresa"
                                        type="text"   
                                        className="mt-2 block w-full p-3 bg-gray-100" 
                                        placeholder="Empresa del Cliente"
                                        name="empresa"
                                    />
                                    {errors.empresa && touched.empresa && (
                                        <Alerta>{errors.empresa}</Alerta>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="text-gray-800" htmlFor="email">
                                        E-mail:
                                    </label>
                                    <Field
                                        id="email"
                                        type="email"   
                                        className="mt-2 block w-full p-3 bg-gray-100" 
                                        placeholder="E-mail del Cliente"
                                        name="email"
                                    />
                                    {errors.email && touched.email && (
                                        <Alerta>{errors.email}</Alerta>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="text-gray-800" htmlFor="telefono">
                                        Telefono:
                                    </label>
                                    <Field
                                        id="telefono"
                                        type="tel"   
                                        className="mt-2 block w-full p-3 bg-gray-100" 
                                        placeholder="Teléfono del Cliente"
                                        name="telefono"
                                    />
                                    {errors.telefono && touched.telefono && (
                                        <Alerta>{errors.telefono}</Alerta>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="text-gray-800" htmlFor="notas">
                                        Notas:
                                    </label>
                                    <Field
                                        as="textarea"
                                        id="notas"
                                        type="text"   
                                        className="mt-2 block w-full p-3 bg-gray-100 h-40" 
                                        placeholder="Notas del Cliente"
                                        name="notas"
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value={cliente?.nombre ? 'Guargar cambios' : "Crear Cliente"}
                                    className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                                />
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )
    )
}

// Si el no está presente, o no se envía ningun defaultProps
// Toma por default el siguiente
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario