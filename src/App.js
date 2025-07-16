import "./App.css";
import React from 'react';
import FruitList from './day2/Array'
import Conditional from "./day2/Conditional"; 
import Calc from "./day2/Calc";
import MultiplicationTable from "./day2/MultiplicationTable";
import Array1 from "./Day3/Array1";
import Array2 from "./Day3/Array2";
import Array3 from "./Day3/Array3";
import Object from "./Day3/Object";
import Userlist from "./Day3/Userlist";
import User from "./Day4/User"
import EmojiPicker from "./Day4/Component/Emojipicker"; 


function App(){
  return <><div className="App"></div><div className="App">
    <FruitList /> <Conditional/> <Calc/> <MultiplicationTable/> <Array1/>
    <Array2/><Array3/> <Object/> <Userlist/> <User/><EmojiPicker/>
  </div></>
}



 export default App;