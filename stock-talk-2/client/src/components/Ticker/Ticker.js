/* //! todo list
    TODO: Should be able to grab all
    TODO: On mouse hover, set speed to 0
    TODO: On mouse hover exit, set speed to 5

    TODO: In Settings, make alternative static presentation to address accessibility issues
    TODO: Move animation outside HTML to preserve its goal as structure ONLY
        marquee has been deprecated
*/

//import React, { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";

//'use strict';
//var request = require('request');



const base = "https://www.alphavantage.co/";
const apiKey = "I830XH87UC8W5UBM" //process.env.APIKey || "demo"; 
//!! Having issues settin gup env;
// TODO: get react to work with .env
//!! CANNOT USE "demo"; will fail on other calls 
console.log(`We are using this API key: ${apiKey}`);

const fun = {
    top: "TOP_GAINERS_LOSERS",              // default for dashboard
    crypto: "DIGITAL_CURRENCY_DAILY",
    forex: "FX_DAILY",
    commodity: "COMMODITY"      // Precious metals were moved here per API
};


// ! Do not pass commodity to API query for `function`
// validate using commodities then pass that
const commodities = [
    "WTI",  // CRUDE OIL - West Texas Intermediate ( daily available)
    "BRENT",// CRUDE OIL - Europe ( daily available)
    "NATURAL_GAS",
    "COPPER",
    "ALUMINUM",
    "WHEAT",
    "CORN",
    "COTTON",
    "SUGAR",
    "COFFEE",
    "ALL_COMMODITIES"
]

const styles = {
    ul: "flex-flow: row wrap",
    li: "flex-flow: column wrap"

// TODO: Make this baccground opaque? black
// TODO: Make font color red/green if down/up based on api call
}

//options for each here as objects of 

const setURL = (params) => {
    const { func } = params;
        
    if ( !func ){
        console.log(func)
        console.error("Missing func paramater");
        return -1;
    }

    let newURL = `${base}query?function=${func}`;

    switch (func){
        case fun.crypto:
            const { symbol, market } = params;
            if( !symbol || !market ){
                console.error("Missing symbol or market paramater");
                return -1;
            };
            newURL += `&symbol=${symbol}&market=${market}`;
            break;

        case fun.forex:
            const { fromSymbol, toSymbol } = params;
            if( !fromSymbol || !toSymbol ){
                console.error("Missing a forex symbol paramater");
                return -1;
            };
            newURL += `&from_symbol=${fromSymbol}&to_symbol=${toSymbol}`;
            break;

        case fun.commodity:    //defaulting interval to `monthly` (shortest); CRUDE OIL can be `daily`
            const { commodity } = params;
            if( !commodity ){
                console.error("Missing commodity paramater");
                return -1;
            };

            // TODO: Check if valid 
            // console.log(commodities)
            // console.log( commodities.find( (c) => c === commodity) );
            // if( commodities.find( (c) => c === commodity) ){
            //     return -1;
            // };
            
            newURL.replace( fun.commodity ,`${commodity}&interval=monthly`);
            break;

        case fun.top:
            //no modifications needed
            console.log(func);
            break;

        default:
            // //!error handling
            // console.error("Invalid function paramater");
            // return -1;
    }

    if( !apiKey ){
        console.error("Missing a API key");
        return -1;
    }
    newURL += `&apikey=${apiKey}`;

    return newURL;
}

//fetch from URL
const getAPI = async (url) =>{
    try {
        console.log(`Fetching... ${url}`)
        
        const response = await fetch(url);
        console.log(response)
        
        const data = await response.json();
        console.log(data)

        return data;
    } catch (error) {
        console.log(error);
    }
}



//#region Testing utilities
    // example: of API call 
    // getAPI(
    //     setURL({
    //         func: "FX_DAILY",
    //         fromSymbol: "EUR",
    //         toSymbol: "USD",
    //     })
    // );

// Pass the following objeccts to setURL()
const testForex = {
    func: "FX_DAILY",
    fromSymbol: "EUR",
    toSymbol: "USD",
}
const testCrypto = {
    func: "DIGITAL_CURRENCY_DAILY",
    symbol: "BTC",
    market: "USD",
}
const testTop20 = {
    func: "TOP_GAINERS_LOSERS",
}
const testCommodity = {
    func: "COMMODITY",
    commodity: "COPPER"
}
//#endregion

const Ticker = () =>{

    //
    const createList = (array)=>{
        //create `ul` with flex-flow: row wrap
        
        for(const obj of array){
            //append inside `ul`
            // create `li` with `flex-flow: column wrap`
        }
    }
    // const response = getAPI(setURL(testTop20));
    // const output = response || "Loading";

    // <ul style={styles.ul} >
    // <li style={styles.li}>Recieved params here</li>
    // </ul>
    
    //{ getAPI(setURL(testTop20)) }

    
    //     <ul style={styles.ul}>   
    //     test
    // </ul>
    // Outputting marquee of all datapoints...
    return (
        <marquee class="scroll" behavior="scroll" scrollamount="5">
            {setURL(testTop20)}
        </marquee>
    );
};


export default Ticker;
