import React from "react";
import Header from "./Header/Header";
import "../HomePageComponent/HomePage.css"
import HomePageNavbar from "./Navbar/HomePageNavbar";
import Service from "./Service/Service";
import About from "./About/About";
import Footer from "./Footer/Footer";
import Privacy from "./Privacy/Privacy";

function HomePage() {
    return (
        <div className="home-page-component">
            <Header />
            <Service />
            <About />
            <Privacy />
            <Footer />
        </div>
    )
}

export default HomePage;