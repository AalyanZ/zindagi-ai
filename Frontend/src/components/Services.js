import React from "react";
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image7 from '../images/image7.jpg';
import { Link } from "react-router-dom";
const Services = ()=>{
    return(
        <div className="website">
            <div className="container-1">
                <img
                    alt="images"
                    className="image-7"
                    src={image7} />

                <div className="img-text">
                    <h1 class="overlay-text">Exclusive Offer for Health Care Providers</h1>
                    <p class="overlay-text-2">Elevate your practice by Signing-Up to our Revenue Cycle and Management
                        Services and avail upto 50% of on first completed cycle. Seize the limited-time oppurunity
                        to boost your revenue and stream lime operations-join us today!</p>
                    <button className="button-1"><Link to='/contact'>Contact Us</Link></button>
                </div>
            </div>

            <h1 className="help">How Can We HELP YOU?</h1>

            <div className="container-5">
                <div>
                    <img
                        alt="images"
                        className="image-3"
                        src={image3} />
                    <h3>Medical Billing</h3>
                    <span>Streamlining revenue cycle management for doctors and healthcare
                        professionals.
                    </span>
                    <Link to='/medicalservices'>...See More</Link>
                </div>

                <div>
                    <img
                        alt="images"
                        className="image-4"
                        src={image4} />
                    <h3>Accounting and Taxation</h3>
                    <span>Streamlining revenue cycle management for doctors and healthcare
                        professionals.
                    </span>
                    <Link to='/accountingservices'>...See More</Link>
                </div>

                <div>
                    <img
                        alt="images"
                        className="image-5"
                        src={image5} />
                    <h3>IT Services</h3>
                    <span>Streamlining revenue cycle management for doctors and healthcare
                        professionals.
                    </span>
                    <Link to='/itservices'>...See More</Link>
                </div>
            </div>

            <div className="container-6">
                <h1>Contact Us</h1>
                <p>Ready to elevate your medical billing experience? Contact us today to discuss how
                    Global Business Solutions can tailor our services to meet the unique needs of your
                    practice.
                </p>
                <input type="text" placeholder="Email Address"/>
                <button className="services-btn">Submit</button>
            </div>

            <div className="container-7">
                <p>Copyright © 2024 Global Business Solutions | All Rights Reserved Global Business Solutions</p>
            </div>
        </div>
    )
}

export default Services;