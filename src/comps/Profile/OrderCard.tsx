import React from "react";
import { Order } from "@/types/types";

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div className="border shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
        <div className="flex gap-4">
          <span
            className={`px-2 py-1 rounded ${
              order.status === "Delivered"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {order.status}
          </span>
          <span
            className={`px-2 py-1 rounded ${
              order.status === "Delivered"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {order.payment_status}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-medium mb-2">Items:</h4>
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <img
              src={item.product.images[0]?.image}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-sm">
                <span className="text-sm flex gap-2">
                  NPR
                  <span
                    className={`${
                      item.product?.is_sale ? "line-through text-red-500" : ""
                    }`}
                  >
                    {item.product?.price}
                  </span>
                  <span className="text-green-500">
                    {item.product?.is_sale ? item.product.sale_price : ""}
                  </span>
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <p className="mb-2 font-semibold">NPR. {order.total_amount}</p>
        <p className="text-sm text-gray-600 mb-2">
          Date: {new Date(order.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
