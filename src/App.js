import React, { useState } from 'react';
import './App.css';
import { BsX } from 'react-icons/bs';
import { AiOutlinePercentage } from 'react-icons/ai';
import data from './data';


function App() {
 const [radioBtn , setRadioBtn] = useState(true);
 const [secRadioBtn , setSecRadioBtn] = useState(false);
 const [flatPayoutValue, setFlatPayoutValue] = useState();
 const [indValue , setIndValue] = useState();
 const [arr,setArr] = useState([]);

 function changeRadioState(){
  setRadioBtn((prev) => !prev);
  setSecRadioBtn((prev) => !prev);
 }
 function changeFlatValue(e){
    setFlatPayoutValue(e.target.value);
    
 }
 function msg(){
  
  alert("Item has been added in array");
  sub();
 }

 function itemChange(e,index){
  console.log(index);
  const val = e.target.value;
  setIndValue(val);
  itemCheck(val,index);
 }

 function itemCheck(val, index) {
  const name = data[index].category_name;
  const sub_id = index + 1;

  // Check if an object with the same sub_id already exists in the array
  const existingObjIndex = arr.findIndex((item) => item.sub_id === sub_id);

  if (existingObjIndex !== -1) {
    // If the object exists, update its value
    const updatedArr = [...arr];
    updatedArr[existingObjIndex].value = val;
    setArr(updatedArr);
  } else {
    // If the object doesn't exist, add a new object to the array
    const obj = {
      sub_id,
      category_name: name,
      value: val,
    };
    updateArray(obj);
  }
}

function updateArray(obj) {
  const newArr = [...arr, obj];
  setArr(newArr);
}



   function sub(){
    console.log(arr);
   }

  return (
    <div className="App">
      <header className="App-header">
        <BsX />
        <p>Add Proposed Products & Payout</p>
      </header>

      <select name="selectedFruit" defaultValue="OneAndro Manager" className='select' disabled>
        <option value="apple">OneAndro Manager</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </select>

      <div className='loan'>
        <h3>LOAN</h3>
      </div>

      <div className='btns'>
        <label>
          <input
            type="radio"
            value="option1"
            onClick={changeRadioState}
            checked={radioBtn}
          />
          Set flat payout % for all sub-products
        </label>
        <label>
          <input
            type="radio"
            value="option2"
            onClick={changeRadioState}
            checked={secRadioBtn}
          />
          Set payout % per sub-products
        </label>
      </div>

     <div className="enter">
          <p>Enter Flat Payout</p>
          <div>
            {
             radioBtn && <input
              type="text"
              placeholder=""
              value={flatPayoutValue}
              onChange={changeFlatValue}
            />
            }
            <AiOutlinePercentage style={{ paddingLeft: '10px' }} />
          </div>
        </div>
    

      <div className='sub'>
        <p>Sub Products</p>
        <p>Payout %</p>
      </div>

      <div className='selectAll'>
        <label>
          <input type='checkbox' />Select All
        </label>
      </div>

      <div className="all-wrap">
        {data.map((item, index) => (
          <div className="items-wrap" key={index}>
            <div className="item-names">
              <label>
                <input
                  type="checkbox"
                  onClick={msg}
                
                  
                />
                {item.category_name}
              </label>
            </div>

            <div className="items-per" key={index}>
              <input
                type="text"
                value={flatPayoutValue}
                disabled={flatPayoutValue > 0 ? true : false}
                onChange={(e) => itemChange(e, index)}
              />
              <AiOutlinePercentage style={{ paddingLeft: '10px' }} />
            </div>
          </div>
        ))}
      </div>

      <button className="submit">
        Submit
      </button>
    </div>
  );
}

export default App;
