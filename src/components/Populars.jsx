import {useState, useEffect} from "react";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css'
import Titles from "./Titles.jsx";
import HomeSongCard from "./HomeSongCard";



function Populars(){
    /* Un Hook qui nous permet d'utiliser l'état dans un composant fonctionnel. */
    const [populars, setPopulars] = useState([]);

    /* C'est un Hook qui nous permet d'utiliser l'état dans un composant fonctionnel. */
    useEffect(()=>{
        getPopulars();
    }, []);

    /**
     * Il vérifie s'il existe un élément de stockage local appelé "populaires". Si c'est le cas, il analyse les données et
     * définit l'état. S'il n'y en a pas, il récupère les données de l'API et définit l'état
     */
    const getPopulars = ()=>{
        /* Il vérifie s'il existe un élément de stockage local appelé "populars". */
        const check = localStorage.getItem('populars');

        if (check){
            /* Analyse des données du stockage local. */
            setPopulars(JSON.parse(check));
        }else{
            /* C'est une requête de récupération à l'API. */
            fetch('https://shazam.p.rapidapi.com/charts/track?locale=fr-FR&pageSize=20&startFrom=0',{
                "method":"GET",
                "headers":{
                    "x-rapidapi-host": "shazam.p.rapidapi.com",
                    "x-rapidapi-key": "b0f53e5e44msh1dc9f45c360d832p186bbajsna15057238cb5",
                }
            }).then(response => response.json())
                .then(populars =>{
                    setPopulars(populars.tracks);
                    localStorage.setItem('populars', JSON.stringify(populars.tracks));
                })
                .catch(error => console.log(error));
        }

    }

    return(
        <div>
            <div className="container-fluid">
                <div className="row position-relative">
                    <Titles title="Populaire en ce moment"/>
                </div>
                <Splide options={{
                    perPage:4,
                    arrows:true,
                    pagination:true,
                    drag:'free',
                    perMove:1,
                    type: 'loop',
                    padding: '5rem',
                    gap:'1.5rem'

                }}>
                    {populars.map(song=>{
                        return(
                            <SplideSlide key={song.key}>
                                <HomeSongCard title={song.title} image={song.images.coverarthq} artists={song.subtitle}/>
                            </SplideSlide>
                        )
                    })}
                </Splide>

            </div>
        </div>

    );
}

export default Populars;
