import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { BsCircleFill } from "react-icons/bs";
import { GoListUnordered } from "react-icons/go";


import { GETfaq, nuevaFAQ, editarFAQ, eliminarFAQ } from '../../helpers/database';
import { useForm } from "../../hooks/useForm";
import { Link } from 'react-router-dom';

export const PreguntasFrecuentes = () => {
    // State de preguntas frecuentes----------------------------------------------------------------------------------
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {//Evita que se haga la peticion multiples veces.
        GETfaq().then(data => { //Se obtienen las preguntas de la base de datos.
        setFaqs(data) //faqs = data
    })
    }, [setFaqs])//Si uno de los valores del arreglo cambia se ejecuta el useEffect

    const actualizarPreguntas = () =>{
        GETfaq().then(data => { //Se obtienen las preguntas de la base de datos.
            setFaqs(data) //faqs = data
        })
    }
    // Pregunta activa, valores y acciones-----------------------------------------------------------------------------
    const [activeFAQ, setActiveFAQ] = useState([]); // State de preguntas activa para editar.
    const [numeroPregunta, setnumeroPregunta] = useState(0); //State del numero de la pregunta por el orden dispuesto.

    const handleActiveFAQ = ( faq, i ) =>{ //Se obtiene los datos de la pregunta que se va a editar.
        //Se confirma, en caso de que haya datos en los campos, si se desea editar, ya que serán borrados.
        if(Pregunta || Respuesta){
            Swal.fire({ 
                text: 'Los datos actuales en los campos se cambiaran, ¿Editar otra pregunta?',
                showCancelButton: true,
                confirmButtonText: `Editar`,
              }).then((result) => {
                if (result.isConfirmed) {
                    reset();
                    setnumeroPregunta(i);
                    setActiveFAQ(faq);
                    setStatus(null);
                  
                }})
        }else{
            reset();
            setnumeroPregunta(i);
            setActiveFAQ(faq);
            setStatus(null)
        }
    }   

    const handleCleanActiveFAQ = () =>{//Se limpian los campos y se deselecciona la pregunta activa.
        //Se confirma cancelar editar, ya que se borran los campos, sin modificar FAQ.
        Swal.fire({ 
            icon: 'warning',
            title: '¿Cancelar edición?',
            showCancelButton: true,
            confirmButtonText: `Cancelar`,
            confirmButtonColor:'#FFC107'
          }).then((result) => {
            if (result.isConfirmed) {
                setActiveFAQ([]);
                setnumeroPregunta(0);
                reset();
                setStatus(null)
            }})

    }

    // Valores del formulario------------------------------------------------------------------------------------------
        // formValues tendrá los valores de los campos del formulario.
        // handleInputChange actualiza los valores de los campos.
        // Limpia los valores de todo el formulario.
    const [ formValues, handleInputChange, reset ] = useForm({ //Valores iniciales del formulario pasados en un objeto.
        Pregunta: '',
        Respuesta: ''
    });
    
    const { Pregunta, Respuesta } = formValues; //Se extraen los valores del formulario  para su uso.
    const [Status, setStatus] = useState();
    
    const handleStatus = () =>{
        setStatus(!Status)
        setActiveFAQ({...activeFAQ, Status: !Status})
    }
    
    //Envío del formulario----------------------------------------------------------------------------------------------
    const handleSubmit = async (e) =>{
        e.preventDefault(); //Previene la actualizacion del formulario.
        const Orden = faqs.length === 0 ? 1 : faqs.length + 1 ;
        
        if(activeFAQ.Id){ //Si hay Id es actualizacion de pregunta existente.
           
            const data ={
                Id: activeFAQ.Id,
                Pregunta: Pregunta || activeFAQ.Pregunta,
                Respuesta: Respuesta || activeFAQ.Respuesta,
                Status: Status || activeFAQ.Status
            }

            const POST = await editarFAQ(data)

            if(POST === 200){
                reset();
                setActiveFAQ([]);
                setStatus(null);
                Swal.fire(
                'Editada',
                '',
                'success'
                )
                
                //Hace GET de formularios------------------
                actualizarPreguntas();

            }else{
                Swal.fire(
                    'Pregunta no editada',
                    '',
                    'error'
                )
            }
            
        }else{//Agregar una nueva pregunta.
            if( Pregunta && Respuesta && (Status === true || Status === false) ){
                const data ={
                        Pregunta,
                        Respuesta,
                        Status,
                        Orden
                    }
                    const POST = await nuevaFAQ(data);
                    
                    if(POST === 200){
                        reset();
                        setActiveFAQ([]);
                        setStatus(null);
                        Swal.fire(
                        'Agregada',
                        '',
                        'success'
                        )

                        //Hace GET de formularios------------------
                        actualizarPreguntas();

                    }else{
                        Swal.fire(
                            'Pregunta no agregada',
                            '',
                            'error'
                        )
                    }
            }else{
                Swal.fire(
                    'Todos los campos deben ser llenados',
                    '',
                    'error'
                )
            }
        }
    }

    // Eliminar FAQ----------------------------------------------------------------------
    const handleEliminarFAQ = () => {

        Swal.fire({ 
            icon: 'warning',
            title: '¿Desea eliminar esta pregunta?',
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            confirmButtonColor:'#DC3545'
          }).then(async (result) => {
            if (result.isConfirmed) {

                const DELETE = await eliminarFAQ(activeFAQ.Id);

                if(DELETE === 200){
                    reset();
                    setActiveFAQ([]);
                    
                    Swal.fire(
                    'Eliminada',
                    '',
                    'success'
                    );
                    
                    //Hace GET de formularios------------------
                    actualizarPreguntas();

                }else{
                    Swal.fire(
                        'Pregunta no eliminada',
                        '',
                        'error'
                    )
                }
                
            }})
        
    }

    return (
        <>  
            <div className="general__mainContainer">    
                {/* List Box------------------------------------------------------------------------ */}
                <div>
                    <div className="faq__listbox mb-2">
                        {
                            faqs &&
                            faqs.map( (faq, i) => (
                                <div className="d-flex" key={ faq.Id } onClick={ () => { handleActiveFAQ( faq, i ) } }>
                                    <div>
                                        {
                                        !faq.Status
                                            ? <BsCircleFill className="mb-1 mx-1 text-danger" />
                                            : <BsCircleFill className="mb-1 mx-1 text-success" />
                                        }
                                    </div>
                                    <h6 className={ `general__click pb-2` }>{++i}. { faq.Pregunta }</h6>
                                </div>
                            ))
                        }
                    </div>

                    {/* Pantalla de cambiar orden------------------------------ */}
                    <Link className='general__link' to='/OrdenPreguntasFrecuentes'>
                        <small>
                            <span 
                                className="mx-1 text-info d-flex align-items-center">
                                    <GoListUnordered /> Editar orden 
                            </span>
                        </small>
                    </Link>
                </div>

                {/* Formulario------------------------------------------------------------------------ */}
                <div className="faq__form col-9">

                    {//Titulo de formulario--------------------------------------------------
                        activeFAQ.Id //Si hay una pregunta activa
                        ? <h3>Editar Pregunta { numeroPregunta }</h3> //mostrar esto,
                        : <h3>Nueva pregunta</h3> //sino, mostrar esto.
                    }

                    {/* Campo pregunta-----------------------------------------------------*/}
                    <form onSubmit={ handleSubmit }>
                        <div className="form-group "> 
                            <label htmlFor="Pregunta">Pregunta</label>
                            <textarea 
                                name="Pregunta" 
                                className="form-control mt-2"  
                                rows="3"  
                                placeholder="Pregunta"
                                value = {  Pregunta || activeFAQ.Pregunta || ''  }
                                onChange={ handleInputChange }
                            />
                        </div>

                    	{/* Campo respuesta------------------------------------------------*/}
                        <div className="form-group py-3"> 
                            <label htmlFor="Respuesta">Respuesta</label>
                            <textarea 
                                name="Respuesta" 
                                className="form-control mt-2"  
                                rows="8"  
                                placeholder="Respuesta"
                                value = { Respuesta || activeFAQ.Respuesta || '' }
                                onChange={ handleInputChange }
                            />
                        </div>

                        {/* Campo respuesta------------------------------------------------*/}
                      
                
                            <label htmlFor="Respuesta">Status</label>
                            <div className="d-flex mb-3">
                                <div className="form-check ">
                                    <input className="form-check-input" type="radio" name="Status" value={ true } checked={ activeFAQ.Status === true || Status === true }  onChange={ handleStatus } />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Activo
                                    </label>
                                </div>
                                <div className="form-check mx-4">
                                    <input className="form-check-input" type="radio" name="Status" value={ false } checked={ activeFAQ.Status === false || Status === false  }  onChange={ handleStatus }  />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        No activo
                                    </label>
                                </div>
                            </div>
                     
                        
                       
                        {/* Guardar--------------------------------------------------------*/}
                        <button  
                            type="submit" 
                            className="btn btn-primary"
                        >
                            Guardar
                        </button>

                        {/* Cancelar edición-----------------------------------------------*/}
                        {
                            activeFAQ.Pregunta &&
                            
                            <span //span para no activar el submit al hacer click
                                onClick={ handleCleanActiveFAQ }
                                className="btn btn-warning mx-3"
                            >
                                Cancelar
                            </span>
                        }
                        
                        {/* Cancelar edición-----------------------------------------------*/}
                        {
                            activeFAQ.Pregunta &&
                            
                            <span //span para no activar el submit al hacer click
                                onClick={ handleEliminarFAQ }
                                className="btn btn-danger"
                            >
                                Eliminar
                            </span>
                        }
                    </form>
                </div> {/* divFormulario */}

            </div> {/* general__mainContainer */}
        </>
    )
}
