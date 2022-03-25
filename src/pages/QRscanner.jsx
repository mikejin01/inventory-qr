import React from "react";
//import QrReader from "react-qr-scanner";
import { QrReader } from 'react-qr-reader';

class QRScan extends React.Component {
  state = {
    delay: 100,
    result: "No result"
  };

  handleScan = (data) => {
    this.setState({
      result: data
    });
  };

  handleError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <div>
        <QrReader
            delay={this.state.delay}
            //style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
            onResult={(result, error) => {
              if (!!result) {
                //setData(result?.text);
                this.setState({
                  result: result?.text
                });
              }

              if (!!error) {
                console.info(error);
              }
            }}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default QRScan;
