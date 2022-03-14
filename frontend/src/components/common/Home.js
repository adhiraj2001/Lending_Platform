import React, { useState, useEffect } from "react";
import ls from "local-storage";


const Home = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    
    setName(ls.get("name"));

  }, []);

  if(ls.get("login") === "true") {
    return <div style={{ textAlign: "center" }}> <h2> Welcome {name}. </h2> </div>;
  }
  else {
    return <div style={{ textAlign: "center" }}> <h2> Please Login or Register a New Account. </h2> </div>;
  }
};

export default Home;
