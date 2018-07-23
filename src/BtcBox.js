import React, { Component } from 'react';
import './BtcBox.css';
import axios from 'axios';

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

  refreshPricing() {
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
            Stuff is broken
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
      <div className="BtcBox-container">
        <h1 className="BtcBox-titleTime">
          {comic.time}
        </h1>
        <button type="button" onClick={this.refreshPricing.bind(this)} className="BtcBox-button">
        Refresh Pricing
        </button>
        <h1>USD</h1>
        <h1>GBP</h1>
        <h1>EUR</h1>
        <h2>Disclaimer</h2>
      </div>
    );
  }
}

export default BtcBox;