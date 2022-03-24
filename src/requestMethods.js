import axios from "axios";
import { useSelector } from "react-redux"


const BASE_URL ="https://inventory-qr-api.herokuapp.com/api/";
//const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzhhOTgyZTI4NjY4MTgxZmM5MDc0YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0Nzg4MDY5NiwiZXhwIjoxNjQ4MTM5ODk2fQ.yBAYlkWiFqrGOXWrqd2trJI6sLsQg9Z7TvH4ZC5YhO4";

//const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

/*const user = useSelector((state)=>state.user.currentUser);
const TOKEN = user.accessToken;*/

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	//header:{token:`Bearer ${TOKEN}`},
	headers: {
		token:`Bearer ${TOKEN}`
	}
});