import Axios from 'axios'; //Libreria para el manejo de Requests HTTP

export const GETfaq = () => {

    return Axios.get('http://localhost:5000/FAQ')
    .then(function (response) {
        // handle success
        return response.data
    });
}