import React from 'react';
import Cookies from 'js-cookie';
import {BoxArrowInRight} from "react-bootstrap-icons";

export default class Logout extends React.Component {
    async handleClick(e) {
        e.preventDefault();
        await fetch('/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
            },
            redirect: 'manual'
        }).then(() => {
                window.location.reload();
        });
    }

    render() {
        return (<BoxArrowInRight onClick={this.handleClick}/>
        )
    }
}

