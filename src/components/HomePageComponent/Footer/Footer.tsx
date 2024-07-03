import { FaFacebook, FaFacebookSquare, FaGithub, FaGithubSquare, FaInstagram, FaTwitter, FaTwitterSquare } from "react-icons/fa";
import "../Footer/Footer.css"

function Footer() {
    return (

        <footer className="footer-component">

            <div>
                <p className="font-semibold text-blue">@ 2024 Loreum Ipsum, All rights reserved</p>
            </div>

            <div className="footer-icons-conatiner">
                <FaGithubSquare className="footer-icons" />
                <FaFacebookSquare className="footer-icons" />
                <FaTwitterSquare className="footer-icons" />
                <FaInstagram className="footer-icons" />
            </div>

        </footer>
    )
}

export default Footer;