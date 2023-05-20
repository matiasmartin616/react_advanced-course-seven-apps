import { useState, useEffect } from "react";
import "./App.css"
const CAT_ENDPOINT_RANDOM_FACT = `https://catfact.ninja/fact`

export function App() {
    const [fact, setFact] = useState("lorem ipsum cat fact whatever");
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => {
                if(!res.ok) throw new Error('Error fetching fact')
                //TODO: Manejar error
                res.json()
            })
            .then(data => {
                const { fact } = data
                setFact(fact)
            })
            .catch((err) => {

            })
    }, [])

    useEffect(() => {
        if(!fact) return

        const threeFirstWords = fact.split(' ', 3)
        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
                const {url} = response;
                setImageUrl(url)
                console.log(url)
            })
    }, [fact])


    return (
        <main>
            <h1>App de gatitos</h1>
            {fact && <p> {fact}</p>}
            <button onClick={""}> Get new fact</button>
            {imageUrl && <img
            alt="Image extracted with the last three words"
            src = {`https://cataas.com/${imageUrl}`}
            >
                
            </img>}
        </main>
    );
}
