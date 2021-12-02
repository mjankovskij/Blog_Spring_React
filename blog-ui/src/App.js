import logo from './logo.svg';
import Navbar from './Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";

export default class App extends React.Component {
    componentDidMount(){
        document.title = "Blog Spring & React"
    }

    render() {
        return (
            <div className="App">
                <Navbar/>

                {/*<main className="App-header">*/}
                {/*  <img src={logo} className="App-logo" alt="logo" />*/}
                {/*  <p>*/}
                {/*    Edit <code>src/App.js</code> and save to reload.*/}
                {/*  </p>*/}
                {/*  <a*/}
                {/*    className="App-link"*/}
                {/*    href="https://reactjs.org"*/}
                {/*    target="_blank"*/}
                {/*    rel="noopener noreferrer"*/}
                {/*  >*/}
                {/*    Learn React*/}
                {/*  </a>*/}
                {/*</main>*/}
            </div>
        );
    }
}
