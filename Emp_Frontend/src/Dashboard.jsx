import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/logout');
            const data = await response.json();
            console.log(data);
            if (data.Status === true) {
                navigate('/')
            }

        }
        catch (err) {
            console.log("Logout Data is not found", err);
        }
    }
    
    return (
        <div className="container-fluid">

            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                        <Link to="/dashboard"
                            className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-decoration-none ">
                            <span className='fs-5 fw-bolder d-none d-sm-inline'>
                                Code With Hassan</span></Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center" id="menu">
                            <li className="w-100 link-hover">
                                <Link to="/dashboard/home"
                                    className='nav-link text-white px-0 align-middle'>
                                    <i className="bi bi-speedometer ms-2 fs-4"></i>
                                    <span className="ms-2 d-none d-sm-inline">Dashboard</span></Link>
                            </li>
                            <li className="w-100 link-hover">
                                <Link to="/dashboard/employee" className='nav-link text-white px-0 align-middle'>
                                    <i className="bi bi-people ms-2 fs-4"></i>
                                    <span className="ms-2 d-none d-sm-inline">Manager Employees</span></Link>
                            </li>
                            <li className="w-100 link-hover">
                                <Link to="/dashboard/category" className='nav-link text-white px-0 align-middle'>
                                    <i className="bi bi-columns ms-2 fs-4">
                                    </i><span className="ms-2 d-none d-sm-inline">Category</span></Link>
                            </li>
                            <li className="w-100 link-hover">
                                <Link to="/dashboard/profile" className="nav-link text-white px-0 align-middle">
                                    <i className="bi bi-person ms-2 fs-4"></i>
                                    <span className="ms-2 d-none d-sm-inline">Profile</span></Link>
                            </li>
                            <li className="w-100 link-hover" onClick={handleLogout}>
                                <Link className="nav-link text-white px-0 align-middle">
                                    <i className="bi bi-power ms-2 fs-4"></i>
                                    <span className="ms-2 d-none d-sm-inline"> Logout</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col p-0 m-0'>
                    <div className='p-2 d-flex justify-content-center shadow'>
                        <h4>Employee Management System</h4>
                    </div>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default Dashboard
