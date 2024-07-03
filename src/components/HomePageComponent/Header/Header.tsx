import react from "react"
import "../Header/Header.css"
import HomePageNavbar from "../Navbar/HomePageNavbar";
import headerImage from "../../images/target.png"
import { Link } from "react-router-dom";

function Header() {
    return (
        <div>

            <HomePageNavbar />

            <header className="header-component">

                <div>
                    <p className="font-bold text-2xl">Manage Your Dashboard</p>
                    <p className="mt-10 leading-8"> Welcome Back! Let's Manage Your Employees
                        <br></br>Your Team, Your Dashboard  All in One Place.</p>
                    <br></br>
                    <Link className=" font-semibold home-page-navbar-login-button-link mb-20" to="/signUpAdmin">Sign Up As Admin</Link>
                </div>

                <div>
                    <img className="header-image" src={headerImage} />
                </div>

            </header>
        </div>
    )
}

export default Header;