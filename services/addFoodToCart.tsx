import axios from "axios";
import { getUserIdToStorage } from "../utils/TokenStorage";
import {apiCreateCart} from '../api/CartAPI'

export const createCart = async(food_id:number, quantity:number)=>{
    const user_id = await getUserIdToStorage()
    const cart = {
        "USER_ID": user_id,
        "FOOD_ID": food_id,
        "QUANTITY": quantity
    }
    axios.post(apiCreateCart,cart)
    .then(response => {
        alert('Món ăn đã được thêm vào giỏ hàng');
    })
    .catch((error) => { 
        console.log(error.message)
        alert('Lỗi khi thêm món ăn vào giỏ hàng')
    })
}

