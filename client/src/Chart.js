import React, { useState } from "react";

function Chart({ socket, username, index }) {
  const [indexName] = useState(index);

  return (
    <div>
        <h1>{username}</h1>
        <h1>{indexName}</h1>
        <b></b>
    </div>
  );
}

export default Chart;
