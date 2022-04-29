
import React from 'react';
import { ComposedChart, Line, Area,  Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts';

import TopNavigation from '../../Components/topNavigation/TopNavigation'
import "./dashboard.css"


const Dashboard = () => {
  const data = [
    { name: "IT", value: 15 },
    { name: "IoT", value: 10 },
    { name: "AI", value: 4 },
    { name: "HRM", value: 22 },

  ]
  const data2 = [
    {
      name: 'IT',
      accept: 658,
      idea: 821,
      reject: 163,
    },
    {
      name: 'IOT',
      accept: 756,
      idea: 933,
      reject: 177,
    },
    {
      name: 'AI',
      accept: 348,
      idea: 521,
      reject: 173,
    },
    {
      name: 'HRM',
      accept: 1291,
      idea: 1438,
      reject: 147,
    },

  ];

  return (
    
    <div  >
      <div>
        <TopNavigation currentMode="Dashboard"></TopNavigation>
      </div>
      <div className='Chart'>
        <h2>Contribution idea of each Department</h2>
        <PieChart width={400} height={400}>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label />
          <Tooltip />
        </PieChart>
      </div>
      <div className='Chart'>
        <h2>Number Idea of each Department per year</h2>
        <ComposedChart
          width={500}
          height={400}
          data={data2}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="accept" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="Idea" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="reject" stroke="#ff7300" />
        </ComposedChart>
      </div>
    </div>

  );
}

export default Dashboard;