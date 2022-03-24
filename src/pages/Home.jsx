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
import { QrReader } from 'react-qr-reader';
import { useState, useEffect } from 'react'

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
/*	<Announcement />
	<Navbar />
	<Newsletter />
	<Footer /> 

<Categories />
			<Products />

	*/
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
	return(
		<Container>	
			<Wrapper>

			<Button>
				<DeveloperModeOutlined/>Scanner
			</Button>

			<h3>Qr Code Scan by Web Cam</h3>
             <QrReader
             delay={300}
             style={{width: '100%'}}
             onError={handleErrorWebCam}
             onScan={handleScanWebCam}
             />
             <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>

			</Wrapper>

		</Container>

		) 
}

export default  Home

