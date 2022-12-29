import React, {useEffect} from 'react';
import './App.scss';
import Main from "./Main";
import {settings} from "./environments/environment";
function App() {

    useEffect(()=> {
        document.title = settings.title
    }, [])

      return (
        <div className="spinner-overlay">
            {/*<div className={"lds-hourglass"}>*/}
            {/*</div>*/}
            <Main/>
        </div>
      );
}

export default App;
