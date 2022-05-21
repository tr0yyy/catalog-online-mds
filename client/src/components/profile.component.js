import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import UserService from "../services/user.service";
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.state = {
            oldPassword: "",
            newPassword: "",
            loading: false,
            message: "",
            currentUser: AuthService.getCurrentUser()
        };
    }
    onChangeOldPassword(e) {
        this.setState({
            oldPassword: e.target.value
        });
    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        });
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            message: "",
            loading: true
        });
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            UserService.changePassword(this.state.currentUser.email, this.state.oldPassword, this.state.newPassword)
                .then(
                () => {
                    window.location.href = '/'
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const { currentUser } = this.state;
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.email}</strong> Profile
                    </h3>
                </header>
                <Form
                    onSubmit={this.handleChange}
                    ref={c => {
                        this.form = c;
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="oldpassword">Old Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="Old password"
                            value={this.state.oldPassword}
                            onChange={this.onChangeOldPassword}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newpassword">New Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="New Password"
                            value={this.state.newPassword}
                            onChange={this.onChangeNewPassword}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            disabled={this.state.loading}
                        >
                            {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Save</span>
                        </button>
                    </div>
                    {this.state.message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        </div>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                    />
                </Form>
            </div>
        );
    }
}
