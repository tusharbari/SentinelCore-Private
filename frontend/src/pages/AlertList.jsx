import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AlertList() {

    const [alerts, setAlerts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {

            const response = await api.get("/alerts");

            setAlerts(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const deleteAlert = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this alert?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/alerts/${id}`);

            alert("Alert Deleted Successfully");

            fetchAlerts();

        } catch (error) {

            console.log(error);

            alert("Failed to Delete Alert");

        }

    };

    return (

        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 p-8 bg-slate-100 min-h-screen">

                <h1 className="text-3xl font-bold mb-6">
                    Alert List
                </h1>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-800 text-white">

                            <tr>

                                <th className="p-4">ID</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Severity</th>
                                <th className="p-4">Source</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {alerts.length > 0 ? (

                                alerts.map((alert) => (

                                    <tr
                                        key={alert.id}
                                        className="border-b text-center hover:bg-gray-50"
                                    >

                                        <td className="p-4">{alert.id}</td>

                                        <td className="p-4">{alert.title}</td>

                                        <td className="p-4">{alert.severity}</td>

                                        <td className="p-4">{alert.source}</td>

                                        <td className="p-4">{alert.status}</td>

                                        <td className="p-4">{alert.description}</td>

                                        <td className="p-4">

                                            <button
                                                onClick={() => navigate(`/edit-alert/${alert.id}`)}
                                                className="text-blue-600 hover:text-blue-800 mr-4"
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                onClick={() => deleteAlert(alert.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <FaTrash />
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="p-6 text-center text-gray-500"
                                    >
                                        No Alerts Found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </main>

        </>

    );
}

export default AlertList;