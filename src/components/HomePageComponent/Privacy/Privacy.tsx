import "../Privacy/Privacy.css"
import privacyIcon from "../../images/privacy.png"

function Privacy() {
    return (
        <section className="privacy-component">
            <p className="font-bold text-blue text-xl text-center">Your Privacy is our Privacy</p>
            <img className="privacy-component-image" src={privacyIcon} />
            <p className="text-blue font-semibold text-sl mt-10 text-center">We prioritize your privacy by implementing secure authentication methods. <br></br>Your personal data is protected with state-of-the-art encryption and privacy protocols. Proper Authentication is done whenever a user tries to login</p>
        </section>
    )
}

export default Privacy;