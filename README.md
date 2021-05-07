# Aplicacion WEB CMS  de GSMA.

## Objetivo:
_Gestionar el contenido de noticias, preguntas frecuentes y otros temas del Portal INDOTEL._

## Descripción 📋:
  Este programa permite gesionar el contenido de diversos modulos de portal Indotel, actualmente solo las Preguntas frecuentes, y con propósito a expandir a otros contenidos

## Requerimientos ⚙️:

  * Base de datos (SQL Server Express) de nombre: 'GSMA'.
  * Login de user 'av', password: 'admin123'
  * Tabla de nombre: FAQ.
  * Script de tabla:
    Create table FAQ ( Id INT PRIMARY KEY not null IDENTITY, Pregunta varchar(300) not null, Respuesta varchar(MAX) not null, Status bit not null, Orden int not null)
  * API GSMA para el acceso a la base de datos.
## Herramientas de desarrollo ⚙️:

  * Node
  * Sql Server

## Función ⌨️: 
  Crear, Actualizar, Leer y Eliminar preguntas frecuentes de la base de datos, para el portal INDOTEL.