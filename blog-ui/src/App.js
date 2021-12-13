import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Header from './components/header/Header';
import Blog from './components/content/Blog';
import Footer from "./components/footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }

    async componentDidMount() {
        document.title = "Blog Spring & React";
        await fetch('/user/get', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                response.json().then(json => {
                    this.setState({
                        user: json
                    });
                });
            }
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header user={this.state.user}/>
                    <Routes>
                        <Route path="/" element={<Blog user={this.state.user}/>}/>
                        {/*<Route path="/products/create" element={<Product/>}/>*/}
                    </Routes>
                    {/*<Blog user={this.state.user}/>*/}
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}
