import Gradient from "./Gradient.jsx";

export default function HomeSongCard(props){
    return(
        <div className="home-song-card">
            <img className="home-song-img" loading="lazy" src={props.image} alt={props.title} title={props.title +" de "+props.artists}/>
            <div className="home-song-title-container">
                <h3 className="home-song-title">{props.title}</h3>
            </div>
            <Gradient/>
        </div>
    );
}
