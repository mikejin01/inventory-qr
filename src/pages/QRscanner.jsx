import React from "react";
//import QrReader from "react-qr-scanner";
import { QrReader } from 'react-qr-reader';
import { useState, useEffect } from 'react'
import { publicRequest, userRequest } from '../requestMethods';
import { useDispatch, useSelector } from 'react-redux'


class QRScan extends React.Component {
  state = {
    delay: 100,
    result: "No result"
  };

  handleScan = (data) => {
    this.setState({
      result: data
    });
    alert("hi");
  };

    handleError = (err) => {
        console.error(err);
    };

    /*
            constraints={
                {
                    video: {
                          facingMode: { exact: selfie ? "user" : "environment"}
                    }
                }
            }

            exact: selfie ? "user" : 

    */

  render() {
    return (
        <div>

            <QrReader style={{height: 50, width: 500, 
                borderRadius: 10}}
                delay={this.state.delay}
                //style={{width: '100%'}}
                onError={this.handleError}
                onScan={this.handleScan}
                constraints={{ facingMode: 'environment' }}
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
