import { useEffect, useState } from "react";

export default function useMediaQuery(query){
    const [matches, setMatches] = useState(()=> 
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
    );

    useEffect(() =>{
        const mq = window.matchMedia(query);
        const handler = (e) => setMatches(e.matches);

        //Safari compabitibilty
        if (mq.addEventListener) mq.addEventListener("change", handler);
        else mq.addEventListener(handler);

        return () => {
            if (mq.removeEventListener) mq.removeEventListener("change", handler);
            else mq.removeEventListener(handler);
        };
    },[query]);

    return matches;
}