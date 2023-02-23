import React, {useEffect} from 'react';
import './App.css';
import Main from "./Main";
import {settings} from "./environments/environment";
function App() {

    useEffect(()=> {
        document.title = settings.title
    }, [])

      return (
        <div className="spinner-overlay">
            <Main/>
        </div>
      );
}

export default App;
