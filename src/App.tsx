import React from 'react';
import { useState, useContext, useEffect, useRef }   from "react";
import ContentAB from './component/content';
import Footer from './component/footer';

import HeaderAB from './component/header';
import ToolBar from './component/toolbar';

import "./sass/main.scss";
import NavigationContext , {NavigationState} from './component/navigation';

function App() {
  const[navigation, navigationSet] = useState({
    CreateDoc:false,
    updateStatus: router,
  });
  function router(x:boolean) {
    navigationSet({CreateDoc:x, updateStatus: router})
  }
  return (
    <div className="App">
      <NavigationContext.Provider value = {navigation} >
        <HeaderAB />
        <ToolBar />
        <ContentAB />
      </NavigationContext.Provider>

    </div>
  );
}

export default App;

