import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Header from './components/header/Header';
import Blog from './page/Blog';
import Footer from "./components/footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Blog/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}
