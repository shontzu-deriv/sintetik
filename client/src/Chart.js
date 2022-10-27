import React, { useEffect, useState } from "react";

function Chart({ socket, username, index }) {
  const [price, setPrice] = useState(index);


  useEffect(() => {
    socket.on("hello", (arg) => {
      console.log(arg); // world
      setPrice(index)
    });
  }, [socket, index]);

  return (
    <div>
        <h1>{username}</h1>
        <h1>{price}</h1>
    </div>
  );
}

export default Chart;
