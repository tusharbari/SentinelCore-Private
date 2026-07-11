import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddAlert() {

    const navigate = useNavigate();

    const [alert, setAlert] = useState({
        title: "",
        severity: "",
        source: "",
        status: "",
        description: "",
    });

    const saveAlert = async () => {

        try {

            await api.post("/alerts", alert);

            alert("Alert Added Successfully");

            navigate("/alert-list");

        } catch (error) {

            console.log(error);

            alert("Failed to Add Alert");

        }

    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 p-8 bg-slate-100 min-h-screen">

                <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl">

                    <h1 className="text-3xl font-bold mb-6">
                        Add Alert
                    </h1>

                    <input
                        type="text"
                        placeholder="Alert Title"
                        className="w-full border p-3 rounded mb-4"
                        onChange={(e) =>
                            setAlert({
                                ...alert,
                                title: e.target.value,
                            })
                        }
                    />

                    <select
                        className="w-full border p-3 rounded mb-4"
                        onChange={(e) =>
                            setAlert({
                                ...alert,
                                severity: e.target.value,
                            })
                        }
                    >
                        <option value="">Select Severity</option>
                        <option>Critical</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Source"
                        className="w-full border p-3 rounded mb-4"
                        onChange={(e) =>
                            setAlert({
                                ...alert,
                                source: e.target.value,
                            })
                        }
                    />

                    <select
                        className="w-full border p-3 rounded mb-4"
                        onChange={(e) =>
                            setAlert({
                                ...alert,
                                status: e.target.value,
                            })
                        }
                    >
                        <option value="">Select Status</option>
                        <option>Open</option>
                        <option>Investigating</option>
                        <option>Resolved</option>
                    </select>

                    <textarea
                        placeholder="Description"
                        rows="4"
                        className="w-full border p-3 rounded mb-6"
                        onChange={(e) =>
                            setAlert({
                                ...alert,
                                description: e.target.value,
                            })
                        }
                    />

                    <button
                        onClick={saveAlert}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
                    >
                        Save Alert
                    </button>

                </div>

            </main>

        </>
    );
}

export default AddAlert;