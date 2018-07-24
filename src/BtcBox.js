import React, { Component } from 'react';
import './BtcBox.css';
import axios from 'axios';

class BtcBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: {},
      success: false,
      error: null,
    };
  }

  componentDidMount() {
    this.refreshPricing();
  }

  refreshPricing() {
  
    const url = `/pricing/`;
    axios.get(url).then((response) => {
      this.setState({
        price: response.data,
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
    const { success, error, price } = this.state;
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
        <h3 className="BtcBox-titleTime">
          {price.time.updated}
        </h3>
        <button type="button" onClick={this.refreshPricing.bind(this)} className="BtcBox-button">
        Refresh Pricing
        </button>
        <div className="Fiat-container">
        <div className="USD">
        <h1>{price.bpi.USD.code}</h1>
        <h2>{price.bpi.USD.rate}</h2>
        </div>
        <div className="GBP">
        <h1>{price.bpi.GBP.code}</h1>
        <h2>{price.bpi.GBP.rate}</h2>
        </div>
        <div className="EUR">
        <h1>{price.bpi.EUR.code}</h1>
        <h2>{price.bpi.EUR.rate}</h2>
        </div>
        </div>
        <p className="disclaimer">{price.disclaimer}</p>
      </div>
    );
  }
}

export default BtcBox;