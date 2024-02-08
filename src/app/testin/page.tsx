"use client";
import { useState } from "react";

const Testin = () => {
  const [data, setData] = useState();

  const testFetch = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");

      const json = await res.json();

      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  testFetch();

  return <div>{JSON.stringify(data)}</div>;
};

export default Testin;
