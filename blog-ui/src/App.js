import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Header from './components/header/Header';
import Blogs from './page/Blogs';
import Footer from "./components/footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Blog from "./page/Blog";

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Blogs/>}/>
                        <Route path="/blog/:id" element={<Blog/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}
