//importancia de la persistencia de los datos del lado del cliente
//variables
console.log('esta jalando js');
const listaTweets = document.getElementById('lista-tweets');



// Event Listeners
eventListeners();

function eventListeners() {
    //evento al enviar el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    //Contenido cargado; una vez cargado los lea del local storage para imprimirlos
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


//Funciones

//Para añadir tweet del formulario
function agregarTweet(e){
    e.preventDefault();
    //console.log('Formulario enviado');
    //Leer el valor del text area:
    const tweet = document.getElementById('tweet').value;

    // crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // añade el botón de borrar al tweet
    li.appendChild(botonBorrar);
    // añade el tweet a la lista
    listaTweets.appendChild(li);

     //Añadir a localstorage
    //solo se manda el contenido del tweet
    agregarTweetLocalStorage(tweet);

}

//Generamos la estructura de un li->Tweet
function TraeEstructuraDeTweets(tweet) {
    //cracion del boton borrar tweet
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    
    //console.log(tweet)
    //Imprimir el valor del twwet creando un li en el DOM
    const li = document.createElement('li');
    li.innerText = tweet;
    li.appendChild(botonBorrar);
    //ahora lo montamos al dom para que se vea
    listaTweets.appendChild(li);
}


//Eliminar tweet del DOM
function borrarTweet(e){
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        console.log(e.target.parentElement);
        listaTweets.removeChild(e.target.parentElement);
        alert('Tweet eliminado');
    }

    console.log('Diste clic en la lista');

    //Llamamos a la funcion que borrara el tweet de LocalStorage
    const textoDelTweet = e.target.parentElement.innerText;
    borrarTweetLocalStorage(textoDelTweet);

}

//Mostar Datos del localstorage en la lista de tweets
function localStorageListo(tweet) {
    let tweets;

    tweets = obtenerTweetsLocalSorage();

    //mostramos de forma ordenada cada elemento del array almacenado 
    //en local storage -> de la etructura de la funcion TraeEstructuraDeTweets
    tweets.forEach(TraeEstructuraDeTweets);
}

//Agregar tweet a local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalSorage();
    //Añadir el nuevo(s) tweet
    tweets.push(tweet)
    //convertir de string a arreglo para localstorage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Obtenemos los tweets del local storage si los hay, comprobar que haya elementos
function obtenerTweetsLocalSorage() {
    let tweets;
    //Se revisan los valores del localStorage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;

}

//Eliminar tweet del LocalStorage
function borrarTweetLocalStorage(tweet) {
    console.log(tweet)
    let tweets, tweetBorrar;
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    console.log(tweetBorrar)

    tweets = obtenerTweetsLocalSorage();
    tweets.forEach(function(tweet, index) {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1)
        }
    });
    console.log(tweets)
    localStorage.setItem('tweets', JSON.stringify(tweets))

}


//comprendiendo local storage
// const nombreStorage = localStorage.setItem('nombre', 'victor');
// console.log(nombreStorage + 'nada')
// console.log(localStorage.getItem('nombre'))
// console.log(localStorage.getItem('nombre') + 'eliminado' + localStorage.removeItem('nombre'))

