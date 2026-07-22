import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post("/auth/register", {
                name,
                email,
                password
            });

            alert(response.data);

            navigate("/login");

        } catch (error) {

            if (error.response) {
                alert(error.response.data.message || error.response.data);
            } else {
                alert(error.message);
            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <AuthLayout>
            <RegisterForm
                name={name}
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                setName={setName}
                setEmail={setEmail}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                handleRegister={handleRegister}
                loading={loading}
            />
        </AuthLayout>
    );
}

export default Register;