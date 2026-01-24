import {useState} from "react";

export default function useNewsSlider(itemCount){
    const [currentIndex, setCurrentIndex] = useState(0);

    function prev(){
        setCurrentIndex((i) => (i - 1 + itemCount) % itemCount.length);
    }

    function next(){
        setCurrentIndex((i) => (i + 1) % itemCount.length);
    }

    function setActive(index){
        setCurrentIndex(index);
    }

    return{
        currentIndex,
        prev,
        next,
        setActive,
    };
}