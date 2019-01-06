import React, { Component } from "react";
import Strapi from "strapi-sdk-javascript/build/main";
import {
  Container,
  Box,
  Heading,
  Card,
  Image,
  Text,
  SearchField,
  Icon,
  Button,
  Mask
} from "gestalt";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const apiUrl = process.env.API_URL || " http://localhost:1337";
const strapi = new Strapi(apiUrl);

class Brews extends Component {
  state = {
    brand: "",
    brews: [],
    searchTerm: "",
    loadingBrands: true,
    cartItems: []
  };

  async componentDidMount() {
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `
            query{
                brand(id:"${this.props.match.params.brandId}"){
                  _id
                  name
                  brews{
                          _id
                    name
                    description
                    price
                    image{
                      url
                    }
                  }
                }
              }`
        }
      });
      this.setState({
        brews: response.data.brand.brews,
        brand: response.data.brand.name,
        loadingBrands: false
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = e => {
    const { value } = e;
    this.setState({ searchTerm: value });
  };

  filteredBrews = ({ searchTerm, brews }) => {
    return brews.filter(brew => {
      return (
        brew.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brew.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  render() {
    const { brand, cartItems } = this.state;

    return (
      <Container>
        {/* Brand Search */}
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField
            id="searchField"
            accessibilityLabel="Brands Search Field"
            onChange={this.handleChange}
            placeholder="Search Brews..."
            value={this.state.searchTerm}
          />
          <Box margin={3}>
            <Icon
              icon="filter"
              color={this.state.searchTerm ? "orange" : "gray"}
              size={20}
              accessibilityLabel="Filter"
            />
          </Box>
        </Box>
        <Box
          marginTop={4}
          display="flex"
          justifyContent="center"
          alignItems="start"
          dangerouslySetInlineStyle={{
            __style: {
              flexWrap: "wrap-reverse"
            }
          }}
        >
          {/* Brews Section */}
          <Box display="flex" direction="column" alignItems="center">
            {/* Brews Heading */}
            <Box padding={2}>
              <Heading color="orchid">{brand}</Heading>
            </Box>

            {/* Brews */}
            <Box
              dangerouslySetInlineStyle={{
                __style: {
                  backgroundColor: "#ccdce0"
                }
              }}
              wrap
              shape="rounded"
              display="flex"
              justifyContent="center"
              padding={4}
            >
              {this.filteredBrews(this.state).map(brew => (
                <Box paddingY={4} width={210} margin={2} key={brew._id}>
                  <Card
                    image={
                      <Box height={250} width={200}>
                        <Image
                          fit="cover"
                          alt="Brand"
                          naturalHeight={1}
                          naturalWidth={1}
                          src={`${apiUrl}${brew.image.url}`}
                        />
                      </Box>
                    }
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                    >
                      <Box margin={2}>
                        <Text bold size="xl">
                          {brew.name}
                        </Text>
                      </Box>

                      <Text>{brew.description}</Text>
                      <Text color="orchid">${brew.price}</Text>
                      <Box margin={2}>
                        <Button color="blue" text="Add to Cart" />
                      </Box>
                    </Box>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>

          {/* User Cart */}
          <Box alignSelf="end" marginTop={2} marginLeft={8}>
            <Mask shape="rounded" wash>
              <Box
                display="flex"
                direction="column"
                alignItems="center"
                padding={2}
              >
                {/* User Cart Heading */}
                <Heading align="center" size="md">
                  Your Cart
                </Heading>
                <Text color="gray" italic>
                  {cartItems.length} items selected
                </Text>

                {/* Cart Items */}

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Box margin={2}>
                    {cartItems.length === 0 && (
                      <Text color="red">Please select some items</Text>
                    )}
                  </Box>
                  <Text size="lg">Total: $2.99</Text>
                  <Text>
                    <Link to="/checkout">Checkout</Link>
                  </Text>
                </Box>
              </Box>
            </Mask>
          </Box>
        </Box>

        {/* Loader Here */}
        {this.state.loadingBrands ? <Loader /> : null}
      </Container>
    );
  }
}
export default Brews;
