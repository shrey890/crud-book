import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const loginHandler = async (e) => {
		e.preventDefault();
		try {
			if (!values.email || !values.password) {
				throw new Error("Please fill in all fields");
			}
			const response = await axios.post("http://localhost:3000/login", values, {
				withCredentials: true,
			});
			console.log("Response:", response); 
			if (response.status === 200) {
				console.log("Login successful");
				navigate("/");
			} else {
				throw new Error("Login failed");
			}
		} catch (error) {
			console.log("Login error:", error.message);
			alert("Login failed. Please try again."); 
		}
	};
	return (
		<div className="h-screen flex items-center justify-center gap-2 flex-col bg-emerald-300">
			<h1 className="text-3xl font-mono font-semibold">Login</h1>
			<label className="input w-full input-lg max-w-xs input-bordered flex items-center gap-2">
				Email
				<input
					value={values.email}
					onChange={(e) => setValues({ ...values, email: e.target.value })}
					type="text"
					className="grow"
					placeholder="Email"
				/>
			</label>
			<label className="input w-full  input-lg max-w-xs input-bordered flex items-center gap-2">
				Password
				<input
					value={values.password}
					onChange={(e) => setValues({ ...values, password: e.target.value })}
					type="password"
					className="grow "
					placeholder="Password"
				/>
			</label>
			<button onClick={loginHandler} className="btn btn-lg w-full max-w-xs ">
				Login
			</button>
			<p>
				Don't have an account?{" "}
				<Link className="text-blue-700" to="/register">
					Register
				</Link>{" "}
			</p>
		</div>
	);
};
export default Login;
