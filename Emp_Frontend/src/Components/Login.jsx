import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values);
        if (!values.email || !values.password) {
            alert("Enter a values");

        }
        else {
            try {
                const response = await fetch('http://localhost:3000/auth/adminlogin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(values),
                }
                )


                const data = await response.json();
                if (data.loginStatus) {
                    navigate('/dashboard/home');
                }
                else{
                    setError(data.Error);
                }
               
            }
            catch (err) {
                console.log("Error in Login Form", err);
            }
        }


    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className="p-3 rounded w-25 border loginForm">
                <div className="text-warning">
                    {error && error}
                </div>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor='email'><strong>Email:</strong></label>
                        <input type="email" name="email" placeholder='Enter an Email' onChange={(e) => { setValues({ ...values, email: e.target.value }) }} autoComplete='off'
                            className="form-control ronded-0" />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor='password'>
                            <strong>Password:</strong>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder='Enter a Password'
                            autoComplete='off'
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className="form-control ronded-0" />
                    </div>
                    <div className="mb-2">
                        <button className="btn btn-success w-100 rounded-0">Login</button>
                    </div>
                    <div>
                        <input type="checkbox" className='me-2' name="tick" id="tick" />
                        <label name=""><strong>You are agree with terms & conditions</strong></label>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login
