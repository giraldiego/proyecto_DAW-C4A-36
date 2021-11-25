# Proyecto Módulo Programación Web

La inmobiliaria “Hogar Colombia” es una empresa que quiere incursionar en el mercado colombiano de la venta y alquiler de inmuebles. Sin embargo, se ha identiﬁcado tras un estudio de mercado que los colombianos consultan a través de internet los inmuebles una y otra vez antes de tomar una decisión tan importante como es el alquiler o la compra de un inmueble. Queriendo sistematizar el proceso de administración de los inmuebles, el gerente de Hogar Colombia ha contactado a la Universidad de Caldas para desarrollar el sistema que permita realizar toda esta gestión. Por tal motivo, la Universidad mediante el apoyo de los estudiantes del módulo de Programación Web de Misión TIC 2022 busca satisfacer esta necesidad de Hogar Colombia.

Para ello, se han realizado reuniones para formalizar los requisitos, obteniendo la siguiente información:

## 1. Sitio web y Módulo de Seguridad:
El sistema deberá contar con un módulo de seguridad que permita la debida gestión de usuarios, roles y permisos de las personas involucradas.

## 2. Módulo del Cliente:
Los clientes serán personas naturales que enviarán sus solicitudes para que sean estudiadas y considerados para alquilar o comprar un inmueble. Estos usuarios deben interactuar con el sistema de información para administrar sus solicitudes y veriﬁcar el estado de cada una de ellas.

## 3. Módulo del Administrador:
El sistema debe permitir al administrador de la inmobiliaria tener comunicación con un grupo de asesores para gestionar los inmuebles y las solicitudes de alquiler y/o compra.

## 4. Módulo del Asesor:
El asesor deberá tener funcionalidades para crear inmuebles, contactar al cliente, aceptar y rechazar solicitudes.

# Instructions

## Pre-requisites

Node.js >= 8.9.0 and a MongoDB Cloud Cluster required.

You need to set these variables in a `backend/rest-api/.env` file

```
CONNECTION_STRING=mongodb+srv://<username>:<password>:@<cluster_address>.mongodb.net/places?retryWrites=true&w=majority
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_VERIFIED_SENDER=your_email_verified_at_sendgrid
ADMIN_EMAIL=your_email
```
## Installation

Do the following to clone the project and start the API server.

```sh
$ git clone https://github.com/giraldiego/proyecto_DAW-C4A-36.git
$ cd proyecto_DAW-C4A-36
$ cd backend
$ cd rest-api
$ npm i
$ npm start
```

## Usage

The main app will be running at http://localhost:3000.
