import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function EditAlert() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [alert, setAlert] = useState({
        title: "",
        severity: "",
        source: "",
        status: "",
        description: "",
    });

    useEffect(() => {
        fetchAlert();
    }, []);

    const fetchAlert = async () => {

        try {

            const response = await api.get(`/alerts/${id}`);

            setAlert(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const updateAlert = async () => {

        try {

            await api.put(`/alerts/${id}`, alert);

            alert("Alert Updated Successfully");

            navigate("/alert-list");

        } catch (error) {

            console.log(error);

            alert("Failed to Update Alert");

        }

    };

    return (

        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 p-8 bg-slate-100 min-h-screen">

                <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl">

                    <h1 className="text-3xl font-bold mb-6">
                        Edit Alert
                    </h1>

                    <input
                        type="text"
                        value={alert.title}
                        className="w-full border p-3 rounded mb-4"
                        onChange={(e) =>
                            setAlert({
                                ...alert,
                                title: e.target.value,
                            })
                        }
                    />

                    <select
                        value={alert.severity}
                        className="w-full border p-3 rounded mb-4"
                        onChange={(e) =>
                            setAlert({
                                ...alert,
                                severity: e.target.value,
                            })
                        }
                    >
                        <option>Critical</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>

                    <input
                        type="text"
                        value={alert.source}
                        className="w-full border p-3 rounded mb-4"
                        onChange={(e) =>
                            setAlert({
                                ...alert,
                                source: e.target.value,
                            })
                        }
                    />

                    <select
                        value={alert.status}
                        className="w-full border p-3 rounded mb-4"
                        onChange={(e) =>
                            setAlert({
                                ...alert,
                                status: e.target.value,
                            })
                        }
                    >
                        <option>Open</option>
                        <option>Investigating</option>
                        <option>Resolved</option>
                    </select>

                    <textarea
                        rows="4"
                        value={alert.description}
                        className="w-full border p-3 rounded mb-6"
                        onChange={(e) =>
                            setAlert({
                                ...alert,
                                description: e.target.value,
                            })
                        }
                    />

                    <button
                        onClick={updateAlert}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
                    >
                        Update Alert
                    </button>

                </div>

            </main>

        </>

    );

}

export default EditAlert;