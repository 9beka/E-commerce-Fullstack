import React from "react";
import "./Loader.scss"
const Loader = () => {
    return (
        <>
            <div className="overlay"></div>
            <div className="spinner">
                <img src="https://cdn.dribbble.com/users/7040/screenshots/8214019/media/9d162bf2d3303da6f3e777bbae322b33.gif" alt="loader" />
            </div>
        </>
    )
}

export default Loader;