"use client";
import { useState } from "react";

const Testin = () => {
  const [data, setData] = useState();
  const [num, setNum] = useState(1);

  const testFetch = async () => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos/" + num,
      );

      const json = await res.json();

      setNum((prev) => prev + 1);

      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {process.env.NEXT_PUBLIC_HEY ?? "ei ole heytä"}
      <button className="border-solid" onClick={() => testFetch()}>
        Fetch!
      </button>
      {JSON.stringify(data)}
    </div>
  );
};

export default Testin;
