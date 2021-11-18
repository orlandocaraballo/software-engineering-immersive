import React, { useContext, createContext, useState } from "react";

const TitleContext = createContext();

export function useTitle() {
  return useContext(TitleContext);
}

export function TitleProvider({ children }) {
  const [title, setTitle] = useState("Page title");

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
}

export default TitleContext;
