import React, { Component } from "react";
import { Box, Text, Heading, Image, Button } from "gestalt";
import { NavLink, withRouter } from "react-router-dom";
import { getToken, clearCart, clearToken } from "../utils/index";

class Navbar extends Component {
  handleSignOut = () => {
    clearCart();
    clearToken();
    this.props.history.push("/");
  };

  render() {
    return getToken() !== null ? (
      <AuthNavbar handleSignOut={this.handleSignOut} />
    ) : (
      <UnAuthNavbar />
    );
  }
}

const AuthNavbar = ({ handleSignOut }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="midnight"
    padding={1}
    shape="roundedBottom"
  >
    {/* Checkout Link */}
    <NavLink activeClassName="active" to="/checkout">
      <Text size="xl" color="white">
        Checkout
      </Text>
    </NavLink>

    {/* Title and Logo */}
    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" alignItems="center">
        <Box margin={2} height={50} width={50}>
          <Image
            alt="BrewInfo Logo"
            src="./icons/logo.svg"
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>

        <Heading size="xs" color="orange">
          BrewInfo
        </Heading>
      </Box>
    </NavLink>

    {/* Sign OUT Button */}
    <Button
      onClick={handleSignOut}
      color="transparent"
      text="Sign Out"
      inline
      size="md"
    />
  </Box>
);

const UnAuthNavbar = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="midnight"
    padding={1}
    shape="roundedBottom"
  >
    {/* Sign In Link */}
    <NavLink activeClassName="active" to="/signin">
      <Text size="xl" color="white">
        Sign In
      </Text>
    </NavLink>

    {/* Title and Logo */}
    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" alignItems="center">
        <Box margin={2} height={50} width={50}>
          <Image
            alt="BrewInfo Logo"
            src="./icons/logo.svg"
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>

        <Heading size="xs" color="orange">
          BrewInfo
        </Heading>
      </Box>
    </NavLink>

    {/* Sign Up Link */}
    <NavLink activeClassName="active" to="/signup">
      <Text size="xl" color="white">
        Sign Up
      </Text>
    </NavLink>
  </Box>
);

export default withRouter(Navbar);
