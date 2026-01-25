import "./Footer.css";

export default function Footer(){
    return(
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <h3>Michigan State Cross Country</h3>
                    <p className="footer-season">2025-2026 season</p>
                    <p className="footer-copy">© 2025 Spartans XC (Unofficial Site)</p>
                </div>
                <div className="footer-location">
                    <p>Based in East Lansing, Michigan</p>
                    <p>Training all around campus, competing all across the Big Ten</p>
                </div>
                <div className="footer-disclaimer">
                    <p>This site is student-built for educational purposes and is not officially affiliated
                        with Michigan State University Athletics
                    </p>
                    <p>Image Disclaimer: All photos on this website are property of their respective owners.
                        No copyright infringement is intended, and no ownership is claimed
                    </p>
                </div>
                <div className="footer-tagline">
                    <p>Spartans run as one</p>
                </div>
            </div>
        </footer>
    )
}