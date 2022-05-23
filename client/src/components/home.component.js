import React, { Component } from "react";
import AuthService from "../services/auth.service";
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }
    render() {
        const { currentUser } = this.state;
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>Proiect - Metode de Dezvoltare Software</strong>
                    </h3>
                    <h4>
                        Bun venit la platforma de Cataloage Online!
                    </h4>
                    {
                        currentUser ? (
                            <p> Foloseste optiunile disponibile din meniul de sus al aplicatiei. </p>
                        ) : (
                            <p> Pentru a putea utiliza platforma , autentifica-te apasand pe Login.</p>
                        )
                    }
                </header>
            </div>
        );
    }
}
