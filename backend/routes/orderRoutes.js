import express from "express";
import expressAsyncHandler from "express-async-handler";
import { Order } from "../models/orderModel";
import { Product } from "../models/productModel";
import { isAdmin, isAuth } from "../utils";
import _ from "lodash";
const orderRouter = express();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;
    const newOrder = new Order({
      orderItems: orderItems.map((prod) => ({
        ...prod.item,
        quantity: prod.itemQuantity,
        product: prod.item._id,
        seller: prod.item.user,
      })),
      shippingAddress,
      paymentMethod,
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: req.user.data._id,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  })
);

orderRouter.get(
  "/summary",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const totalProducts = await Product.find({ user: req.user.data._id });
    const productCategories = _.groupBy(totalProducts, "category");
    const orders = await Order.find({});
    const totalOrders = orders.map((order) => {
      const filteredItems = order.orderItems.filter(
        (item) => item.seller == req.user.data._id
      );
      const totalAmount = filteredItems.reduce(
        (a, o) => a + o.price * o.quantity,
        0
      );
      return {
        orderItems: filteredItems,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        isPaid: order.isPaid,
        paidAt: order.paidAt,
        isDelivered: order.isDelivered,
        deliveredAt: order.deliveredAt,
        totalPrice: totalAmount,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        user: order.user,
        paymentResult: order.paymentResult,
        _id: order._id,
      };
    });
    const totalSales = totalOrders.reduce((a, o) => a + o.totalPrice, 0);
    const day = item => item.createdAt.toISOString().substring(0,10);
    const dailyOrders = _.chain(totalOrders)
      .groupBy(day)
      .map((value, key) => {
        return {
        date: key,
        sales: value.reduce((a, o) => a + o.totalPrice, 0)
      }
    })
      .value();
    res.send({ totalOrders, totalSales, totalProducts, productCategories,dailyOrders });
  })
);

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.data._id });
    res.send(orders);
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
