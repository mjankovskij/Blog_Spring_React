import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Header from './Header';
import Blog from './Blog';

export default class App extends React.Component {
    componentDidMount(){
        document.title = "Blog Spring & React"
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <Blog/>
            </div>
        );
    }
}
