import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ThreatList() {

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const [threats, setThreats] = useState([]);
    const [search, setSearch] = useState("");
    const [severityFilter, setSeverityFilter] = useState("All");

    useEffect(() => {
        fetchThreats();
    }, []);

    const fetchThreats = async () => {
        try {
            const response = await api.get("/threats");
            setThreats(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // ================= Export PDF =================

    const exportPdf = async () => {

        try {

            const response = await api.get(
                "/reports/threats/pdf",
                {
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.setAttribute(
                "download",
                "SentinelCore_Threat_Report.pdf"
            );

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (error) {

            console.log(error);

            alert("Failed to Download PDF");

        }

    };
     // ================= Export Excel =================

        const exportExcel = async () => {

            try {

                const response = await api.get(
                    "/reports/threats/excel",
                    {
                        responseType: "blob",
                    }
                );

                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );

                const link = document.createElement("a");

                link.href = url;

                link.setAttribute(
                    "download",
                    "SentinelCore_Threat_Report.xlsx"
                );

                document.body.appendChild(link);

                link.click();

                link.remove();

            } catch (error) {

                console.log(error);

                alert("Failed to Download Excel");

            }

        };

    // ================= Delete Threat =================

    const deleteThreat = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this threat?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/threats/${id}`);

            alert("Threat Deleted Successfully");

            fetchThreats();

        } catch (error) {

            console.log(error);

            alert("Failed to Delete Threat");

        }

    };

    // ================= Severity Badge =================

    const getSeverityBadge = (severity) => {

        switch (severity) {

            case "Critical":
                return "bg-red-600 text-white";

            case "High":
                return "bg-orange-500 text-white";

            case "Medium":
                return "bg-yellow-400 text-black";

            case "Low":
                return "bg-green-500 text-white";

            default:
                return "bg-gray-500 text-white";
        }
    };

    // ================= Status Badge =================

    const getStatusBadge = (status) => {

        switch (status) {

            case "Open":
                return "bg-red-100 text-red-700";

            case "In Progress":
                return "bg-blue-100 text-blue-700";

            case "Resolved":
                return "bg-green-100 text-green-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // ================= Search + Filter =================

    const filteredThreats = threats.filter((threat) => {

        const matchesSearch =
            threat.title.toLowerCase().includes(search.toLowerCase());

        const matchesSeverity =
            severityFilter === "All" ||
            threat.severity === severityFilter;

        return matchesSearch && matchesSeverity;

    });

    return (
        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 p-8 bg-slate-100 min-h-screen">

               <div className="flex justify-between items-center mb-6">

                    <h1 className="text-3xl font-bold">
                        Threat Management
                    </h1>

                   {role === "ADMIN" && (

                    <div className="flex gap-3">

                        <button
                            onClick={exportPdf}
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
                        >
                            📄 Export PDF
                        </button>

                        <button
                            onClick={exportExcel}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
                        >
                            📊 Export Excel
                        </button>

                    </div>

                )}

                </div>

                {/* Search + Filter */}

                <div className="flex flex-col md:flex-row gap-4 mb-6">

                    <input
                        type="text"
                        placeholder="🔍 Search Threat..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-80 border rounded-lg px-4 py-2"
                    />

                    <select
                        value={severityFilter}
                        onChange={(e) => setSeverityFilter(e.target.value)}
                        className="border rounded-lg px-4 py-2"
                    >
                        <option value="All">All Severity</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-900 text-white">

                            <tr>

                                <th className="p-4">ID</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Severity</th>
                                <th className="p-4">Source</th>
                                <th className="p-4">Status</th>
                                            {role === "ADMIN" && (
                                            <th className="p-4">Actions</th>
                                        )}

                            </tr>

                        </thead>

                        <tbody>

                            {filteredThreats.length > 0 ? (

                                filteredThreats.map((threat) => (

                                    <tr
                                        key={threat.id}
                                        className="border-b hover:bg-gray-50 text-center"
                                    >

                                        <td className="p-4">{threat.id}</td>

                                        <td className="p-4 font-medium">
                                            {threat.title}
                                        </td>

                                        <td className="p-4">

                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityBadge(threat.severity)}`}>
                                                {threat.severity}
                                            </span>

                                        </td>

                                        <td className="p-4">{threat.source}</td>

                                        <td className="p-4">

                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(threat.status)}`}>
                                                {threat.status}
                                            </span>

                                        </td>

                                       {role === "ADMIN" && (

                                            <td className="p-4">

                                                <button
                                                    onClick={() =>
                                                        navigate(`/edit-threat/${threat.id}`)
                                                    }
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        deleteThreat(threat.id)
                                                    }
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                            )}

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan={role === "ADMIN" ? 6 : 5}
                                        className="text-center p-6 text-gray-500"
                                    >
                                        No Threats Found
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

export default ThreatList;