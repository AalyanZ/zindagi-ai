import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from '@mui/icons-material/Phone';

const Contact = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [comment,setComment] = useState('');
    const [message,setMessage] = useState('');

    const addcontact = async ()=>{
        let result = await fetch('http://localhost:5000/add-contact',{
            method:'post',
            body:JSON.stringify({name,email,comment}),
            headers:{
                'Content-Type':'application/json'
            }
        });

        result = await result.json();
        console.warn(result);

        setMessage('We will connect with you soon.');
    }

    return (
        <div className="website">
            <div className="container-6">
                <h1>Contact Us</h1>
            </div>

            <div className="container-9">
                <div className="shadow-box2">
                    <div className="text">
                        <h1>Get In Touch</h1>
                        <div className="inputbox">
                            <input type="text" placeholder="Name" required value={name} onChange={(e)=>setName(e.target.value)}/>
                            <input type="email" placeholder="Email Address" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <input type="text" placeholder="Comment or Message" required value={comment} onChange={(e)=>setComment(e.target.value)}/>
                            <button onClick={addcontact}>Submit</button>
                            {message && <p style={{marginTop: '20px'}}>{message}</p>}
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Contact Info</h1>
                    <div style={{ marginTop: '50px' }}>
                        <div>
                            <EmailIcon /> Email: ayanbadar20@gmail.com
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <PhoneIcon /> Phone: +92 322 935897
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-7">
                <p>Copyright © 2025 Zindagi.ai | All Rights Reserved</p>
            </div>

        </div>
    )
}

export default Contact;