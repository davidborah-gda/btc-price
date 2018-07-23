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
    this.refreshPricing();
  }

  refreshPricing() {
  
    const url = `/comic/`;
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
          {comic.time.updated}
        </h1>
        <button type="button" onClick={this.refreshPricing.bind(this)} className="BtcBox-button">
        Refresh Pricing
        </button>
        <h1>{comic.bpi.USD.code}</h1>
        <h2>{comic.bpi.USD.rate}</h2>
        <h1>{comic.bpi.GBP.code}</h1>
        <h2>{comic.bpi.GBP.rate}</h2>
        <h1>{comic.bpi.EUR.code}</h1>
        <h2>{comic.bpi.EUR.rate}</h2>
        <p>{comic.disclaimer}</p>
      </div>
    );
  }
}

export default BtcBox;