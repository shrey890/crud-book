import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Books = () => {
	const [books, setBooks] = useState([]);
	const fetchBooks = async () => {
		try {
			const res = await axios.get("http://localhost:8800/books");
			setBooks(res.data);
		} catch (error) {
			console.error(error);
		}
	};
	// ! delete handler
	const deleteHandler = async (id) => {
		try {
			await axios.delete(`http://localhost:8800/books/${id}`);
			fetchBooks();
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchBooks();
	}, []);
	return (
		<div>
			<h1>Book Store</h1>
			<Link to="/add">
				<button>Add Book</button>
			</Link>
			<div className="books">
				{books.map((book) => (
					<div className="book" key={book.id}>
						{book.cover && <img src={book.cover} alt={book.title} />}
						<h2>{book.title}</h2>
						<h3>{book.desc}</h3>
						<h4>₹{book.price}</h4>
						<button onClick={() => deleteHandler(book.id)} className="delete">
							delete
						</button>
						<Link to={`/update/${book.id}`}>
							<button className="update">update</button>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};
export default Books;
