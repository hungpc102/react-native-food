export interface Order {
    ORDER_NAME: string;
    ORDER_ID: number;
    ORDER_STATUS: string;
    updatedAt:Date,
    TOTAL_INVOICE:number,
    SHIPPING_FEE:number,
    TOTAL_PAYMENT:number,
    ADDRESS: string,
    USER_ID:number
  }
  
export  interface OrderDetail {
    ORDER_ID: number;
    FOOD_ID: number;
    UNIT_QUANTITY: number;
    UNIT_PRICE: number;
    ORDER_DETAIL_ID: number;
  }

export interface Food {
    FOOD_NAME: string
    FOOD_ID:number
  }

export interface User{
    USER_NAME:string,
    USER_PHONE:string,
    USER_EMAIL:string,
    USER_ID:number
  }