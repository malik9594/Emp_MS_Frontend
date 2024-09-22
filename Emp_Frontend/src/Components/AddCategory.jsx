import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [category, setCategory] = useState('');
    const navigate = useNavigate('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (category === '') {
            alert("Please Enter a field")
        }
        else {
            const PostData = async () => {


                try {
                    const response = await fetch('http://localhost:3000/auth/add_category', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ category }),

                    })
                    console.log("Category Values", category);
                    const data = await response.json();
                    if (data.Status) {
                        navigate('/dashboard/category');
                    }
                    else {
                        alert(data.error);
                    }
                    console.log(data);

                }

                catch (err) {
                    console.log("Error is occuing in Post Data of Add Category", err)
                }
                // axios.post('http://localhost:3000/auth/add_category',{category})
                // .then(result =>{
                //     if(result.data.Status){
                //         navigate('/dashboard/category')
                //     }
                //     else {
                //         alert(result.data.Error);
                //     }
                // })
            }
            PostData();
        }




    }

    return (
        <div className="d-flex justify-content-center align-items-center h-75 loginPage">
            <div className="p-3 rounded w-50 border loginForm">

                <h2>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor='category'><strong>Add Category</strong></label>
                        <input type="text" name="category" placeholder='Enter a Category'
                            onChange={(e) => { setCategory(e.target.value) }}

                            className="form-control ronded-0" />
                    </div>

                    <div className="mb-2">
                        <button className="btn btn-success w-100 rounded-0">Add Category</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default AddCategory
