import { useEffect, useState } from "react";
import api from "../services/api";

import {
  FaBug,
  FaExclamationTriangle,
  FaBell,
  FaCheckCircle,
} from "react-icons/fa";

function DashboardCards() {

  const [stats, setStats] = useState({
    totalThreats: 0,
    criticalThreats: 0,
    totalAlerts: 0,
    criticalAlerts: 0,
  });

  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {

      const response = await api.get("/dashboard/stats");

      setStats(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const cards = [
    {
      title: "Total Threats",
      value: stats.totalThreats,
      icon: <FaBug />,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      title: "Critical Threats",
      value: stats.criticalThreats,
      icon: <FaExclamationTriangle />,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      title: "Total Alerts",
      value: stats.totalAlerts,
      icon: <FaBell />,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Critical Alerts",
      value: stats.criticalAlerts,
      icon: <FaCheckCircle />,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >

          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl ${card.bg} ${card.color}`}
          >
            {card.icon}
          </div>

          <h3 className="mt-5 text-gray-500 font-semibold">
            {card.title}
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {card.value}
          </h1>

        </div>

      ))}

    </div>
  );
}

export default DashboardCards;