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

    const StockInButton = styled.button`
        width: 40%;
        border: none;
        padding: 15px 20px;
        background-color: green;
        color: white;
        cursor: pointer;
        margin-bottom: 10px;
    `
    const StockOutButton = styled.button`
        width: 40%;
        border: none;
        padding: 15px 20px;
        background-color: green;
        color: white;
        cursor: pointer;
        margin-bottom: 10px;
    `
    return (
        <div>
            <div style={{color: "red", width: 100%, backgroundColor: "green"}}>
                <h1 >Hello Style!</h1>
            </div>
            <QrReader style={{height: 500, width: 500, 
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
            <StockInButton onClick={handleClick}>
                Stock In
            </StockInButton>
            <StockOutButton onClick={handleDelete}>
                Stock Out
            </StockOutButton>
            
        </div>
    );
  }
}

export default QRScan;
