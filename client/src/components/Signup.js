import React, { Component } from "react";
import { Container, Box, Heading, Text, TextField, Button } from "gestalt";
import ToastMessage from "./ToastMessage";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    toast: false,
    toastMessage: ""
  };

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormEmpty(this.state)) {
      this.showToast("Fill in all fields");
      return;
    }
    console.log("submit");
  };

  isFormEmpty = ({ username, email, password }) => {
    return !username || !email || !password;
  };

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({ toast: false, toastMessage: "" }), 3000);
  };

  render() {
    const { toastMessage, toast } = this.state;
    return (
      <Container>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#ccdce0"
            }
          }}
          margin={4}
          padding={4}
          shape="rounded"
          display="flex"
          justifyContent="center"
        >
          {/* Sign Up Form */}
          <form
            style={{
              display: "inlineBlock",
              textAlign: "center",
              maxWidth: 450
            }}
            onSubmit={this.handleSubmit}
          >
            {/* Sign Up form Heading */}
            <Box
              marginBottom={2}
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Heading color="midnight">Let's Get Started</Heading>
              <Text italic color="orchid">
                Sign up to order some brews!
              </Text>
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
            {/* Email input */}
            <Box margin={1}>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
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
              <Button inline color="blue" text="Submit" type="submit" />
            </Box>
          </form>
        </Box>
        <ToastMessage show={toast} message={toastMessage} />
      </Container>
    );
  }
}
export default Signup;
