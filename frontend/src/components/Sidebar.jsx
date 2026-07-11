import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaShieldAlt,
  FaPlusCircle,
  FaExclamationTriangle,
  FaSearch,
  FaFileAlt,
  FaCog,
  FaList,
  FaBell,
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  return (

    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-slate-900 text-white shadow-lg">

      <div className="p-6 text-center border-b border-slate-700">

        <h2 className="text-2xl font-bold text-cyan-400">
          SentinelCore
        </h2>

        <p className="text-xs text-gray-400 mt-2">
          {role}
        </p>

      </div>

      <nav className="mt-6">

        <ul className="space-y-2">

          {/* Dashboard */}
          <li
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaHome />
            Dashboard
          </li>

          {/* Threat List */}
          <li
            onClick={() => navigate("/threat-list")}
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaShieldAlt />
            Threat List
          </li>

          {/* Add Threat */}
          <li
            onClick={() => navigate("/add-threat")}
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaPlusCircle />
            Add Threat
          </li>

          {/* Add IOC */}
          <li
            onClick={() => navigate("/add-ioc")}
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaSearch />
            Add IOC
          </li>

          {/* IOC List */}
          <li
            onClick={() => navigate("/ioc-list")}
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaList />
            IOC List
          </li>

          {/* Add Alert */}
          <li
            onClick={() => navigate("/add-alert")}
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaBell />
            Add Alert
          </li>

          {/* Alert List */}
          <li
            onClick={() => navigate("/alert-list")}
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaExclamationTriangle />
            Alert List
          </li>

          {/* Reports */}
          <li
            onClick={() => navigate("/threat-list")}
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaFileAlt />
            Reports
          </li>

          {/* Settings - ADMIN Only */}
          {role === "ADMIN" && (
            <li
              className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
            >
              <FaCog />
              Settings
            </li>
          )}

        </ul>

      </nav>

    </aside>

  );
}

export default Sidebar;