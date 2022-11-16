/* React */
import React from "react";

const Context = React.createContext();

function ContextProvider(props) {
  const [onChange, setOnChange] = React.useState(false);
  return (
    <Context.Provider value={{ onChange, setOnChange }}>
      {props.children}
    </Context.Provider>
  );
}
export { Context, ContextProvider };
