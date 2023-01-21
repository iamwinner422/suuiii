import React from "react";
import Populars from "../components/Populars.jsx";
import Search from "../components/Search.jsx";


export default function Home(){
    return(
        <div>
            <Search/>
            <Populars/>
        </div>
    );
}
