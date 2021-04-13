import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { Home } from '../components/Home'
import { OrdenPreguntasFrecuentes } from '../components/preguntasFrecuentes/OrdenPreguntasFrecuentes';
import { PreguntasFrecuentes } from '../components/preguntasFrecuentes/PreguntasFrecuentes'
import { Navbar } from '../components/ui/Navbar';

export const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                
                <Route 
                    exact  //el path necesita ser exacto al establecido
                    path="/Home"  //path establecido
                    component={ Home }  //componente a renderizar
                />

                <Route exact path='/PreguntasFrecuentes' component={ PreguntasFrecuentes } />
                <Route exact path='/OrdenPreguntasFrecuentes' component={ OrdenPreguntasFrecuentes } />

                <Redirect to="/Home" /> {/* Ruta default */}
            </Switch>
        </Router>
            
    )
}
