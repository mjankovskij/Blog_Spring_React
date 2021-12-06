import React from 'react';
import ReactBootstrap, {Navbar, Nav, Container, Form, Button} from 'react-bootstrap'

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                items: [],
                DataisLoaded: false
        }
    }

    componentDidMount() {
        fetch(
            "http://localhost:8080/api/blog/get")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }

    render() {
        const { DataisLoaded, items } = this.state;
        console.log(DataisLoaded)
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
        return (<main className="container">
                {
                    items.map((item) => (
                        <div className="card mt-4" key={ item.id }>
                           <div className="card-header">
                            <h3>{ item.title }</h3>
                            Author: {item.user.username}<br/>
                            {new Date(item.datetime).toISOString().slice(0, 10)} {new Date(item.datetime).toISOString().slice(11, 19)}
                           </div>
                            <div className="card-text p-3 text-justify">{ item.description }</div>
                        </div>
                    ))
                }
            </main>
        )
    }
}

