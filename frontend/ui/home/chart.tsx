import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
} from "recharts";

const Chart = ({ data }: { data: { name: string; totalValue: number }[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalValue"
          stroke="DarkCyan"
          name="Total Deals"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
