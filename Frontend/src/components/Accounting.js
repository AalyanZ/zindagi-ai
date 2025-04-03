import React, { useState } from "react";
import image9 from '../images/image9.jpg';
import image10 from '../images/image10.jpg';
import image11 from '../images/image11.jpg';
import image12 from '../images/image12.jpg';
import image13 from '../images/image13.jpg';
import image14 from '../images/image14.jpg';
import image15 from '../images/image15.jpg';
import { Link } from "react-router-dom";

const Accounting = () => {

    const [review, setReview] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const addreview = async () => {
        let result = await fetch('http://localhost:5000/add-review', {
            method: 'post',
            body: JSON.stringify({ review, name, email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.warn(result);

        setMessage('Thankyou for your response.');
    }

    const addemail = async () => {
        let result = await fetch('http://localhost:5000/add-email', {
            method: 'post',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.warn(result);

        setMessage('Thanks for signing up to out newsletter.');
    }

    return (
        <div className="website">
            <div className="container-6">
                <h1>Welcome to Global Business Solutions</h1>
                <p>Your Partner in Financial Management.</p>
            </div>

            <div className="container-2">
                <div className="text">
                    <h1>About Us</h1>
                    <p>Welcome to Global Business Solutions, where we are dedicated to transforming your
                        financial practices through our expert accounting and taxation services. Our
                        mission is to optimize your financial performance, ensure compliance with tax
                        regulations, and provide comprehensive financial management—all within a framework
                        of utmost integrity and professionalism.</p>
                    <button><Link to='/contact'>Get A Quote</Link></button>
                </div>
                <img
                    alt="images"
                    className="image-9"
                    src={image9} />
            </div>

            <div className="container-8">
                <h1>Our Services</h1>
            </div>

            <div className="container-5">
                <div>
                    <img
                        alt="images"
                        className="image-10"
                        src={image10} />
                    <h3>Accounting Services</h3>
                    <span>Our dedicated team of professionals ensures a seamless medical billing process, from
                        claim generation to submission and follow-up. With a focus on accuracy and efficiency,
                        we aim to maximize your revenue while minimizing the hassle.
                    </span>
                </div>

                <div>
                    <img
                        alt="images"
                        className="image-11"
                        src={image11} />
                    <h3>Bookkeeping</h3>
                    <span>Timely submission and persistent follow-up are crucial for expedited
                        reimbursements. We manage the entire claims process, ensuring that your practice
                        receives payments promptly.
                    </span>
                </div>

                <div>
                    <img
                        alt="images"
                        className="image-12"
                        src={image12} />
                    <h3>Payroll Processing</h3>
                    <span>Identifying and addressing denials promptly is vital for minimizing revenue
                        loss. Our proactive denial management strategies are designed to maximize
                        reimbursements and reduce financial setbacks.
                    </span>
                </div>
            </div>

            <div className="container-5">
                <div>
                    <img
                        alt="images"
                        className="image-13"
                        src={image13} />
                    <h3>Accounts Payable</h3>
                    <span>Our dedicated team of professionals ensures a seamless medical billing process, from
                        claim generation to submission and follow-up. With a focus on accuracy and efficiency,
                        we aim to maximize your revenue while minimizing the hassle.
                    </span>
                </div>

                <div>
                    <img
                        alt="images"
                        className="image-14"
                        src={image14} />
                    <h3>US Taxation Services</h3>
                    <span>Timely submission and persistent follow-up are crucial for expedited
                        reimbursements. We manage the entire claims process, ensuring that your practice
                        receives payments promptly.
                    </span>
                </div>

                <div>
                    <img
                        alt="images"
                        className="image-15"
                        src={image15} />
                    <h3>Financial Consulting</h3>
                    <span>Identifying and addressing denials promptly is vital for minimizing revenue
                        loss. Our proactive denial management strategies are designed to maximize
                        reimbursements and reduce financial setbacks.
                    </span>
                </div>
            </div>

            <button className="services-btn"><Link to='/contact'>Book A Consultation</Link></button>

            <div className="container-3">
                <h1>Why Choose Us?</h1>
            </div>

            <div className="container-4">
                <div>
                    <h3>Expertise</h3>
                    <span>We embrace an agile methodology that allows us to respond swiftly to markets
                        shifts and client feedback. The flexiblity ensures that our solutions remain
                        nible and responsive in a rapidly changing business enviroment.
                    </span>
                </div>
                <div>
                    <h3>Technology</h3>
                    <span>We embrace an agile methodology that allows us to respond swiftly to markets
                        shifts and client feedback. The flexiblity ensures that our solutions remain
                        nible and responsive in a rapidly changing business enviroment.
                    </span>
                </div>
                <div>
                    <h3>Dedicated Support</h3>
                    <span>We embrace an agile methodology that allows us to respond swiftly to markets
                        shifts and client feedback. The flexiblity ensures that our solutions remain
                        nible and responsive in a rapidly changing business enviroment.
                    </span>
                </div>
                <div>
                    <h3>HIPAA Compliance</h3>
                    <span>We embrace an agile methodology that allows us to respond swiftly to markets
                        shifts and client feedback. The flexiblity ensures that our solutions remain
                        nible and responsive in a rapidly changing business enviroment.
                    </span>
                </div>
            </div>

            <div class="shadow-box">
                <h1>Submit A Review</h1>
                <div className="inputbox">
                    <input type="text" placeholder="Add Review" required value={review} onChange={(e) => setReview(e.target.value)} />
                    <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button onClick={addreview}>Submit</button>
                    {message && <p style={{ marginTop: '20px' }}>{message}</p>}
                </div>
            </div>

            <div className="container-6">
                <h1>Contact Us</h1>
                <p>Ready to elevate your medical billing experience? Contact us today to discuss how
                    Global Business Solutions can tailor our services to meet the unique needs of your
                    practice.
                </p>
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={addemail}>Submit</button>
                {message && <p>{message}</p>}
            </div>

            <div className="container-7">
                <p>Copyright © 2024 Global Business Solutions | All Rights Reserved Global Business Solutions</p>
            </div>
        </div>
    )
}

export default Accounting;