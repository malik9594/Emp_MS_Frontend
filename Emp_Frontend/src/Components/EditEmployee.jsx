import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/auth/employee/${id}`);
                const values = await response.json();
                setEmployee({
                    ...employee,
                    id: values[0].id,
                    name: values[0].name,
                    email: values[0].email,
                    salary: values[0].salary,
                    address: values[0].address
                });


                console.log("Edit values in employee", values);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
        // axios.get('http://localhost:3000/auth/employee/'+id)
        // .then(result=>{
        //     setEmployee({...employee,
        //         name:result.data[0].name,
        //         email: result.data[0].email,
        //         salary: result.data[0].salary,
        //         address: result.data[0].address,
        //     })
        //     console.log("Edit data for employee", employee);
        // })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent default form submission behavior

        const postData = async () => {
            const response = await fetch('http://localhost:3000/auth/edit_employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),  // Ensure employee object contains 'id'
            });

            if (response.ok) {
                const result = await response.json();
                if (result.Status) {
                    console.log("Data updated successfully", result.Message);
                    navigate('/dashboard/employee')
                } else {
                    console.log("Error updating data:", result.Error);
                }
            } else {
                console.log("Error in server response:", response.statusText);
            }
        };

        postData();
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <div className="p-3 rounded w-50 border">
                <div className="d-flex justify-content-between"><h2>Edit Employee</h2>
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
                            value={employee.name}
                            placeholder="Enter Name"
                            onChange={(e) => { setEmployee({ ...employee, name: e.target.value }) }}
                        >
                        </input>
                    </div>
                    <div className="col-12">
                        <label for="inputEmail4" className="form-label">Email</label>
                        <input type="email"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            value={employee.email}
                            onChange={(e) => { setEmployee({ ...employee, email: e.target.value }) }}
                            autoComplete='off'></input>
                    </div>

                    <div className="col-12">
                        <label for="inputSalary" className="form-label">Salary</label>
                        <input type="text"
                            className="form-control rounded-0"
                            id="inputSalary"
                            value={employee.salary}
                            placeholder="Enter Salary"
                            onChange={(e) => { setEmployee({ ...employee, salary: e.target.value }) }}

                            autoComplete='off'></input>
                    </div>
                    <div className="col-12">
                        <label for="inputAddress" className="form-label">Address</label>
                        <input type="text" className="form-control rounded-0" id="inputAddress"
                            placeholder="1234 Main Address"
                            value={employee.address}
                            onChange={(e) => { setEmployee({ ...employee, address: e.target.value }) }}

                            autoComplete='off'></input>
                    </div>
                    <div className="col-12">
                        <label for="inputAddress" className="form-label">Category</label>
                        <select name="category" id="category" className="form-select"
                            onChange={(e) => { setEmployee({ ...employee, category_id: e.target.value }) }}
                        >
                            {data1.map((c) => (<option value={c.id}>{c.name}</option>))}
                        </select>
                    </div>



                    <div className="mb-2">
                        <button className="btn btn-success w-100 rounded-0">Edit Employee</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default EditEmployee
