import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
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
    }, [])
    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Category List</h3> </div>
            <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
            <div className="mt-3">
                <table className="table table-dark">
                    <thead>
                        <tr><th>Name</th></tr>
                    </thead>

                    <tbody>
                        {data1.map((item, index) =>
                        (<tr key={index}>
                            <td>{item.name}</td>
                        </tr>)
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Category
