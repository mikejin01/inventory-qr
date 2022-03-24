import { loginStart, loginSuccess, loginFailure, logout} from "./userRedux"
import { publicRequest } from '../requestMethods';
import { useSelector } from "react-redux"

export const login = async(dispatch, user)=>{
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("auth/login", user)
		dispatch(loginSuccess(res.data)); 
		console.log(res.data);
		console.log("loggedin!!!!!!!!!!");
		//console.log(useSelector((state)=>state.user.currentUser));
	} catch (err) {
		dispatch(loginFailure());
	}
}

export const newProduct = async(dispatch, newProduct)=>{
	dispatch(loginStart());
}