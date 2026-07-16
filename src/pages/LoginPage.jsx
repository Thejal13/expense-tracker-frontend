import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        console.log("Login button clicked!");

        try {

            const response = await api.post("/users/login", {
                email,
                password,
            });

            // Check what backend returns
            console.log(response.data);

            // Save JWT Token
            localStorage.setItem("token", response.data.token);

            // Save User Details
            localStorage.setItem("userId", response.data.id);
            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("userEmail", response.data.email);

            alert(response.data.message);

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(error.response.data.message || "Login failed!");
            } else {
                alert("Server not reachable!");
            }
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="col-md-6 col-lg-4">

                <div className="card shadow-lg p-4">

                    <h2 className="text-center mb-2">
                        Expense Tracker 💸
                    </h2>

                    <p className="text-center text-muted mb-4">
                        Sign in to manage your expenses
                    </p>

                    <div className="mb-3">
                        <label className="form-label">Email</label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="btn btn-primary w-100"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <p className="text-center mt-3">
                        Don't have an account?

                        <Link to="/register" className="ms-2">
                            Register
                        </Link>
                    </p>

                </div>

            </div>
        </div>
    );
}

export default LoginPage;