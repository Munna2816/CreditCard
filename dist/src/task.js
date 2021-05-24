import { useState } from "react";
import'./task.css';

const useInputField = () => {
    const [inputValues, setValue] = useState({
      val1: "",
      val2: "",
      val3: "",
      val4: ""
    });
  
    return {
      handleChange: e => {
        const { maxLength, minLength,value, name } = e.target;
        const [fieldName, fieldIndex] = name.split("-");
        if (value.length >= maxLength ) {
          if (parseInt(fieldIndex) < 4) {
            const nextSibling = document.querySelector(
              `input[name=val-${parseInt(fieldIndex) + 1}]`
            );
            if (nextSibling !== null) {
              nextSibling.focus();
            }
          }
        }

        else if (value.length == minLength ) {
            if (parseInt(fieldIndex) < 5) {
              
              const prevSibling = document.querySelector(
                `input[name=val-${parseInt(fieldIndex) - 1}]`
              );
        
              if (prevSibling !== null) {
                prevSibling.focus();
              }
            }
          }
  
        setValue({
          ...value,
          [`val${fieldIndex}`]: value
        });
      }
    };
  };
export {useInputField};

export default function CreditCard() {
    const { handleChange } = useInputField();
    const [info,setInfo] = useState([])
    const [showRes,setshowRes] = useState(false)

    document.addEventListener("paste", function(e) {
        if (e.target.type == "text") {
            let data = e.clipboardData.getData('Text');

            if(data.length == 16){
                data = data.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'').split(' ');
            }else{
                data = data.split(' ');
        
            }
            
            [].forEach.call(document.querySelectorAll("input[class=input]"), (node, index) => {
                    node.value = data[index];
                });
            }
            document.querySelector('#input4').focus();
        });

    function delCardNum(indexTodelete) {
        let res = info.filter((val,index)=>{
            if (index == indexTodelete) 
                return false
            return true            
        })

        setInfo(res)
    }

    function add(e){
		e.preventDefault();
		let ob = {
			cardnumber: [ e.target.input1.value, e.target.input2.value,e.target.input3.value,e.target.input4.value],
		  cardholdername:(e.target.cardholdername.value).toUpperCase(),
          expire:e.target.expire.value,
          cvv:e.target.cvv.value,}
		setInfo((info) => {
            return [...info,ob]
        })
	}


    return(
    <div className="checkout">
        <div className="card-number" id="card-container">
            <h1 className="card">Enter Your Card Number below :</h1>
            <form className="form" onSubmit={add}>
                <div className="input-div">
                <label for="val-1">Card Number:</label>
                    <input type="text" 
                        className="input" name="val-1"
                        id="input1" placeholder="0000"
                        minlength="0" maxlength = "4" 
                        pattern="[0-9]{4}" 
                        onChange={handleChange} 
                    />
                    
                    <input type="text" 
                        className="input" name="val-2"
                        id="input2" placeholder="0000"
                        minlength="0" maxlength = "4" 
                        pattern="[0-9]{4}"
                        onChange={handleChange} 
                    />
                    
                    <input type="text" 
                        className="input" name="val-3"
                        id="input3" placeholder="0000"
                        minlength="0" maxlength = "4" 
                        onChange={handleChange} 
                        pattern="[0-9]{4}"
                    />
                    
                    <input type="text" 
                        className="input" name="val-4"
                        id="input4" placeholder="0000"
                        minlength="0" maxlength = "4" 
                        onChange={handleChange} 
                        pattern="[0-9]{4}" 
                    />
                    </div>
                    <div className="cardHolderName">
                    <label for="cardholdername">Card Holder Name:</label>
                    <input type ="text" name="cardholdername" className="cardholdername" placeholder ="Enter holder name" id="cardholdername"/>
                </div>
                <div className="expire">
                <label for="expire">Expiry Date:</label>
                <input type="date" id="expire" name="expire" />
                <label for="cvv">Cvv:</label>
                <input type="number" id="cvv" name="cvv" placeholder="enter the cvv"/>
                </div>

                
                <button id="submit-button" onClick={()=>{setshowRes(true)}}>Submit</button>
            </form>
        </div>
        <div className="out">
        <h2>List of Card Numbers</h2>
        
        {showRes?(<ul>
            
            {
                info.map((val,index)=>{
                    return<li>

                           Card Holder Name:{val.cardholdername}<br/> Card Number:{val.cardnumber[0]} {val.cardnumber[1]} {val.cardnumber[2]} {val.cardnumber[3]}<br/>
                           Expire date:{val.expire}<br/> Cvv:{val.cvv}<br/>

                            <button id="delete" onClick={()=>delCardNum(index)}> Delete </button>
                        </li>
                })
            }
        </ul>):''}
        </div>
        
    </div>)
}