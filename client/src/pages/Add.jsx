import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Add = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/books", book);
            console.log(res.data); 
            navigate("/"); 
        } catch (error) {
            alert('all field are required');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Add Books</h1>
            <div>
                <input
                    onChange={handleChange}
                    name="title"
                    type="text"
                    placeholder="title"
                  
                />
                <input
                    onChange={handleChange}
                    name="desc"
                    type="text"
                    placeholder="desc"
               
                />
                <input
                    onChange={handleChange}
                    name="price"
                    type="number"
                    placeholder="price"
                  
                />
                <input
                    onChange={handleChange}
                    name="cover"
                    type="text"
                    src=""
                    placeholder="Cover"
                />
            </div>
            <button onClick={handleAdd}>Add Book </button>
            <Link to='/'>
                <button>Back to Home</button>
            </Link>
        </div>
    );
};

export default Add;
