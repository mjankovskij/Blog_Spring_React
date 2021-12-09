import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Header from './Header';
import Blog from './blog/Blog';

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
            <div className="App">
                <header>
                <Header user={this.state.user}/>
                </header>
                <main>
                    <Blog user={this.state.user}/>
                </main>
            </div>
        );
    }
}
