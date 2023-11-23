import axios from "axios";
import { getUserIdToStorage } from "../../utils/TokenStorage";
import { apiCreateOrder } from "../../api/OrderAPI";
import { getAccessTokenFromStorage } from "../../utils/TokenStorage";
import { handleTokenRefresh } from "../jwtService/jwtServices";

export const createOrder = async (
  address: string,
  totalPrice: number,
  shipPrice: number,
  orderName: string,
  totalPayment:number
) => {
  let callCount = 0;

  const createOrderInternal = async () => {
    try {
      if (callCount >= 2) {
        throw new Error("Đăng nhập hết hạn. Vui lòng đăng nhập lại");
      }

      callCount++;
      const user_id = await getUserIdToStorage();

      if (address === "") {
        alert("Vui lòng điền địa chỉ nhận hàng");
        return;
      }

      const order = {
        USER_ID: user_id,
        ADDRESS: address,
        TOTAL_INVOICE: totalPrice,
        SHIPPING_FEE: shipPrice,
        ORDER_NAME: orderName,
        TOTAL_PAYMENT: totalPayment
      };

      const accessToken = await getAccessTokenFromStorage();

      const response = await axios.post(apiCreateOrder, order, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === 401) {
        handleTokenRefresh();
        await createOrderInternal();
      } else {
        callCount = 0;
        return response.data;
      }
    } catch (error:any) {
      if (error.response && error.response.status === 401) {
        handleTokenRefresh();
        await createOrderInternal();
      } else {
        console.log(error.message);
        throw new Error("Lỗi khi tạo order");
      }
    }
  };

  return createOrderInternal();
};
