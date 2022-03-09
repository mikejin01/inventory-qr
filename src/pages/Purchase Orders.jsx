import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'


/*	<Announcement />
	<Navbar />
	<Newsletter />
	<Footer /> */
const PurchaseOrders = () => {
	return(
		<div>
			
			<Slider />
			<Categories />
			<Products />
			
		</div>
		) 
}

export default  PurchaseOrders

