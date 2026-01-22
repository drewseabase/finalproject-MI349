import "./Nav.css";

export default function Nav(){
    return(
        <div className="sticky-nav">
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/roster">Roster</a></li>
                    <li><a href="/schedule">Schedule</a></li>
                    <li><a href="/news">News</a></li>
                    <li><a href="/history">History</a></li>
                </ul>
            </nav>
        </div>
    )
}