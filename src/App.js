import "./App.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import InnerComponent from "./InnerComponent";
import useEffectSkipFirstRender from "./useEffectSkipFirstRender";

// -------------------3. useContext------------------- <- share data without passing props
const user = {
  name: "archana",
  age: 28,
};
export const UserContext = React.createContext(user); //<- no point of this
// It returns an object with 2 values:
// { Provider, Consumer }

function App() {
  // -------------------1. useState-------------------
  const [count, setCount] = useState(0);

  // -------------------2. useEffect-------------------
  useEffect(() => {
    console.log(count);
  }, [count]);

  useEffectSkipFirstRender(() => {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  }, [count]);

  // -------------------4. useRef------------------- <- will not re-render
  // eg:
  // https://dmitripavlutin.com/react-useref-guide/
  // 1. Mutable values
  //     |-> Use case: logging button clicks
  //     |-> Use case: implementing a stopwatch
  // 2. Accessing DOM elements
  //     |-> Use case: focusing an input
  const myRef = useRef(null);

  // -------------------5. useReducer------------------- <- will not re-render
  function red(state, action) {
    switch (action.type) {
      case "ADD":
        return state.concat([action.value]);
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(red, ["initial-element"]);
  console.log("-----state----->", state);

  // -------------------6. useMemo------------------- <- memorization cache result of function call
  const factorial = useCallback((n) => {
    if (n < 0) {
      return -1;
    }
    if (n === 0) {
      return 1;
    }
    return n * factorial(n - 1);
  }, []);
  const memoizedValue = useMemo(() => factorial(count), [count, factorial]);

  // -------------------7. useCallback-------------------
  // when function pass to multiple child component
  const memoizedCallback = useCallback(() => {
    //<- memorization the function
    return factorial(count);
  }, [count, factorial]);

  return (
    <div className="App">
      <button onClick={() => dispatch({ type: "ADD", value: "array-element" })}>
        add
      </button>
      <p>{state.toString()}</p>

      <button ref={myRef} onClick={() => setCount(count + 1)}>
        increment
      </button>
      <button onClick={() => myRef.current.click()}>
        trigger increment by ref
      </button>

      <h1>count: {count}</h1>
      <h2>memoizedValue: {memoizedValue}</h2>
      <h2>memoizedCallback: {memoizedCallback()}</h2>

      <UserContext.Provider value={"user.name"}>
        {" "}
        {/* <- can pass anything */}
        <InnerComponent />
      </UserContext.Provider>
    </div>
  );
}

export default App;
