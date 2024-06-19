import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function Piechart({ expensesData }) {
  const calculateCategoryTotals = (expenses) => {
    const categoryTotals = {};

    expenses.forEach((expense) => {
      const { category, price } = expense;
      if (price) {
        const numericPrice = parseFloat(price);
        if (!isNaN(numericPrice)) {
          if (!categoryTotals[category]) {
            categoryTotals[category] = numericPrice;
          } else {
            categoryTotals[category] += numericPrice;
          }
        }
      }
    });

    const data = Object.keys(categoryTotals).map((category) => ({
      name: category,
      value: categoryTotals[category],
    }));

    return data;
  };

  const data = calculateCategoryTotals(expensesData);
  const COLORS = ['#A000FF','#FF9304','#FDE006'] ;

  return (
    <div style={{ display: 'flex', flexDirection: 'column',alignItems:'flex-end'}}>
      <ResponsiveContainer width="80%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
              const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

              return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', justifyContent: 'center', }}>
        {data.map((entry, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center',margin:'2px'}}>
            <div style={{ width: '20px', height: '10px', backgroundColor: COLORS[index % COLORS.length], marginRight: '5px' }}></div>
            <span>{`${entry.name}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Piechart;
