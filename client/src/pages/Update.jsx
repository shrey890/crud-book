import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Update = () => {
  const {id} = useParams()
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
	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.put(`http://localhost:8800/books/${id}`, book);
			setBook(res.data);
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div>
			<h1>Update Book</h1>
			<div>
				<input
					onChange={handleChange}
					name="title"
					type="text"
					placeholder="title"
          value={book.title}
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
			<button onClick={handleUpdate}>Update Book </button>
			<Link to="/">
				<button>Back to Home</button>
			</Link>
		</div>
	);
};
export default Update;
