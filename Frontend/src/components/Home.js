import React from "react";
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="website">
            <div className="container-1">
                <img
                    alt="images"
                    className="image-1"
                    src={image1} />

                <div className="img-text">
                    <h1 class="overlay-text">Zindagi.ai: Revolutionizing Fire Safety</h1>
                    <p class="overlay-text-2">Our intelligent fire detection and emergency response platform
                        ensures the safety of people in high-occupancy spaces. Automatically alert fire services and
                        guide evacuations in real-time. Prioritize safety, minimize damage, and protect lives.</p>
                    <button className="button-1"><Link to='/contact'>Get a Quote</Link></button>
                </div>
            </div>

            <div className="container-2">
                <img
                    alt="images"
                    className="image-2"
                    src={image2} />

                <div className="text">
                    <h3>About Zindagi.ai</h3>
                    <h1>AI-Powered Fire Safety Solutions</h1>
                    <p>Zindagi.ai offers cutting-edge fire safety through computer vision and real-time monitoring. Our
                        platform detects fires through CCTV feeds and immediately notifies emergency services while guiding
                        people to safe exits during an evacuation.</p>
                    <button><Link to='/about'>Learn More</Link></button>
                </div>

            </div>

            <div className="container-3">
                <h1>Our mission</h1>
                <span>We are committed to improving fire safety in public spaces by using intelligent monitoring systems
                    that provide real-time responses. Our solution empowers safety teams with quick access to crucial
                    information, ensuring faster, more effective evacuation during emergencies.
                </span>
            </div>

            <div className="container-4">
                <div>
                    <h3>Innovation</h3>
                    <span>We embrace the latest in computer vision and AI to provide real-time fire detection and emergency response.</span>
                </div>
                <div>
                    <h3>Efficiency</h3>
                    <span>Our system integrates seamlessly with existing infrastructure, ensuring minimal disruption and rapid deployment.</span>
                </div>
                <div>
                    <h3>Safety</h3>
                    <span>By prioritizing safety and real-time action, we aim to reduce fire-related fatalities and minimize property damage.</span>
                </div>
                <div>
                    <h3>Collaboration</h3>
                    <span>We collaborate with organizations worldwide to enhance fire safety through innovative and adaptable solutions.</span>
                </div>
            </div>

            <h1 className="help">How Can We HELP YOU?</h1>

            <div className="container-5">
                <div>
                    <img alt="Fire Detection" className="image-3" src={image3} />
                    <h3>Fire Detection</h3>
                    <span>Automated real-time fire detection using advanced computer vision for quick emergency response.</span>
                </div>

                <div>
                    <img alt="Evacuation Guidance" className="image-4" src={image4} />
                    <h3>Evacuation Assistance</h3>
                    <span>AI-powered guidance to help people evacuate safely by providing real-time route suggestions.</span>
                </div>

                <div>
                    <img alt="Monitoring" className="image-5" src={image5} />
                    <h3>24/7 Monitoring</h3>
                    <span>Constant surveillance ensures no fire-related incident goes unnoticed, alerting authorities and saving lives.</span>
                </div>
            </div>

            <button className="services-btn"><Link to='/solution'>Explore</Link></button>

            <div className="container-6">
                <h1>Our Target Audience</h1>
                <p>We serve hospitals, malls, office buildings, and other high-occupancy spaces where fire safety is paramount. Zindagi.ai is designed to meet the needs of organizations focused on improving safety and minimizing risk.</p>
                <div className="styled-hr"></div>
                <span>Choose Zindagi.ai for cutting-edge fire safety solutions tailored to your needs. Safeguard your space and protect lives today.</span>
            </div>

            <div className="container-7">
                <p>Copyright © 2025 Zindagi.ai | All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Home;