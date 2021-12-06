import React, {useRef, useState} from "react";
import {Form, Button} from 'react-bootstrap';
import {logDOM} from "@testing-library/react";

    export default (Register) => {

        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [passwordRepeat, setPasswordRepeat] = useState('');

        const usernameRef = useRef('');
        const passwordRef = useRef('');
        const passwordRepeatRef = useRef('');

        const process = (e) => {
            e.preventDefault();
            setUsername(usernameRef.current.value);
            setPassword(passwordRef.current.value);
            setPasswordRepeat(passwordRepeatRef.current.value);

            console.log(username)
            // await fetch(`/user/register`, {
            //     method: 'DELETE',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     data:{
            //         username:
            //     }
            // }).then((e) => {
            //     console.log(e)
            // });
        }

        return (<>
                <Form onSubmit={process}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" ref={usernameRef}/>
                    <Form.Label className="mt-3">Password</Form.Label>
                    <Form.Control type="text" placeholder="Password" ref={passwordRef}/>
                    <Form.Label className="mt-3">Repeat password</Form.Label>
                    <Form.Control type="text" placeholder="Repeat password" ref={passwordRepeatRef}/>
                    <Button type="submit" className="btn btn-primary col-12 mt-3">Register</Button>
                </Form>
            </>
        )
}

