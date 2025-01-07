import React from "react";

function Ready({ NumQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>welcome to The React Quiz</h2>
      <h3>{NumQuestions} questions to test your React knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        let's start
      </button>
    </div>
  );
}

export default Ready;
