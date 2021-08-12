import "./footer.scss";
import React from "react";
import { Line, Gap } from "../../atoms/"

const Footer = () => {
    
    return (
        <div className="footer-wrapper">
            
            <div className="row-1">
                <h3>Informasi</h3>
                <Gap height="5px"/>
                <ul>
                    <li><a>Dapatkan bantuan</a></li>
                    <li><a>Hubungi kami</a></li>
                    <li><a href={"/aboutus"}>Tentang kami</a></li>
                </ul>
            </div>

            <div className="row-2">
                <h3>Ketentuan Layanan</h3>
                <Gap height="5px"/>
                <ul>
                    <li><a href={"/termsofservice"}>Syarat dan Ketentuan</a></li>
                    <li><a>Kebijakan Privasi</a></li>
                </ul>
            </div>
            
            <div className="footer-branding">
                <h1>PromotBox</h1>
                <Line width="100%"/>
                <span>&copy; {new Date().getFullYear()} PromotBox</span>
            </div>
        </div>
    )
}

export default Footer;