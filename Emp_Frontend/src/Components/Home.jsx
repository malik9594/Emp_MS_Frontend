import React, { useEffect, useState } from 'react'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      adminCount();
      employeeCount();
      salaryCount();
      adminRecords();
    }
    fetchData();
  }, []);

  const adminCount = () => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/admin_count');
        const data = await response.json();
        console.log("Data of Admin", data);
        if (data.Status === true) {
          setAdminTotal(data.Result[0].admin);
        }

      }
      catch (err) {
        console.log("Error is coming", err);
      }
    }
    fetchAdmin();
  }

  const adminRecords = () => {
    const dataFetch = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/admin_records');
        const data = await response.json();
        if (data.Status === true) {
          setAdmins(data.Result)
        }
      }
      catch (err) {
        console.log("Error in data fetching is:", err);
      }
    }
    dataFetch();
  }
  const employeeCount = () => {
    const dataFetch = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/employee_count');
        const data = await response.json();
        if (data.Status === true) {
          setEmployeeTotal(data.Result[0].employee)
        }
      }
      catch (err) {
        console.log("Error in data fetching is:", err);
      }
    }
    dataFetch();
  }
  const salaryCount = () => {
    const dataFetch = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/salary_count')
        const data = await response.json();
        if (data.Status === true) {
          setSalaryTotal(data.Result[0].salary);
        }
      }
      catch (err) {
        console.log("Total Salary of Employees");
      }
    }
    dataFetch();
  }
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>
              Admin
            </h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{salaryTotal}</h5>
          </div>
        </div>

      </div>
      <div className="mt-4 px-5 pt-3">
        <h3>
          List of Admins
        </h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
            {admins.map((i, index) => (
              <tr key={index}>
                <td>
                  {i.email}
                </td>
                <td>
                  <button className="btn btn-sm btn-success">
                    Edit
                  </button>
                  <button className="btn btn-sm btn-warning ms-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
