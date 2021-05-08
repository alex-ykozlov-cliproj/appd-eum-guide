import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [key, setKey] = useState(new Date());
  const [ajaxName, setAjaxName] = useState("Unspecified");

  function updateTimeField() {
    setKey( new Date() );
  }

  function onTimeFieldChange(event) {
    setKey(event.target.value);
    window.dtTimestamp = event.target.value;
  }

  function StepVPage( n ) {
    window.ADRUM.markVirtualPageBegin("Step "+n, false);
    //alert("StepVPage ["+n+"] : "+this._key);
    window.ADRUM.markVirtualPageEnd();    
  }  

  function StepAjax( n ) {
      //alert("StepAjax ["+n+"] :" + this._key);
      setAjaxName( "Step2 - Ajax" );
      //window.blah();
      window.ajaxName = "Step2 - Ajax";     
      document.getElementById("ajaxResult").innerHTML = "";

      var request = new XMLHttpRequest();
      request.open("GET", "https://www.google.com/search?q=ajax");

      request.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            document.getElementById("ajaxResult").innerHTML = this.responseText;
        }
      }
      request.send();
    }    

  return (
    <div className="App">
      Timestamp: <input type="datetime-local" id="dtTimestamp" value={key} onChange={onTimeFieldChange}/>
              <button onClick={() => {updateTimeField()} }>Update Timestamp</button><br/><br/>
              <button onClick={() => {StepVPage( 1 )} }>Step 1</button><br/>
              <button onClick={() => {StepAjax( 2 )} }>Step 2</button><br/>
              <button onClick={() => {StepVPage( 3 )} }>Step 3</button><br/><br/>
              <div id="ajaxResult">
                <p>response of request https://www.google.com/search?q=ajax will go here...</p>
              </div>         
    </div>
  );
}

export default App;
