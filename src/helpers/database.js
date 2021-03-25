import Axios from 'axios'; //Libreria para el manejo de Requests HTTP

export const GETfaq = () => {

    return Axios.get('http://localhost:5000/FAQ')
    .then(function (response) {
        // handle success
        return response.data
    });
}

export const nuevaFAQ = (data) => {

    return Axios.post(`http://localhost:5000/FAQ/add`,{
        ...data
    }).then(response=>{
        return response.status
    })
}

export const editarFAQ = (data) => {

    return Axios.post(`http://localhost:5000/FAQ/edit`,{
        ...data
    }).then(response=>{
        return response.status
    })
}

export const eliminarFAQ = (Id) => {

    return Axios.post(`http://localhost:5000/FAQ/delete`,{ Id })
        .then(response=>{
            return response.status
        })
}