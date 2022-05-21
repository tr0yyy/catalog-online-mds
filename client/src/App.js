import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.isAdmin === 2,
                showAdminBoard: user.isAdmin === 3,
            });
        }
    }
    logOut() {
        AuthService.logout();
    }
    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        Catalog Online
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>
                        {showModeratorBoard && (
                            <li className="nav-item">
                                <Link to={"/mod"} className="nav-link">
                                    Panou Profesor
                                </Link>
                            </li>
                        )}
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Panou Admin
                                </Link>
                            </li>
                        )}
                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}
                    </div>
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.email}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>
                <div className="container mt-3">
                    <Routes>
                        {/*<Route path={["/", "/home"]} component={<Home/>} />*/}
                        <Route exact path="/" element={<Home/>} />
                        <Route exact path="/login" element={<Login/>} />
                        <Route exact path="/profile" element={<Profile/>} />
                    </Routes>
                </div>
            </div>
        );
    }
}
export default App;
