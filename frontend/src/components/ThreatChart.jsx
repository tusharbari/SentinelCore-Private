import { useEffect, useState } from "react";
import api from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function ThreatChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchChart();
  }, []);

  const fetchChart = async () => {

    try {

      const response = await api.get("/dashboard/chart");

      console.log(response.data);

      setData(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const colors = [
    "#dc2626",
    "#ea580c",
    "#eab308",
    "#16a34a",
  ];

  return (

    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Threat Distribution
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="severity" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar dataKey="count">

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />

            ))}

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default ThreatChart;