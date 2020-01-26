import React, { Component } from "react";
import Buscador from './components/Buscador';
import Resultado from "./components/Resultado";

class App extends Component {
    
    /*
        Vídeo en Youtube: 
        Tema: React 16 - Crea tu Primera Aplicación Web en 1 hora
        Fuente: https://www.youtube.com/watch?v=hScR513gvNo&t=1020s
        Canal: https://www.youtube.com/channel/UCbQCKBuL_gYvl8Z8zvObJog
    */

    state = {
        termino: '',
        imagenes: [],
        pagina: ''
    }

    scroll = () => {
        const elemento = document.querySelector('.jumbotron');
        elemento.scrollIntoView('smooth', 'start');
    }

    paginaAnterior = () => {
        // leer el state de la página actual
        let pagina = this.state.pagina;

        // Si la página es 1, ya no ir hacia atrás
        if (pagina === 1) {
            return null;
        }

        // restar 1 a la página actual
        pagina--;

        // agregar el cambio al state
        this.setState({
            pagina
        }, () => {
            this.consultarApi();
            this.scroll();
        });

        // console.log( pagina );
    }

    paginaSiguiente = () => {
        // leer el state de la página actual
        let pagina = this.state.pagina;

        // sumar 1 a la página actual
        pagina++;

        // agregar el cambio al state
        this.setState({
            pagina
        }, () => {
            this.consultarApi();
            this.scroll();
        });

        // console.log( pagina );
    }

    consultarApi = () => {
        // const url = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=yellow+flowers&image_type=photo&pretty=true`;
        const termino = this.state.termino;
        const pagina = this.state.pagina;
        const url = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${ termino }&per_page=10&page=${ pagina }`;

        // console.log(url);
        fetch(url)
            .then( respuesta => respuesta.json() )
            .then( resultado => this.setState({ imagenes: resultado.hits }) )
    }

    datosBusqueda = (termino) => {
        this.setState({ 
            termino: termino,
            pagina: 1
        }, () => {
            this.consultarApi();
        });
    }

    render() {
        return (
            <div className="app container">
                <div className="jumbotron">
                    <p className="lead text-center">Buscador de imágenes</p>
                    <Buscador datosBusqueda={ this.datosBusqueda } />
                </div>
                <div className="row justify-content-center">
                    <Resultado 
                        imagenes={ this.state.imagenes }
                        paginaAnterior={ this.paginaAnterior }
                        paginaSiguiente={ this.paginaSiguiente } />
                </div>
            </div>
        );
    }
}

export default App;