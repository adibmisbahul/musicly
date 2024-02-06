import "./navigasi.css"

import SideBar from "./sibebar"
import Navbar from "./navbar"

export default function Navigasi() {
    return(
        <div className="wrapnavigasi">
           <div className="wrapnavileft">
            <SideBar/>
           </div>
           <div className="wrapnaviright">
            <Navbar/>
           </div>
        </div>
    )
}