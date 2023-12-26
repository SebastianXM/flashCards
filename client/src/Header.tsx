import './Header.css'

export function Header(){
    return(
        <div className="Header">
            <div className="container">
                <div>
                    <a href="/">Home</a>
            </div>

            <div>
                <a href="/">Flash Cards</a>
            </div>

                <div>
                    <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
}