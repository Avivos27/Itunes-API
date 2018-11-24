import React, { Component } from "react";
import SearchResults from "./SearchResults";
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "axios";

import "../App.css";

const API_URL = "http://localhost:5000/api/";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      items: [],
      queries: []
    };
  }
  componentDidMount() {
    this.getPopularQueries();
  }

  updateQuery(input) {
    this.setState({ query: input.target.value });
  }

  handleKeyPress = event => {
    if (event.key === "Enter") this.getResults();
  };

  handleSearchButtonPress = event => {
    this.getResults();
  };

  getResults() {
    axios.get(`${API_URL}itunes/search/${this.state.query}`).then(res => {
      this.setState({ items: res.data.results });
      this.getPopularQueries();
    });
  }

  getPopularQueries() {
    axios.get(`${API_URL}searchQueries`).then(res => {
      let queries = res.data;
      this.setState({ queries });
    });
  }

  render() {
    let dropDownItems = this.state.queries.map(q => {
      if (q.query) {
        return <DropdownItem key={q._id}>{q.query}</DropdownItem>;
      } else return null;
    });
    return (
      <div id="searchComponent">
        <div>
          <h1 className="title">Itunes search</h1>
          <UncontrolledDropdown>
            <DropdownToggle caret>Popular searches</DropdownToggle>
            <DropdownMenu>{dropDownItems}</DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search itunes"
            ref={input => {
              this.textInput = input;
            }}
            value={this.state.query}
            onChange={input => this.updateQuery(input)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <InputGroupAddon addonType="append">
            <Button
              color="primary"
              onClick={this.handleSearchButtonPress.bind(this)}
            >
              Search
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <SearchResults items={this.state.items} />
      </div>
    );
  }
}
export default Search;
