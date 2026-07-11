import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
import "../styles/Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        if (!email || !password) {

            alert("Please enter email and password");
            return;

        }

        try {

            const response = await api.post("/auth/login", {
                email,
                password,
            });

            // Login Failed
            if (!response.data.token) {

                alert(response.data.message);
                return;

            }

            // Save User Details
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("isLoggedIn", "true");

            alert(response.data.message);

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            if (error.response) {

                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);

                alert("Login Failed");

            } else {

                alert(error.message);

            }

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1>SentinelCore</h1>

                <h3>Cyber Threat Intelligence</h3>

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>
                    Login
                </button>

            </div>

        </div>

    );

}

export default Login;