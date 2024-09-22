import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Employee = () => {
    const [employeedata, setEmployeeData] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/auth/employee');
                const data = await response.json();
                setEmployeeData(data);
                console.log("Data of Employee:", data);
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])

    const handleDelete = (id) => {
        const deleteData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/auth/delete_employee/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);  // Handle non-200 responses
                }
                const data = await response.json(); 
                console.log("Data for delete is:", data);
                location.reload();
            } catch (err) {
                console.log("Error in Delete Functionality", err);
            }
        };
        deleteData();
    };
    
    return (
        <div>
            <div className='px-5 mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>Employee List</h3> </div>
                <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link></div>
            <div className="row mt-3 d-flex justify-content-center">
                <div className="col-md-12">
                    <table className="table bordered px-4">
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>NAME</th>
                                <th scope="col">IMAGE</th>
                                <th scope='col'>EMAIL</th>
                                <th scope="col">SALARY</th>
                                <th scope="col">ADDRESS</th>

                            </tr>
                        </thead>
                        <tbody>
                            {employeedata.map((i, index) => (
                                <tr key={i.id}>
                                    <td>{i.id}</td>
                                    <td>{i.name}</td>
                                    <td> <img src={`http://localhost:3000/images/${i.image}`} alt="Employee Image" className="employee_img " />     </td>
                                    <td>{i.email}</td>
                                    <td>{i.salary}</td>
                                    <td>{i.address}</td>
                                    <td>
                                        <Link to={`/dashboard/edit_employee/${i.id}`} className="btn-sm btn btn-primary ">Edit</Link>
                                        <Link  className="btn-sm btn btn-warning ms-2 " onClick={() => { handleDelete(i.id) }}>Delete</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Employee
