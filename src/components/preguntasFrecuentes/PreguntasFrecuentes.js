import React, { useEffect, useState } from 'react'
import { GETfaq } from '../../helpers/database'

import { useForm } from "../../hooks/useForm";

export const PreguntasFrecuentes = () => {
    // State de preguntas frecuentes-----------------------------------------
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {//Evita que se haga la peticion multiples veces
        GETfaq().then(data => { //Se obtienen las preguntas de la base de datos
        setFaqs(data) //faqs = data
    })
    }, [setFaqs])

    // Pregunta activa---------------------------------------------------------
    const [activeFAQ, setActiveFAQ] = useState([])	

    const handleActiveFAQ = ( faq ) =>{
        
    }   

    const handleCleanActiveFAQ = () =>{
        setActiveFAQ([])
        reset()
    }

    // Valores del formulario--------------------------------------------------
    const [ formValues, handleInputChange, reset ] = useForm({
        Pregunta: '',
        Respuesta: '',
        Disponible: true
    });

    const { Pregunta, Respuesta } = formValues;


   
    const handleSubmit = (e) =>{
        e.preventDefault(); //Previene la actualizacion del formulario
        
    }

    return (
        <>
            <div className="general__mainContainer d-flex">
                <div className="faq__listbox">

                    {
                    faqs &&
                        faqs.map( (faq, i) => (
                            faq.Status &&
                                <div key={ faq.Id } onClick={ () => { handleActiveFAQ( faq ) } }>
                                    <h6 className="general__click">{ faq.Pregunta }</h6>
                                </div>
                        ))
                    }
                </div>

                {/* Formulario------------------------------------------------------------------------ */}
                <div className="px-5 col-8">
                    <form onSubmit={ handleSubmit }>
                        <div className="form-group "> {/* Campo pregunta------------------ */}

                            <label htmlFor="Pregunta">Pregunta</label>

                            <textarea 
                                name="Pregunta" 
                                className="form-control mt-2"  
                                rows="3"  
                                placeholder="Pregunta"
                                value = {  Pregunta   }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="form-group py-3"> {/* Campo respuesta------------------ */}

                            <label htmlFor="Respuesta">Respuesta</label>

                            <textarea 
                                name="Respuesta" 
                                className="form-control mt-2"  
                                rows="3"  
                                placeholder="Respuesta"
                                value = { Respuesta  }
                                onChange={ handleInputChange }
                            />

                        </div>

                        {/* Enviar------------------ */}
                        <button  
                            type="submit" 
                            className="btn btn-primary"
                        >
                            Enviar
                        </button>

                         {/* clean------------------ */}

                    </form>
                        {
                            activeFAQ.Pregunta &&
                            <button
                                onClick={ handleCleanActiveFAQ }
                                className="btn btn-warning mx-3"
                            >
                                Limpiar
                            </button>
                        }
                </div>
    
            </div>
        </>
    )
}
