import React, { Component } from "react";
// import UserApiService from '../../services/user-api-service';
import ApiContext from "../../contexts/ApiContext";
import userContext from "../../contexts/ApiContext";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import "./LoginForm.css";

class LoginForm extends Component {
  static contextType = ApiContext;
  static defaultProps = {
    onLoginSuccess: () => {},
  };
  static contextType = userContext;

  state = { error: null };

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { username, password } = ev.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        username.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.context.setUserId(res.userId);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
        <div role="alert">
          {error && <p className="login-error">{error}</p>}
        </div>
        <div className="username">
          <label htmlFor="LoginForm__username">Username</label>{" "}
          <input
            type="text"
            required
            name="username"
            id="LoginForm__username"
          ></input>
        </div>

        <div className="password">
          <label htmlFor="LoginForm__password">Password</label>{" "}
          <input
            required
            name="password"
            type="password"
            id="LoginForm__password"
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default LoginForm;
