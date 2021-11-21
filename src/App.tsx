
import HeaderAB from './component/header';
import { Outlet } from "react-router-dom";

import "./sass/main.scss";
import {timeparser} from  "./typescript/class_timeUtil";
import logger from './config/logger';
import API from "./typescript/class_api";
import { useEffect }   from "react";
import {jsDateToSQL} from './typescript/class_timeUtil';




function App() {
  return (
    <div className="App">
      <HeaderAB />
      <Outlet />
    </div>
  );
}

export default App;

