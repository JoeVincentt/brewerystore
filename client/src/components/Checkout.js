import React, { Component } from "react";
import { Container, Box, Heading, TextField, Button, Text } from "gestalt";
import ToastMessage from "./ToastMessage";
import { getCart, calculateTotalPrice } from "../utils/index";

class Checkout extends Component {
  state = {
    cartItems: [],
    address: "",
    zip: "",
    city: "",
    confirmationEmail: "",
    toast: false,
    toastMessage: ""
  };

  componentDidMount() {
    this.setState({ cartItems: getCart() });
  }

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
    const { toast, toastMessage, cartItems } = this.state;

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
          alignItems="center"
          direction="column"
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

          {cartItems.length > 0 ? (
            <React.Fragment>
              {/* User Cart */}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                direction="column"
                marginTop={2}
                marginBottom={6}
              >
                <Text color="darkGray" italic>
                  {cartItems.length} Items for Checkout
                </Text>
                <Box padding={2}>
                  {cartItems.map(item => (
                    <Box key={item._id} padding={1}>
                      <Text color="midnight">
                        {item.name} x {item.quantity} - $
                        {item.quantity * item.price}
                      </Text>
                    </Box>
                  ))}
                </Box>
                <Text bold>Total Amount: {calculateTotalPrice(cartItems)}</Text>
              </Box>

              {/* Checkout Form */}
              <form
                style={{
                  display: "inlineBlock",
                  textAlign: "center",
                  maxWidth: 450
                }}
                onSubmit={this.handleConfirmOrder}
              >
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
            </React.Fragment>
          ) : (
            //Default text if empty cart
            <Box color="darkWash" shape="rounded" padding={4}>
              <Heading align="center" color="watermelon" size="xs">
                Your Cart is Empty
              </Heading>
              <Text align="center" itaklic color="green">
                Add some brews!
              </Text>
            </Box>
          )}
        </Box>
        <ToastMessage show={toast} message={toastMessage} />
      </Container>
    );
  }
}
export default Checkout;
