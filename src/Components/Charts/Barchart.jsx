import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function HorizontalBarChart({ expensesData }) {
  
  const data = expensesData.map(expense => ({
    name: expense.category,
    amount: expense.price,
  }));

  return (
    <div style={{ width: '100%', height: '300px', background: 'white', margin: '10px', borderRadius: '10px', overflow: 'hidden' }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 60, bottom: 10 }}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis type="number" axisLine={false} tickLine={false} tick={false} />
          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: 'white', borderRadius: '10px' }} />
          {/* <Legend /> */}
          <Bar dataKey="amount" fill="#8884d8" radius={[0, 10, 10, 0]} barSize={15} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HorizontalBarChart;
