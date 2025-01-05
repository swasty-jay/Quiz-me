import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Ready from "./Ready";

const initialState = {
  quetions: [],
  status: "Loading",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, quetions: action.payload, status: "ready" };

    case "datafailed":
      return { ...state, status: "Error" };
    default:
      throw new Error("action unknown");
  }
}

export default function App() {
  const [{ quetions, status }, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json)
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "datafailed" }));
  }, []);

  return (
    <div>
      <Header />

      <Main>
        {status === "Loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Ready />}
      </Main>
    </div>
  );
}
