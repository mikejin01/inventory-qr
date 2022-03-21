import axios from "axios";

const BASE_URL ="https://inventory-qr-api.herokuapp.com/api/";
const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzhhOTgyZTI4NjY4MTgxZmM5MDc0YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0Nzg4MDY5NiwiZXhwIjoxNjQ4MTM5ODk2fQ.yBAYlkWiFqrGOXWrqd2trJI6sLsQg9Z7TvH4ZC5YhO4";

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	header:{token:`Bearer ${TOKEN}`}
});