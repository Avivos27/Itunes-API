import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

import "../App.css";

const API_URL = "http://localhost:5000/api/";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      item: null
    };
  }

  componentDidMount() {
    let url = window.location.href;
    let split = url.split("/");
    let id = split[split.length - 1];
    this.setState({ id });
    axios.get(`${API_URL}itunes/item/${id}`).then(res => {
      this.setState({ item: res.data });
    });
  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  render() {
    if (!this.state.item) return <div />;
    let item = this.state.item;
    let itemName, itemKind;
    switch (item.wrapperType) {
      case "audiobook":
        itemName = item.collectionName;
        itemKind = "(audio book)";
        break;

      default:
        itemName = item.trackName;
        itemKind = `(${item.kind})`;
        break;
    }

    let mediaPlayer;

    if (item.kind === "music-video")
      mediaPlayer = <ReactPlayer url={item.previewUrl} controls />;
    else mediaPlayer = <audio ref="audio_tag" src={item.previewUrl} controls />;

    return (
      <div id="itemComponent">
        <div className="heading">
          <div className="itemImage">
            <img src={item.artworkUrl100} alt="" />
          </div>
          <div className="itemTitle">
            {itemName} {itemKind} by {item.artistName}
          </div>
        </div>
        <div className="itemDetails">
          <ul>
            <li>Appears on: {item.collectionName}</li>
            <li>Country: {item.country}</li>
            <li>Genre: {item.primaryGenreName}</li>
            <li>Release Date: {new Date(item.releaseDate).toLocaleString()}</li>
            <li>
              Length: {this.millisToMinutesAndSeconds(item.trackTimeMillis)}{" "}
              minutes
            </li>
          </ul>
          {mediaPlayer}
        </div>
      </div>
    );
  }
}
export default Item;
