import React, { useState } from "react";
import image9 from '../images/image9.jpg';
import image10 from '../images/image10.jpg';
import image11 from '../images/image3.jpg';
import image12 from '../images/image12.jpg';
import image13 from '../images/image13.jpg';
import image14 from '../images/image5.jpg';
import image15 from '../images/image15.jpg';
import { Link } from "react-router-dom";

const Solution = () => {

    const [review, setReview] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const addReview = async () => {
        let result = await fetch('http://localhost:5000/add-review', {
            method: 'post',
            body: JSON.stringify({ review, name, email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.warn(result);

        setMessage('Thank you for your response.');
    }

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
                <h1>Welcome to Zindagi.ai</h1>
                <p>Enhancing Fire Safety with AI-Powered Surveillance Solutions.</p>
            </div>

            <div className="container-2">
                <div className="text">
                    <h1>About Us</h1>
                    <p>Zindagi.ai is at the forefront of revolutionizing fire safety using AI-driven computer vision. 
                        Our mission is to provide intelligent monitoring systems that detect fire in real-time, alert emergency services, 
                        and guide people toward safe evacuation routes, minimizing loss and ensuring public safety.</p>
                    <button><Link to='/contact'>Get A Quote</Link></button>
                </div>
                <img alt="images" className="image-9" src={image9} />
            </div>

            <div className="container-8">
                <h1>Our Solutions</h1>
            </div>

            <div className="container-5">
                <div>
                    <img alt="images" className="image-10" src={image10} />
                    <h3>Real-Time Fire Detection</h3>
                    <span>Our AI-powered surveillance systems analyze CCTV feeds to detect fire and smoke instantly, ensuring rapid response and damage mitigation.</span>
                </div>

                <div>
                    <img alt="images" className="image-11" src={image11} />
                    <h3>Automated Emergency Alerts</h3>
                    <span>Upon fire detection, our system automatically notifies emergency responders, reducing response time and enhancing safety.</span>
                </div>

                <div>
                    <img alt="images" className="image-12" src={image12} />
                    <h3>Intelligent Evacuation Guidance</h3>
                    <span>Our software analyzes building layouts to direct people to the safest and shortest evacuation routes, preventing panic and confusion.</span>
                </div>
            </div>

            <div className="container-5">
                <div>
                    <img alt="images" className="image-13" src={image13} />
                    <h3>AI-Based Incident Analysis</h3>
                    <span>We provide post-incident reports and insights to improve fire safety protocols and minimize future risks.</span>
                </div>

                <div>
                    <img alt="images" className="image-14" src={image14} />
                    <h3>24/7 Monitoring & Surveillance</h3>
                    <span>Our system continuously monitors high-risk areas, ensuring proactive fire safety measures are in place at all times.</span>
                </div>

                <div>
                    <img alt="images" className="image-15" src={image15} />
                    <h3>Custom Safety Solutions</h3>
                    <span>We tailor our AI solutions to meet the specific fire safety needs of malls, offices, hospitals, and other public spaces.</span>
                </div>
            </div>

            <button className="services-btn"><Link to='/contact'>Get A Consultation</Link></button>

            <div className="container-3">
                <h1>Why Choose Us?</h1>
            </div>

            <div className="container-4">
                <div>
                    <h3>Advanced AI Technology</h3>
                    <span>We utilize cutting-edge AI and computer vision to provide accurate and real-time fire detection and emergency response.</span>
                </div>
                <div>
                    <h3>Rapid Emergency Response</h3>
                    <span>Our automated alerts ensure that emergency responders are notified immediately, reducing response time and saving lives.</span>
                </div>
                <div>
                    <h3>Seamless Integration</h3>
                    <span>Zindagi.ai seamlessly integrates with existing CCTV systems, making fire safety implementation cost-effective and efficient.</span>
                </div>
                <div>
                    <h3>Data-Driven Safety Insights</h3>
                    <span>Our system provides in-depth analytics and reports to enhance fire prevention strategies and building safety protocols.</span>
                </div>
            </div>

            <div className="shadow-box">
                <h1>Submit A Review</h1>
                <div className="inputbox">
                    <input type="text" placeholder="Add Review" required value={review} onChange={(e) => setReview(e.target.value)} />
                    <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button onClick={addReview}>Submit</button>
                    {message && <p style={{ marginTop: '20px' }}>{message}</p>}
                </div>
            </div>

            <div className="container-6">
                <h1>Contact Us</h1>
                <p>Want to enhance fire safety in your organization? Reach out to Zindagi.ai today to learn how our AI solutions can protect lives and property.</p>
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

export default Solution;