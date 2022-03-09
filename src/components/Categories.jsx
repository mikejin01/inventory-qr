import styled from "styled-components"
import { categories } from "../data"
import CategoryItem from "./CategoryItem"
import { mobile } from "../responsive"

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	/*padding: 20px;*/
	padding-top: 10px;
    padding-bottom: 10px;
	justify-content: space-between;
	/*background-color: coral;*/
	position: relative;
	overflow: hidden;
	${mobile({ padding: "0px", flexDirection: "column" })};
`

const Categories = () => {
	return(
		<Container>
			{categories.map(item=>(
				<CategoryItem item={item} key={item.id} />


			))}
		</Container>
		) 
}

export default  Categories

