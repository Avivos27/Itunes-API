import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "axios";
import "../App.css";

const API_URL = "http://localhost:5000/api/";

class TopSearches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: []
    };
  }

  componentDidMount() {
    this.updateQueries();
  }

  updateQueries() {
    axios.get(`${API_URL}searchQueries`).then(res => {
      let queries = res.data;
      console.log("queries", queries);
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
      <UncontrolledDropdown>
        <DropdownToggle caret>Popular searches</DropdownToggle>
        <DropdownMenu>{dropDownItems}</DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}
export default TopSearches;
