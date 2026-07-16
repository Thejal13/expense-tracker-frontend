import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/users/register", {
                name,
                email,
                password
            });

            alert(response.data.message);

            setName("");
            setEmail("");
            setPassword("");

        } catch (error) {

            if (error.response) {
                alert(error.response.data.message);
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

                    <h2 className="text-center mb-4">
                        Register 📝
                    </h2>

                    <div className="mb-3">

                        <label className="form-label">
                            Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    <button
                        className="btn btn-success w-100"
                        onClick={handleRegister}
                    >
                        Register
                    </button>

                    <p className="text-center mt-3">

                        Already have an account?

                        <Link to="/login" className="ms-2">
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default RegisterPage;