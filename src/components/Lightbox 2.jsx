import {useEffect, useMemo, useState} from "react";
import "./Lightbox.css";

export default function Lightbox({images = []}){
    const safeImages = useMemo(() => 
        images.filter(Boolean).map(img => 
            typeof img === 'string' ? { src: img, alt: '' } : img
        ), 
        [images]
    );

    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const current = safeImages[index];

    function openAt(i){
        if(!safeImages.length) return;

        setIndex((i + safeImages.length) % safeImages.length);
        setIsOpen(true);
    }

    function close(){
        setIsOpen(false);
    }

    function prev(){
        if(!safeImages.length) return;
        setIndex((prevIndex) => (prevIndex - 1 + safeImages.length) % safeImages.length);
    }
    function next(){
        if(!safeImages.length) return;
        setIndex((prevIndex) => (prevIndex + 1) % safeImages.length);
    }

    useEffect(()=> {
        if(!isOpen) return;

        document.body.classList.add("modal-open");

        function onKeyDown(e){
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        }
        document.addEventListener("keydown", onKeyDown);
        return () =>{
            document.body.classList.remove("modal-open");
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, safeImages.length]);

    return(
        <>
        {/* Gallery grid (click to open) */}
        <div className="race-gallery">
            {safeImages.map((img, i) => (
            <img
                key={img.src ?? i}
                src={img.src}
                alt={img.alt || "Race photo"}
                className="race-gallery-img"
                onClick={() => openAt(i)}
                style={{ cursor: "zoom-in" }}
                loading="lazy"
            />
            ))}
        </div>

        {/* Lightbox overlay */}
        {isOpen && current && (
            <div className="lightbox open" aria-hidden="false">
            {/* overlay click closes */}
            <div className="lightbox-overlay" onClick={close} />

            <div className="lightbox-dialog" role="dialog" aria-modal="true" aria-label="Race photo">
                <button className="lightbox-close" type="button" aria-label="Close" onClick={close}>
                ✕
                </button>

                <button
                className="lightbox-nav lightbox-prev"
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                    e.stopPropagation();
                    prev();
                }}
                >
                ‹
                </button>

                <img className="lightbox-img" src={current.src} alt={current.alt || "Race photo"} />

                <button
                className="lightbox-nav lightbox-next"
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                    e.stopPropagation();
                    next();
                }}
                >
                ›
                </button>

                <div className="lightbox-caption">{current.alt || ""}</div>
            </div>
            </div>
        )}
        </>
    );
}