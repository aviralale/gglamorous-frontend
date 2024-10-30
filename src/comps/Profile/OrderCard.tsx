import React from "react";
import { Order } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div className="border aspect-[3/4] p-4 flex flex-col justify-between">
      <div className="flex justify-between items-center ">
        <h3 className="text-lg uppercase">order #{order.id}</h3>
        <div className="flex gap-4">
          <span
            className={`px-2 py-1 text-xs rounded ${
              order.status === "Delivered"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {order.status}
          </span>
          <span
            className={`px-2 py-1 text-xs rounded ${
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
        <div className="flex">
          <Carousel className="w-full max-w-xs">
            {/* {order.items.map((item, index) => ( */}
            <CarouselContent>
              {order.items.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="rounded-none shadow-none">
                      <Link to={`/products/${item.product.slug}`}>
                        <CardContent className="flex aspect-square flex-col items-center justify-center p-6">
                          <img
                            src={item.product.images[0]?.image}
                            alt={item.product.name}
                            className="h-60 aspect-square object-cover rounded"
                          />
                          <div className="w-full flex flex-col items-center uppercase">
                            <p className="font-medium text-center">
                              {item.product.name}
                            </p>
                            <div className="flex gap-2">
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
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* // <div key={index} className="flex flex-col items-center w-full mb-2">
              // </div>
            ))} */}
          </Carousel>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <p className="">NPR. {order.total_amount}</p>
        <p className="text-sm text-gray-600 mb-2">
          Date: {new Date(order.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
