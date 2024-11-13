import React from "react";
import { Order } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <Card className="border-2 rounded-md shadow-md">
      <CardHeader>
        <CardTitle>Order #{order.id}</CardTitle>
        <div className="flex gap-4">
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              order.status === "Delivered"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {order.status}
          </span>
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              order.status === "Delivered"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {order.payment_status}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {order.items.map((item, index) => (
              <CarouselItem key={index}>
                <Link to={`/products/${item.product.slug}`}>
                  <div className="flex flex-col items-center">
                    <img
                      src={item.product.images[0]?.image}
                      alt={item.product.name}
                      className="h-40 w-40 object-cover rounded-md"
                    />
                    <div className="mt-2 text-center">
                      <p className="font-medium text-sm uppercase">
                        {item.product.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm">
                          <span className="text-sm flex gap-2">
                            NPR
                            <span
                              className={`${
                                item.product?.is_sale
                                  ? "line-through text-red-500"
                                  : ""
                              }`}
                            >
                              {item.product?.price}
                            </span>
                            <span className="text-green-500">
                              {item.product?.is_sale
                                ? item.product.sale_price
                                : ""}
                            </span>
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
      <div className="p-4 flex justify-between items-center border-t">
        <p className="font-medium">
          Total: NPR {order.total_amount.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          {new Date(order.created_at).toLocaleDateString()}
        </p>
      </div>
    </Card>
  );
};

export default OrderCard;
