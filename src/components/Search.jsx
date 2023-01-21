import SubTitles from "./SubTitles.jsx";
import {useState} from "react";
import Autosuggest from 'react-autosuggest';



function Search(){

    const [suggestions, setSuggestions] = useState([]);
    const [input, setInput] = useState([]);

    const inputChangeHandler = (e)=>{
        setInput(e.target.value)
        if(input.length > 0){
            getSuggestions(input);
        }else{
            setSuggestions([]);
        }
    }

    const getSuggestions = (term)=>{
        fetch("https://shazam.p.rapidapi.com/auto-complete?term="+term+"&locale=en-EN",{
            "method":"GET",
            "headers":{
                "x-rapidapi-host": "shazam.p.rapidapi.com",
                "x-rapidapi-key": "b0f53e5e44msh1dc9f45c360d832p186bbajsna15057238cb5",
            }
        }).then(response => response.json())
            .then(suggestions =>{
               setSuggestions(suggestions.hints);
               console.log(suggestions.hints)
            })
            .catch(error => console.log(error));
    }



    return(
        <div className="pb-5">
            <center><SubTitles title="Rechercher"/></center>
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <form action="#">
                        <div className="form-group position-relative">
                            <input type="text" value={input} className="form-control home-search-bar" placeholder="Rechercher" onChange={inputChangeHandler}/>
                            <div className="suggests mt-2">
                                <div className="card">
                                    <ul className="list-group list-group-flush">
                                        {suggestions.map((suggestion, index) =>{
                                            return(
                                                <li className="list-group-item " key={index}>{suggestion.term}</li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Search;
