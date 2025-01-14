import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Ready from "./Ready";
import Quetions from "./Quetions";

const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };

    case "datafailed":
      return { ...state, status: "Error" };
    case "start":
      return { ...state, status: "active" };
    default:
      throw new Error("action unknown");
  }
}

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const Numquestions = questions.lenth;

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "datafailed" }));
  }, []);

  return (
    <div>
      <Header />

      <Main>
        {status === "Loading" && <Loader />}
        {status === "error" && <Error />}

        {status === "ready" && <Ready dispatch={dispatch} />}
        {status === "active" && <Quetions questions={questions[index]} />}
      </Main>
    </div>
  );
}
