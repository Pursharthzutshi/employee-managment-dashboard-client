import react from "react"
import "../Service/Service.css"
import image from "../../../components/images/dashboard.png"

function Service() {
    return (
        <section className="service-component">
            <p className="underline underline-offset-1 font-semibold mt-10 mb-10 text-center text-xl">Services</p>
            <div className="service-box-container">
                <div className="service-box">
                    <img src={image} />
                    <p className="font-bold mt-5">Best Task Managment</p>
                    <p className="">Easily add, edit, and manage employee Tasks. Keep all essential information organized and accessible in one place . </p>
                </div>
                <div className="service-box">
                    <img src={image} />
                    <p className="font-bold mt-5">Live Organization Data</p>
                    <p className="">Dynamic Data which shows about the current information about organization. Updated whenever there is any new change</p>
                </div>
                <div className="service-box">
                    <img src={image} />
                    <p className="font-bold mt-5">Manage Employee Access</p>
                    <p className="">Add new Employee account as admin whenever a new employee joins . Also Delete the account whenever the employee leaves the organization. </p>
                </div>
                {/* <div className="service-box">
                    <img src={image} />
                    <p className="font-bold mt-5">Settings Managment</p>
                    <p className="">Admin can ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor ut arcu euismod mollis. Nam vitae sapien est. Donec ullamcorper lacus ut mi ullamcorper, eget faucibus mauris mattis. </p>
                </div> */}
            </div>

        </section>
    )
}

export default Service;