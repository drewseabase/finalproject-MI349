import { useMemo, useRef } from "react";
//import {roster} from "../data/roster";
//import AthleteModal from "../components/AthleteModal";
//import Lightbox from "../components/Lightbox";
import "./Roster.css";

export default function Roster(){
    const athletes = useMemo(() => roster, []);
    const [activeIndex, setActiveIndex] = useState(0);
    const [modalIndex, setModalIndex] = useState(null);

    const gallery = [
        "/public/RaceGallery/IMG_7049.JPG",
        "/public/RaceGallery/IMG_7050.JPG",
        "/public/RaceGallery/IMG_7051.JPG",
        "/public/RaceGallery/IMG_7052.JPG",
        "/public/RaceGallery/IMG_7053.JPG",
        "/public/RaceGallery/IMG_7054.JPG",
        "/public/RaceGallery/IMG_7055.JPG",
        "/public/RaceGallery/IMG_7056.JPG",
        "/public/RaceGallery/IMG_7057.JPG",
        "/public/RaceGallery/IMG_7058.JPG",
        "/public/RaceGallery/IMG_7059.JPG",
        "/public/RaceGallery/IMG_7060.JPG",
        "/public/RaceGallery/IMG_7061.JPG",
    ];

    const [lightboxIndex, setLightboxIndex] = useState(null);

    function openModal(index){
        setActiveIndex(index);
        setModalIndex(index);
    }

    function closeModal(){
        setModalIndex(null);
    }

    function prevModal(){
        setModalIndex((i) =>(i - 1 + athletes.length) % athletes.length);
        setActiveIndex((i) => (i - 1 + athletes.length) % athletes.length);
    }

    function nextModal(){
        setModalIndex((i) => (i + 1) % athletes.length);
        setActiveIndex((i) => (i+1) % athletes.length);
    }
}