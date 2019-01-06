import React, { Component } from "react";
import { Container, Box, Heading, TextField, Button } from "gestalt";
import ToastMessage from "./ToastMessage";
import { setToken } from "../utils/index";
import Strapi from "strapi-sdk-javascript/build/main";

const apiUrl = process.env.API_URL || " http://localhost:1337";
const strapi = new Strapi(apiUrl);

class Signin extends Component {
  state = {
    username: "",
    password: "",
    toast: false,
    toastMessage: "",
    loading: false
  };

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { username, password } = this.state;

    if (this.isFormEmpty(this.state)) {
      this.showToast("Fill in all fields");
      return;
    }

    //Sign up Use
    try {
      this.setState({ loading: true });
      const response = await strapi.login(username, password);
      this.setState({ loading: false });
      setToken(response.jwt);
      this.redirectUser("/");
    } catch (error) {
      this.setState({ loading: false });
      this.showToast(error.message);
    }
  };

  redirectUser = path => this.props.history.push(path);

  isFormEmpty = ({ username, password }) => {
    return !username || !password;
  };

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({ toast: false, toastMessage: "" }), 3000);
  };

  render() {
    const { toastMessage, toast, loading } = this.state;
    return (
      <Container>
        <Box
          color="midnight"
          margin={4}
          padding={4}
          shape="rounded"
          display="flex"
          justifyContent="center"
        >
          {/* Sign In Form */}
          <form
            style={{
              display: "inlineBlock",
              textAlign: "center",
              maxWidth: 450
            }}
            onSubmit={this.handleSubmit}
          >
            {/* Sign In form Heading */}
            <Box
              marginBottom={2}
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Heading color="white">Welcome Back!</Heading>
            </Box>

            {/* User name input */}
            <Box margin={1}>
              <TextField
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                onChange={this.handleChange}
              />
            </Box>

            {/* Password input */}
            <Box margin={1}>
              <TextField
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Box>
            <Box marginTop={2}>
              <Button
                inline
                color="blue"
                text="Sign In"
                type="submit"
                disabled={loading}
              />
            </Box>
          </form>
        </Box>
        <ToastMessage show={toast} message={toastMessage} />
      </Container>
    );
  }
}
export default Signin;
