import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        category_id: '',
        image: ''

    });
    const [data1, setData1] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('http://localhost:3000/auth/category');
                const data = await response.json();
                console.log(data);
                setData1(data);
            }
            catch (err) {
                console.log(
                    "Error is coming in Get method of category", err
                )
            }
        }
        getData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Employee is:", employee);
    
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('password', employee.password);
        formData.append('address', employee.address);
        formData.append('salary', employee.salary);
        formData.append('image', employee.image);
        formData.append('category_id', employee.category_id);
    
        axios.post('http://localhost:3000/auth/add_employee', formData)
            .then(result => {
                // Check if the request was successful by checking the status code (200 means OK)
                if (result.status === 200) {
                    console.log('Employee added successfully!');
                    navigate('/dashboard/employee');
                } else {
                    console.log('Something went wrong:', result);
                }
            })
            .catch(err => {
                console.log('Error while adding employee:', err);
            });
    }
    

    return (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <div className="p-3 rounded w-50 border">
                <div className="d-flex justify-content-between"><h2>Add Employee</h2>
                    <button className="btn py-0 px-2 btn-primary" onClick={() => { navigate('/dashboard/employee') }}>

                        Back
                    </button>
                </div>


                <form className="row g-1"
                    onSubmit={handleSubmit}
                >
                    <div className="col-12">
                        <label for="inputName" className='form-label'>
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Name"
                            onChange={(e) => { setEmployee({ ...employee, name: e.target.value }) }}
                        >
                        </input>
                    </div>
                    <div className="col-12">
                        <label for="inputEmail4" className="form-label">Email</label>
                        <input type="email"
                            className="form-control rounded-0"
                            placeholder="Enter Email"
                            onChange={(e) => { setEmployee({ ...employee, email: e.target.value }) }}
                        ></input>
                    </div>
                    <div className="col-12">
                        <label className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control rounded-0"
                            placeholder="Enter Password"
                            onChange={(e) => { setEmployee({ ...employee, password: e.target.value }) }}
                            autocomplete="on"
                        ></input>
                    </div>
                    <div className="col-12">
                        <label for="inputSalary" className="form-label">Salary</label>
                        <input type="text"
                            className="form-control rounded-0"
                            placeholder="Enter Salary"
                            onChange={(e) => { setEmployee({ ...employee, salary: e.target.value }) }}

                            autoComplete='off'></input>
                    </div>
                    <div className="col-12">
                        <label for="inputAddress" className="form-label">Address</label>
                        <input type="text" className="form-control rounded-0" id="inputAddress"
                            placeholder="1234 Main Address"
                            onChange={(e) => { setEmployee({ ...employee, address: e.target.value }) }}

                        ></input>
                    </div>
                    <div className="col-12">
                        <label for="inputAddress" className="form-label">Category</label>
                        <select name="category" id="category" className="form-select"
                            onChange={(e) => { setEmployee({ ...employee, category_id: e.target.value }) }}
                        >
                            {data1.map((c) => (<option value={c.id}>{c.name}</option>))}
                        </select>
                    </div>
                    <div className="col-12 mb-3">
                        <label className="form-label" for="inputGroupFile01">Select Image</label>
                        <input type="file" accept="image/png, image/gif, image/jpeg" className="form-control rounded-0"
                            onChange={(e) => { setEmployee({ ...employee, image: e.target.files[0] }) }}
                            name="image"
                            id="inputGroupFile01"></input>
                    </div>


                    <div className="mb-2">
                        <button className="btn btn-success w-100 rounded-0">Add Employee</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default AddEmployee
