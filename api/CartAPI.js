import {apiBase} from "./API_BASE"

const cartAPI = apiBase + '/cart'

export const apiCreateCart = cartAPI + '/create-cart'

export const apiGetCart = cartAPI + '/get-cart/'

export const apiUpdateQuantity = cartAPI + '/update-quantity/'

export const apiDeleteAllCart = cartAPI + '/delete-cart/'




