//import React, { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";

//'use strict';
//var request = require('request');


const URL = {
    domain: "https://www.alphavantage.co/",
    top20: "query?function=TOP_GAINERS_LOSERS&apikey=demo",
    crypt: "DIGITAL_CURRENCY_DAILY",
}
//options for each here as objects of 
const comm={
    
}


const createURL = (func, interval, tickerSymbol) => {
    if (!func){
        console.error("Missing category");//break
    }

    let newURL = `${URL.domain}query?function=${func}`;
    
    if(!tickerSymbol){
        console.info("Warning: no symbol defined");
    }else{
        newURL += `&symbol=${tickerSymbol}`;
    }


    if(!interval){
        console.info("Warning: no interval defined");
    }else{
        newURL += `&interval=${interval}`;
    }

    const apiKey = process.env.APIKey || "demo";

    return newURL+`&apikey=${apiKey}`;

}



//fetch from URL
const getAPI = async (url) =>{
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
    } catch (error) {
        
    }

}

// example: getAPI(createURL("TOP_GAINERS_LOSERS","daily","tsla"))







const Ticker = () =>{

    //
    const createList = (array)=>{
        //create `ul` with flex-flow: row wrap
        
        for(obj of array){
            //append inside `ul`
            // create `li` with `flex-flow: column wrap`
        }


        return (
            <></>
        );
    };

    //Outputting marquee of all datapoints...
    return (
        <marquee class=""behavior="scroll" scrollamount="5">
            {createLi()}
        </marquee>
    );
}