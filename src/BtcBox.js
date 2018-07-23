import React, { Component } from 'react';
import './BtcBox.css';
import axios from 'axios';

function randomNumber(lower, upper) {
  const min = Math.ceil(lower);
  const max = Math.floor(upper);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class BtcBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comic: {},
      success: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchRandomComic();
  }

  fetchRandomComic() {
    const number = randomNumber(1, 2000);
    const url = `/comic/${number}`;
    axios.get(url).then((response) => {
      this.setState({
        comic: response.data,
        success: true,
      });
    }).catch((error) => {
      this.setState({
        success: false,
        error,
      });
    });
  }

  render() {
    const { success, error, comic } = this.state;
    if (error) {
      return (
        <p>
           Stuff done broke
        </p>
      );
    }
    if (!success) {
      return (
        <h1>
            Loading...
        </h1>
      );
    }

    return (
      <div className="ComicBox-container">
        <h1 className="ComicBox-title">
          {comic.safe_title}
        </h1>
        <button type="button" onClick={this.fetchRandomComic.bind(this)} className="ComicBox-button">
        Random Comic
        </button>
        <img src={comic.img} alt={comic.alt} className="ComicBox-image" />
      </div>
    );
  }
}

export default BtcBox;