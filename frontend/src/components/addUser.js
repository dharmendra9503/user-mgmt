import React, { useState } from 'react'
import axios from 'axios';

export default function AddUser(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [response, setResponse] = useState([]);
    const [colorState, setColorState] = useState("light");
    const [error, setError] = useState('');


    let textChanged = (event) => {
        if (event.target.name === 'firstName') {
            setFirstName(event.target.value);
        }
        else if (event.target.name === 'lastName') {
            setLastName(event.target.value);
        }
        else if (event.target.name === 'email') {
            setEmail(event.target.value);
        }
        else if (event.target.name === 'mobile') {
            // setMobile(event.target.value);
            const cleanedValue = event.target.value.replace(/\D/g, '');
            setMobile(cleanedValue);
        }
    }

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile
    }

    const headers = {
        "Content-Type": "application/json"
    };

    let addUser = (event) => {
        event.preventDefault();
        if (user.mobile.length !== 10) {
            setError('Mobile number must be 10 digits.');
            setColorState("danger");
        }
        else {
            axios.post('http://127.0.0.1:5000/api/user/addUser', user, { headers }).then(response => { setResponse(response); setColorState("success") }).catch(error => { setResponse(error.response); setColorState("danger") });
        }
        setFirstName('');
        setLastName('');
        setEmail('');
        setMobile('');
        setTimeout(() => {
            setResponse([]);
            setError('');
            setColorState("light")
        }, 5000);
    }

    return (
        <div className='mt-5'>
            <div className={`container w-50 alert alert-${colorState} text-center add-alert-${colorState}`}>
                {response.status ? response.data.message : error}
            </div>
            <div className='container mt-3 card w-50'>
                <form onSubmit={addUser}>
                    <div className="card-header text-center">
                        <h3 style={{ marginBottom: '.0rem' }}>{props.title}</h3>
                    </div>
                    <div className='card-body'>
                        <div className="mb-3 w-75 m-auto">
                            <input type="text" className="form-control shadow-sm font-monospace fs-5" name="firstName" value={firstName} id="ffirstName" placeholder='Enter First Name' required onChange={textChanged} autoComplete="new-password" />
                        </div>
                        <div className="mb-3 w-75 m-auto">
                            <input type="text" className="form-control shadow-sm font-monospace fs-5" name="lastName" value={lastName} id="lfirstName" placeholder='Enter Last Name' required onChange={textChanged} autoComplete="new-password" />
                        </div>
                        <div className="mb-3 w-75 m-auto">
                            <input type="email" className="form-control shadow-sm font-monospace fs-5" name="email" value={email} id="email" placeholder='Enter Email' required onChange={textChanged} autoComplete="new-password" />
                        </div>
                        <div className="mb-2 w-75 m-auto">
                            <input type="" className="form-control shadow-sm font-monospace fs-5" name="mobile" value={mobile} id="mobile" placeholder='Enter Mobile' required onChange={textChanged} autoComplete="new-password" />
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <div className='d-grid w-50 m-auto'>
                            <button type="submit" className="btn btn-primary font-monospace fs-5">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}