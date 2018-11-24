// src/components/Feed.js
import React, { Component } from "react";
import { Media, Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";

import "../App.css";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemId: null
    };
  }

  componentDidMount() {
    this.setState({ items: this.props.items });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.items });
  }

  onItemClick(item) {
    let itemId;
    switch (item.wrapperType) {
      case "track":
        itemId = item.trackId;
        break;
      case "audiobook":
        itemId = item.collectionId;
        break;
      default:
        break;
    }
    this.setState({ itemId });
  }

  render() {
    // check if we have a selected item
    if (this.state.itemId) {
      let redirectUrl = `/item/${this.state.itemId}`;
      return <Redirect to={redirectUrl} />;
    }

    let searchResults = this.state.items.map(item => {
      let title;
      switch (item.wrapperType) {
        case "track":
          title = item.trackName;
          break;
        case "audiobook":
          title = item.collectionName;
          break;
        default:
          break;
      }

      let artist = item.artistName;
      let type = item.wrapperType;
      return (
        <Col
          sm="4"
          xs="12"
          key={item.trackId ? item.trackId : item.collectionId}
        >
          <div className="searchResult" onClick={e => this.onItemClick(item)}>
            <div>
              <Media>
                <Media left className="resultThumbnail">
                  <img src={item.artworkUrl100} alt="" />
                </Media>
                <Media body>
                  <Media heading>
                    {title}
                    <div className="details">
                      <div className="artist-name">by {artist}</div>
                      {type}
                    </div>
                  </Media>
                </Media>
              </Media>
            </div>
          </div>
        </Col>
      );
    });

    return (
      <Container>
        <Row>{searchResults}</Row>
      </Container>
    );
  }
}
export default SearchResults;
