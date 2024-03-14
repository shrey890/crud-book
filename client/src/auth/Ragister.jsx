import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Ragister = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const registerHandler = async (e) => {
		e.preventDefault();
		try {
			if (!values.name || !values.email || !values.password) {
				throw new Error("Please fill in all fields");
			}
			const response = await axios.post(
				"http://localhost:3000/register",
				values
			);
			if (response.status === 200) {
				// Navigate to login page after successful registration
				navigate("/login");
			} else {
				// Handle other cases (e.g., server error)
				throw new Error("Registration failed");
			}
		} catch (error) {
			console.log("Register error:", error);
		}
	};
	return (
		<div className="bg-amber-300 h-screen flex items-center justify-center gap-2 flex-col ">
			<h1 className="font-semibold font-mono text-3xl">Register</h1>
			<input
				type="text"
				placeholder="Name"
				value={values.name}
				onChange={(e) => setValues({ ...values, name: e.target.value })}
				className="input input-bordered input-lg w-full max-w-xs"
			/>
			<input
				type="email"
				placeholder="Email"
				value={values.email}
				onChange={(e) => setValues({ ...values, email: e.target.value })}
				className="input input-bordered input-lg w-full max-w-xs"
			/>
			<input
				type="password"
				placeholder="Password"
				value={values.password}
				onChange={(e) => setValues({ ...values, password: e.target.value })}
				className="input input-bordered input-lg w-full max-w-xs"
			/>
			<button
				onClick={registerHandler}
				className="btn btn-neutral btn-lg w-full max-w-xs"
			>
				Register
			</button>
			<p>
				Already have an account?{" "}
				<Link className="text-blue-700" to="/login">
					Login
				</Link>
			</p>
		</div>
	);
};
export default Ragister;
