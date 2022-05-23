import React, { Component } from "react";
import AuthService from "../services/auth.service";
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }
    async componentDidMount() {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(3000);
        window.location.href = '/';
    }

    render() {
        const { currentUser } = this.state;
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>Logged-out</strong>
                    </h3>
                    <h4>
                        In 3 secunde vei fi trimis la pagina principala
                    </h4>
                </header>
            </div>
        );
    }
}
