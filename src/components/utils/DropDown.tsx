import React, { useEffect } from "react";
import { Link } from "react-router-dom";

type testProps = {
    test:Boolean
}

function DropDown({ test }: testProps) {

    useEffect(()=>{
        // console.log(test)
    })

    return (
        <div>
            {
                test && <div className="box">
                    <ul>
                        <Link className="links" to="/">My Profile</Link>
                        <Link className="links" to="/a">Account</Link>
                        {/* <Link className="links" to="/">Home</Link>
                        <Link className="links" to="/">Home</Link> */}
                    </ul>
                </div>
            }
        </div>
    )
}

export default DropDown;