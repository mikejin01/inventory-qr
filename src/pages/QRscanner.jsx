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

    /*const previewStyle = {
        height: 240,
        width: 320,
    }


    <div>
        <Button onClick={() => setSelfie(!selfie)}>
        <FlipCameraIos color="primary" fontSize="large" />
      </Button>

        <QrReader
          onError={handleError}
          onScan={handleScan}
          //facingMode={selfie ? "user" : "environment"}
          className="c-scanner__qr"
          constraints={
              {
                  video: {
                      facingMode: { exact: selfie ? "user" : "environment"}
                  }
              }
          }
        />



    */

  render() {
    return (
      



        <QrReader
            delay={this.state.delay}
            //style={previewStyle}
            style={{width: '100%'}}
            onError={this.handleError}
            onScan={this.handleScan}
            //facingMode: 'user'
            facingMode={'user'}
            constraints={
                  {
                      video: {
                          facingMode: {  "environment"}
                      }
                  }
              }
            //exact: selfie ? "user" :
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
