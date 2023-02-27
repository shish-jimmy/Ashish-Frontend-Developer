import React from "react";
import { Provider } from "react-redux";
import store from "./store/capsules";
import CapsuleGrid from "./components/CapsuleGrid";

function App() {
  return (
    <Provider store={store}>  
      
      <CapsuleGrid />
      
    </Provider>
  );
}

export default App;