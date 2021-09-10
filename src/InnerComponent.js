import React, { useContext } from "react";
import { UserContext } from "./App";

export default function InnerComponent() {
  const s = useContext(UserContext);

  return <h1>useContext: {s}</h1>;
}
