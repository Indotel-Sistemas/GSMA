import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { BsCircleFill } from 'react-icons/bs';
import { GrDrag } from 'react-icons/gr';

import { GETfaq, editarFAQOrden } from '../../helpers/database';
import Swal from 'sweetalert2';


export const OrdenPreguntasFrecuentes = ({history}) => {
    
    // State de preguntas frecuentes----------------------------------------------------------------------------------
    const [faqs, setFaqs] = useState([]);

    // State de orden de preguntas---------------------------------------------------------------------------------

    useEffect(() => {//Evita que se haga la peticion multiples veces.
        GETfaq().then(data => { //Se obtienen las preguntas de la base de datos.
        setFaqs(data) //faqs = data
    })
    }, [setFaqs])//Si uno de los valores del arreglo cambia se ejecuta el useEffect
 
    //  const actualizarPreguntas = () =>{
    //      GETfaq().then(data => { //Se obtienen las preguntas de la base de datos.
    //          setFaqs(data) //faqs = data
    //      })
    //  }

    const handleOnDragEnd = (result) => {
        const items = [...faqs];
        const [recordedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, recordedItem);
        setFaqs(items);
    }

    const handleGuardar = () => {

         Swal.fire({ 
                text: '¿Guardar cambios?',
                showCancelButton: true,
                confirmButtonText: `Guardar`,
              }).then((result) => {
                if (result.isConfirmed) {
               
                    editarFAQOrden(faqs)
                    history.push('/PreguntasFrecuentes')
                }})
                
    }

    return (
        <div>
            <div className="general__mainContainer">    
                {/* List Box------------------------------------------------------------------------ */}
                
                <div className="faq__listbox faq__editOrder">
                    <DragDropContext onDragEnd={ handleOnDragEnd }>
                        <Droppable droppableId="faqLista">
                            {( provided )=> (
                                <div {...provided.droppableProps} ref={provided.innerRef} >
                                    {
                                        faqs &&
                                        faqs.map( (faq, i) => (
                                            <Draggable key={ faq.Id } draggableId={(faq.Id).toString()} index={i}>
                                            {(provided) => (
                                                
                                                <div 
                                                    className="d-flex alig general__click" 
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <GrDrag className="mt-1" />
                                                    <div>
                                                        {
                                                            !faq.Status
                                                                ? <BsCircleFill className="mb-1 mx-1 text-danger" />
                                                                : <BsCircleFill className="mb-1 mx-1 text-success" />
                                                            }
                                                    
                                                    </div>
                                                    <h6 className={ `pb-2` }>{ faq.Pregunta }</h6>
                                                </div>
                                            )}
                                            </Draggable>
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>

                <div className="faq__form col-9 px-3">
                    <h5>Editar orden de preguntas frecuentes</h5>
                    <p>Arrastre y suelte las preguntas en la posición que desea para cambiar el orden.</p>

                    
                    {/* Cancelar edición-----------------------------------------------*/}
                    <Link to='/PreguntasFrecuentes'>
                        <span //span para no activar el submit al hacer click
                            className="btn btn-warning"
                        >
                            Cancelar
                        </span>
                    </Link>

                    {/* Guardar edición-----------------------------------------------*/}
                    <span //span para no activar el submit al hacer click
                        onClick={ handleGuardar }
                        className="btn btn-primary mx-3"
                    >
                        Guardar
                    </span>
                </div>
            </div>
        </div>
    )
}
