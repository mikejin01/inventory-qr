import React from 'react'
import styled from "styled-components"
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
//import { QrCodeScannerOutlined  } from '@material-ui/icons'
import { mobile } from "../responsive"
import { DeveloperModeOutlined  } from '@material-ui/icons'
import QRCode from 'qrcode';
//import { QrReader } from 'react-qr-reader';
import { useState, useEffect } from 'react'
//import { BarCodeScanner } from 'expo-barcode-scanner';
import QRScan from './QRscanner'
//import { QrScan } from 'react-qr-reader'
import { QrReader } from 'react-qr-reader';
//import QrReader from 'react-qr-scanner'
import { Component } from 'react'



const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`
const Wrapper = styled.div`
	width: 50%;
	padding: 20px;
	background-color: white;
	${mobile({ width: "85%" })};
	display: flex;
	align-items: center;
	flex-direction: column;
`


const Button = styled.button`
	width: 50%;
	height: 20px;
	padding: 20px;
	flex: 1;
	border: none;
	background-color: teal;
	color: white;
`
/*	*/


/*
<script type="text/javascript">
function onScanSuccess(qrCodeMessage) {
    document.getElementById('result').innerHTML = '<span class="result">'+qrCodeMessage+'</span>';
}
function onScanError(errorMessage) {
  //handle scan error
}
var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanError);
</script>
*/

class Scanner extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }

    return(
      <div>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          facingMode={'rear'}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

const Home = () => {
	const [scanResultWebCam, setScanResultWebCam] =  useState('');
	const handleErrorWebCam = (error) => {
	    console.log(error);
	}
	const handleScanWebCam = (result) => {
	    if (result){
	        setScanResultWebCam(result);
	    }
	}

	

	/*const script = document.createElement("script");
	  script.src = "html5-qrcode.min.js";
	  script.async = true;
	  script.onload = () => this.scriptLoaded();

	  document.body.appendChild(script)


	<Scanner />
				



	Scanner!!!!!!!!!!
	  ;*/

	const [data, setData] = useState('No result');

	return(
		<Container>	
			<Wrapper>
				
				<Button>
					<DeveloperModeOutlined/>Scanner
				</Button>
				
		  		<QRScan />


		  		<h3>Qr Code Scan by Web Cam</h3>
	        <QrReader
	         delay={300}
	         style={{width: '100%'}}
	         facingMode={'rear'}
	         onError={handleErrorWebCam}
	         onScan={handleScanWebCam}
	        />
	        <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
	        <h1>Hello QR Code Reader</h1>

			</Wrapper>

		</Container>

		) 
}

export default  Home

