import {useEffect, useRef} from "react";
import "./AthleteModal.css";

export default function AthleteModal({athlete, onClose, onPrev, onNext}){
    const closeBtnRef = useRef(null);

    useEffect(()=>{
        closeBtnRef.current?.focus();

        function handleKeyDown(e){
            if(e.key==="Escape") onClose();
            if(e.key==="ArrowLeft") onPrev();
            if(e.key==="ArrowRight") onNext();
        }

        document.addEventListener("keydown", handleKeyDown);
        document.body.classList.add("modal-open");
        return()=>{
            document.removeEventListener("keydown", handleKeyDown);
            document.body.classList.remove("modal-open");
        };
    }, [onClose, onPrev, onNext]);

    return(
        <div className="athlete-modal open" aria-hidden="false">
            <div className="athlete-overlay" onClick={onClose}/>
            <div className="athlete-dialog" role="dialog" aria-modal="true" aria-label="Athlete profile">
                <button ref={closeBtnRef} className="athlete-close" type="button" onClick={onClose} aria-label="Close Modal">
                    x
                </button>

                <div className="roster-profile modal-profile">
                    <div className="profile-photo">
                        <img src={athlete.img} alt={`${athlete.name} headshot`}/>
                        <div className="athlete-modal-nav">
                            <button className="modal-nav-btn" type="button" onClick = {onPrev} aria-label="Previous Athlete">
                                ‹
                            </button>
                            <button className="modal-nav-btn" type="button" onClick = {onNext} aria-label="Next Athlete">
                                ›
                            </button>
                        </div>
                    </div>

                    <div className="profile-info">
                        <h2>{athlete.name}</h2>
                        <p className="profile-meta">{athlete.meta}</p>
                        <p className="profile-bio">{athlete.bio}</p>

                        <div className="profile-details">
                            <div className="detail-box">
                                <h3>Personal Bests</h3>
                                <ul>
                                    {athlete.prs?.length ? athlete.prs.map((x) => <li key={x}>{x}</li>) : <li>—</li>}
                                </ul>
                            </div>

                            <div className="detail-box">
                                <h3>Quick Facts</h3>
                                <ul>
                                    {athlete.facts?.length ? athlete.facts.map((x) => <li key={x}>{x}</li>) : <li>—</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}