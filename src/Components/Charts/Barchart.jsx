import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function HorizontalBarChart({ expensesData }) {
  
  const data = expensesData.reduce((acc, expense) => {
    const existingCategory = acc.find(item => item.name === expense.category);
    if (existingCategory) {
      existingCategory.amount += expense.price;
    } else {
      acc.push({
        name: expense.category,
        amount: expense.price,
      });
    }
    return acc;
  }, []);

  return (
    <div style={{ width: '90%', height: '300px', background: 'white', margin: '10px', borderRadius: '10px', overflow: 'hidden' }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
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
