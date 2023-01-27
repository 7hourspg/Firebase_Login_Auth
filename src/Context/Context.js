import {createContext, useState} from "react";

const DataContext = createContext();

const ContextProvider = ({children}) => {
  const [getEmail, setGetEmail] = useState(localStorage.getItem('email')|| '');
  return (
    <DataContext.Provider value={{getEmail, setGetEmail}}>
      {children}
    </DataContext.Provider>
  );
};

export {ContextProvider, DataContext};
