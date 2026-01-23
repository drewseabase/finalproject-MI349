import { useMemo, useState } from "react";
import {roster} from "../data/roster";
import AthleteModal from "../components/AthleteModal";
import Lightbox from "../components/Lightbox";
import "./Roster.css";


export default function Roster(){
    const athletes = useMemo(() => roster, []);
    const [activeIndex, setActiveIndex] = useState(0);
    const [modalIndex, setModalIndex] = useState(null);

    const gallery = [
        "/RaceGallery/IMG_7049.JPG",
        "/RaceGallery/IMG_7050.JPG",
        "/RaceGallery/IMG_7051.JPG",
        "/RaceGallery/IMG_7052.JPG",
        "/RaceGallery/IMG_7053.JPG",
        "/RaceGallery/IMG_7054.JPG",
        "/RaceGallery/IMG_7055.JPG",
        "/RaceGallery/IMG_7056.JPG",
        "/RaceGallery/IMG_7057.JPG",
        "/RaceGallery/IMG_7058.JPG",
        "/RaceGallery/IMG_7059.JPG",
        "/RaceGallery/IMG_7060.JPG",
        "/RaceGallery/IMG_7061.JPG",
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

    return (

        <>
        <header className="background-img"></header>
        <main className="roster-page">
            <section className="roster-hero">
                <h1>Meet the Spartans</h1>
                <p className="roster-intro">Get to know the athletes who make up Michigan State Cross Country 
                    - Their stories, backgrounds, and the miles they have put in to wear the green and white.
                </p>
            </section>

            <section className="roster-grid-section">
                <div className="roster-header-row">
                    <h2 className="section-title">Full Roster</h2>
                    <p>Click a card to view their profile!</p>
                </div>

                <div className="roster-grid">
                    {athletes.map((a, index) =>(
                        <article
                            key ={a.id}
                            className={`roster-card ${index === activeIndex ? "active" : ""}`}
                            onClick ={() => openModal(index)}
                            onKeyDown = {(e) =>
                                {
                                    if (e.key === "Enter" || e.key === " "){
                                        e.preventDefault();
                                        openModal(index);
                                    }
                                }}
                                tabIndex={0}
                                role="button"
                                aria-haspopup="dialog">

                                <img src={a.img} alt={a.name}/>
                                <div className="card-body">
                                    <h3>{a.name}</h3>
                                    <p className="card-meta">{a.meta}</p>
                                   
                                </div>
                        </article>
                    ))}
                </div>

                <div className="roster-controls">
                    <button className="control-btn" onClick={() => setActiveIndex((i) => (i - 1 + athletes.length) % athletes.length)}>‹Prev</button>
                    <button className="control-btn" onClick={() => setActiveIndex((i) => (i + 1) % athletes.length)}>Next›</button>
                </div>
            </section>

            <section className="race-gallery-section">
                <h2 className="section-title">Race Day Gallery</h2>
                <p className="gallery-intro">Moments on the course - from the starting line to the final straight.</p>
                <Lightbox images={gallery}/>
            </section>

            {/*Modal*/}
            {modalIndex !== null && (
                <AthleteModal
                    athlete = {athletes[modalIndex]}
                    onClose={closeModal}
                    onPrev ={prevModal}
                    onNext = {nextModal}/>
            )}

            {/* Lightbox*/}
            {lightboxIndex !== null && (
            <Lightbox
                src={gallery[lightboxIndex]}
                caption ={`Race photo ${lightboxIndex + 1}`}
                onClose={() => setLightboxIndex(null)}
                onPrev = {() => setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length)}
                onNext = {() => setLightboxIndex((i) => (i + 1) % gallery.length)}
            />)}
        </main>
    </>
    );
}