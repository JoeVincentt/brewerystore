import React, { Component } from "react";
import { Container, Box, Heading, TextField, Button } from "gestalt";
import ToastMessage from "./ToastMessage";

class Checkout extends Component {
  state = {
    address: "",
    zip: "",
    city: "",
    confirmationEmail: "",
    toast: false,
    toastMessage: ""
  };

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  };

  handleConfirmOrder = async event => {
    event.preventDefault();

    if (this.isFormEmpty(this.state)) {
      this.showToast("Fill in all fields");
      return;
    }
  };

  redirectUser = path => this.props.history.push(path);

  isFormEmpty = ({ address, zip, confirmationEmail, city }) => {
    return !address || !zip || !confirmationEmail || !city;
  };

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({ toast: false, toastMessage: "" }), 3000);
  };

  render() {
    const { toast, toastMessage } = this.state;

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
          {/* Checkout Form */}
          <form
            style={{
              display: "inlineBlock",
              textAlign: "center",
              maxWidth: 450
            }}
            onSubmit={this.handleConfirmOrder}
          >
            {/* Checkout form Heading */}
            <Box
              marginBottom={2}
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Heading color="midnight">Checkout</Heading>
            </Box>

            {/* Shipping address input */}
            <Box margin={1}>
              <TextField
                id="address"
                type="text"
                name="address"
                placeholder="Shipping Address"
                onChange={this.handleChange}
              />
            </Box>
            {/* Zip Code input */}
            <Box margin={1}>
              <TextField
                id="zip"
                type="number"
                name="zip"
                placeholder="Zip Code"
                onChange={this.handleChange}
              />
            </Box>
            {/* City input */}
            <Box margin={1}>
              <TextField
                id="city"
                type="text"
                name="city"
                placeholder="City of Residance"
                onChange={this.handleChange}
              />
            </Box>
            {/* Confirmation email input */}
            <Box margin={1}>
              <TextField
                id="confirmationEmail"
                type="email"
                name="confirmationEmail"
                placeholder="Confirmation Email Address"
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
export default Checkout;
