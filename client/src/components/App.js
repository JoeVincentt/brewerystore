import React, { Component } from "react";

import {
  Container,
  Box,
  Heading,
  Card,
  Image,
  Text,
  SearchField,
  Icon
} from "gestalt";

import "./App.css";
import Strapi from "strapi-sdk-javascript/build/main";
import { Link } from "react-router-dom";

const apiUrl = process.env.API_URL || " http://localhost:1337";
const strapi = new Strapi(apiUrl);

class App extends Component {
  state = {
    brands: []
  };

  async componentDidMount() {
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `query{
          brands{
            _id
            name
            description
            image{
              url
            }
          }
        }
        `
        }
      });
      // console.log(response);
      this.setState({ brands: response.data.brands });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = e => {
    const { value } = e;
    this.setState({ searchTerm: value });
  };

  render() {
    const { brands } = this.state;
    return (
      <Container>
        {/* Brand Search */}
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField
            id="searchField"
            accessibilityLabel="Brands Search Field"
            onChange={this.handleChange}
            placeholder="Search Brands..."
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

        {/* Brands section */}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          {/* Brands header */}
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>
        </Box>

        {/* Brands */}
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#ccdce0"
            }
          }}
          shape="rounded"
          wrap
          display="flex"
          justifyContent="around"
        >
          {/* Displaying individual brand */}
          {brands.map(brand => (
            <Box paddingY={4} width={200} margin={2} key={brand._id}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      fit="cover"
                      alt="Brand"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiUrl}${brand.image.url}`}
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
                  <Text bold size="xl">
                    {brand.name}
                  </Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`/${brand._id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    );
  }
}

export default App;
