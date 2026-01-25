import { useEffect, useState } from "react";

export default function useInView(ref, options = {threshold: 0.55}){

    const [isVisible, setIsVisible] = useState(false);

    useEffect(()=>{
        const el = ref.current;
        if(!el) return;

        if(!("IntersectionObserver" in window)){
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, options);

        observer.observe(el);

        return () => observer.disconnect();
    }, [ref, options]);

    return isVisible;
}