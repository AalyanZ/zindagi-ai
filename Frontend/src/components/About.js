import React, { useState } from "react";
import image6 from '../images/image6.jpg';
import image8 from '../images/image8.jpg';
import { Link } from "react-router-dom";

const About = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const addEmail = async () => {
        let result = await fetch('http://localhost:5000/add-email', {
            method: 'post',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.warn(result);

        setMessage('Thanks for signing up for our newsletter.');
    }

    return (
        <div className="website">
            <div className="container-6">
                <h1>About Us</h1>
                <p>Welcome to Zindagi.ai, a cutting-edge AI-driven platform dedicated to enhancing fire safety
                   in public spaces. Our intelligent computer vision software, integrated with CCTV cameras,
                   provides real-time fire detection and automated emergency response to ensure swift action
                   and guided evacuation during critical situations.</p>
            </div>

            <div className="container-2">
                <div className="text">
                    <h1>Our Mission</h1>
                    <p>"At Zindagi.ai, our mission is to save lives by leveraging AI-powered fire detection
                        and emergency response systems. We aim to minimize damage and improve safety in
                        high-occupancy environments by providing real-time monitoring and rapid alerts to
                        emergency services."</p>
                    <button><Link to='/contact'>Get A Quote</Link></button>
                </div>
                <img alt="images" className="image-6" src={image6} />
            </div>

            <div className="container-2">
                <img alt="images" className="image-8" src={image8} />
                <div className="text">
                    <h1>Our Vision</h1>
                    <p>"We envision a world where AI-driven surveillance ensures fire safety in every public
                        space. By utilizing advanced computer vision and automation, we strive to make every
                        building safer, enabling timely evacuations and reducing the risk of fire-related
                        casualties and property damage."</p>
                    <button><Link to='/contact'>Get A Quote</Link></button>
                </div>
            </div>

            <div className="container-6">
                <h1>Contact Us</h1>
                <p>Want to enhance fire safety in your organization? Get in touch with us today and discover
                   how Zindagi.ai can provide seamless AI-powered fire detection solutions tailored to your
                   needs.</p>
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={addEmail}>Submit</button>
                {message && <p>{message}</p>}
            </div>

            <div className="container-7">
                <p>Copyright © 2025 Zindagi.ai | All Rights Reserved</p>
            </div>
        </div>
    )
}

export default About;