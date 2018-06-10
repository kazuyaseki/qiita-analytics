import * as React from 'react';
import { Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

const Chart = ({ data }: { data: Array<{ name: string; value: number }> }) => (
  <LineChart
    width={730}
    height={250}
    data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis dataKey="name" />
    <YAxis />
    <Legend />
    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
  </LineChart>
);

export default Chart;
