import {useEffect, useRef} from "react";
import "./Home.css";

export default function Home(){
    const rosterElRef = useRef(null);

    useEffect(()=>{
        const rosterImages = [
        "/Images/rileyhough.PNG",
        "/Images/thomaswestphal.PNG",
        "/Images/jackpennewell.PNG",
        "/Images/mosesosterink.PNG",
        "/Images/mikehegarty.PNG",
        "/Images/parkerlambers.PNG",
        "/Images/jaspercane.PNG",
        "/Images/paddybyrnes.PNG",
        "/Images/evanloughridge.PNG",
        "/Images/bradymcardle.PNG",
        "/Images/drewseabase.PNG",
        "/Images/nathanlarson.PNG",
        ];

        const rosterEl = rosterElRef.current;
        if(!rosterEl || rosterImages.length === 0) return;

        let currentIndex = 0;
        rosterEl.src = rosterImages[0];

        function showNextRosterImage(){
            rosterEl.classList.add("is-fading");

            setTimeout(()=>{
                currentIndex = (currentIndex + 1) % rosterImages.length;
                rosterEl.src = rosterImages[currentIndex];
            }, 600);

            setTimeout(()=>{
                rosterEl.classList.remove("is-fading");
            }, 600 + 1000);
        }

        const intervalId = setInterval(showNextRosterImage, 7000);
        return()=> clearInterval(intervalId);
    }, []);

    return(
        <>
        <header className="background-img"></header>

        <main>
            <div className="container">
                <div className="hero-left">
                    <p>
                        A Spartan team defined by grit, unity, and a relentless drive to improve - every day and every mile
                    </p>
                </div>

                <div className="hero-text">
                    <h1>Michigan State Cross Country</h1>
                </div>

                <div className="right">
                    <img src="/Images/campus.png" alt="Campus" />
                </div>
                </div>

                {/* Roster Card */}
                <div className="view">
                <section id="roster" className="band band--roster">
                    <h2 className="visually-hidden"> Meet the Team</h2>
                    <article className="panel">
                        <div className="panel_media"></div>
                        <div className="panel_body">
                                <img
                                ref={rosterElRef}
                                className="roster-slideshow"
                                src="/Images/rileyhough.PNG"
                                alt="roster pics"
                                />
                            <div className="panel_copy">
                                <span className="eyebrow">Roster</span>
                                <h2>Meet the Team</h2>
                                <p>
                                    Meet the athletes who give Michigan State Cross Country its identity. From veterans who set the standard
                                    to newcomers hungry to prove themselves the roster reflects hard work, resiliency, and a commitment to
                                    excellence. Explore the Spartans who power every workout and race with a tough mindset to keep
                                    pushing through
                                </p>
                                <div className="btn">
                                    <a href="/roster"> Meet the Team</a>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>

                {/* Course Card */}
                <section id="courses" className="band band--roster">
                    <h2 className="visually-hidden"> Schedule</h2>
                    <article className="panel">
                        <div className="panel_media"></div>
                        <div className="card_img">
                            <img src="/Images/spartaninviteraceday.JPG" alt="race day" />
                            <div className="panel_copy">
                                <span className="eyebrow">Meets</span>
                                <h2>Race Day</h2>
                                <p>
                                    Michigan State's race schedule showcases the toughest courses and the strongest competition across the country.
                                    Each meet tests the team's preparation, grit, and unity as the season builds toward championship racing. Track
                                    the meets that shape our progress and define who we are as a unit
                                </p>
                                <div className="btn">
                                    <a href="/schedule"> Schedule</a>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>

                {/* History and News */}
                <section className="second-container band band--roster">
                    <h2 className="visually-hidden"> History</h2>

                    <div id="news">
                        <article className="panel">
                            <div className="panel_media"></div>
                            <div className="card_img">
                                <img src="/Images/teammeeting.JPG" alt="team meeting" />
                                <div className="panel_copy">
                                    <span className="eyebrow">News</span>
                                    <h2>Follow the Team</h2>
                                    <p>
                                        Catch the latest on the Spartans as they train, race, and build momentum throughout the year.
                                        From breakthrough performances to behind-the-scenes moments, our news keeps you connected to the team's
                                        progress every step of the way
                                    </p>
                                    <div className="btn">
                                        <a href="/news"> Keep Updated</a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>

                    <div id="history">
                        <article className="panel">
                            <div className="panel_media"></div>
                            <div className="card_img">
                                <img src="/Images/msuhistory.jpeg" alt="history" />
                                <div className="panel_copy">
                                    <span className="eyebrow">History</span>
                                    <h2>Team History</h2>
                                    <p>
                                        Michigan State Cross Country carries a legacy shaped by generations of athletes who built this program
                                        through a deep pride in the green and white. This program has been built on decades of iconic races
                                        and athletes who helped define what it means to be a Spartan. Explore what shaped the program
                                        into one of the Big Ten's most respected traditions
                                    </p>
                                    <div className="btn">
                                        <a href="/history"> View History</a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </main>
        </>
    )
}