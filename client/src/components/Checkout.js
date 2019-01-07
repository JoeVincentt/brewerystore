import React, { Component } from "react";
//prettier-ignore
import { Container, Box, Heading, TextField, Button, Text, Modal, Spinner } from "gestalt";
//prettier-ignore
import {Elements, StripeProvider, CardElement, injectStripe} from 'react-stripe-elements';
import ToastMessage from "./ToastMessage";
import { getCart, calculateTotalPrice } from "../utils/index";

class _CheckoutForm extends Component {
  state = {
    cartItems: [],
    address: "",
    zip: "",
    city: "",
    confirmationEmail: "",
    toast: false,
    toastMessage: "",
    orderProccessing: false,
    madal: false
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

    this.setState({ modal: true });
  };

  handleSubmitOrder = () => {};

  redirectUser = path => this.props.history.push(path);

  isFormEmpty = ({ address, zip, confirmationEmail, city }) => {
    return !address || !zip || !confirmationEmail || !city;
  };

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({ toast: false, toastMessage: "" }), 3000);
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  render() {
    const {
      toast,
      toastMessage,
      cartItems,
      modal,
      orderProccessing
    } = this.state;

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

                {/*Credit Card Element */}

                <CardElement
                  id="stripe__input"
                  onReady={input => input.focus()}
                />

                <button id="stripe__button" type="submit">
                  Submit
                </button>
              </form>
            </React.Fragment>
          ) : (
            //Default text if empty cart
            <Box padding={4}>
              <Heading align="center" color="watermelon" size="xs">
                Your Cart is Empty
              </Heading>
              <Text align="center" itaklic color="green">
                Add some brews!
              </Text>
            </Box>
          )}
        </Box>
        {/* Confirmation Modal */}
        {modal && (
          <ConfirmationModal
            orderProccessing={orderProccessing}
            cartItems={cartItems}
            closeModal={this.closeModal}
            handleSubmitOrder={this.handleSubmitOrder}
          />
        )}
        <ToastMessage show={toast} message={toastMessage} />
      </Container>
    );
  }
}

const ConfirmationModal = ({
  orderProccessing,
  cartItems,
  closeModal,
  handleSubmitOrder
}) => (
  <Modal
    accessibilityCloseLabel="close"
    accessibilityModalLabel="Confirm Your Order"
    heading="Confirm Your Order"
    onDismiss={closeModal}
    footer={
      <Box
        display="flex"
        marginRight={-1}
        marginLeft={-1}
        justifyContent="center"
      >
        <Box padding={1}>
          <Button
            size="lg"
            color="red"
            text="Submit"
            disabled={orderProccessing}
            onClick={handleSubmitOrder}
          />
        </Box>
        <Box padding={1}>
          <Button
            size="lg"
            text="Cancel"
            disabled={orderProccessing}
            onClick={closeModal}
          />
        </Box>
      </Box>
    }
    role="alertdialog"
    size="sm"
  >
    {/* Order Summary */}

    {!orderProccessing && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        direction="column"
        padding={2}
        color="lightWash"
      >
        {cartItems.map(item => (
          <Box key={item._id} padding={1}>
            <Text size="lg" color="red">
              {item.name} x {item.quantity} -${item.quantity * item.price}
            </Text>
          </Box>
        ))}
        <Box paddingY={2}>
          <Text size="lg" bold>
            Total: {calculateTotalPrice(cartItems)}
          </Text>
        </Box>
      </Box>
    )}

    {/* Order Processing */}
    <Spinner
      show={orderProccessing}
      accessibilityLabel="Prder Processing Spinner"
    />
    {orderProccessing && (
      <Text align="center" italic>
        Submit Order...
      </Text>
    )}
  </Modal>
);

const CheckoutForm = injectStripe(_CheckoutForm);

const Checkout = () => (
  <StripeProvider apiKey="pk_test_pvQDEmbcFPYSRVxLVLK4LILi">
    <Elements>
      <CheckoutForm />
    </Elements>
  </StripeProvider>
);

export default Checkout;
