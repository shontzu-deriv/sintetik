import React, { useState } from "react";
import { Line, LineChart, XAxis, YAxis } from "recharts";

function Chart({ username, index, val, tick, data }) {
  const [indexName] = useState(index);

  return (
    <div>
      <h1>{username}</h1>
      <h1>{indexName}</h1>
      <h1>{tick}:{val}</h1>
      <hr />

      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="tick" />
        <YAxis />
        <Line dataKey="val" />
      </LineChart>
    </div>
  );
}

export default Chart;
