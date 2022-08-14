import express from 'express'
import { Order } from '../models/orderModel';
import Stripe from 'stripe';
import { isAuth } from '../utils';
import { Product } from '../models/productModel';
const stripe = new Stripe('sk_test_51KuebKSJLbL4xErsCA0xtWb5q8by5WaYAWmlVLmo67yJh2ByySdtiP6awKY3HifcFeQVpUcXlMy8KmaI3B1FvtO400SNGTxv3y');
const paymentRouter = express()

paymentRouter.post('/create-checkout-session', isAuth, async (req, res) => {
    const { orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    shippingPrice,
    taxPrice,
    totalPrice } = req.body
    const newOrder = new Order({
        orderItems: orderItems.map(prod=>({...prod.item, quantity:prod.itemQuantity, product:prod.item._id})),
        shippingAddress,
        paymentMethod,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: req.user.data._id
    })
    const order = await newOrder.save()
    const product = await stripe.products.create({
        name: order._id.toString(),
      });
    const price = await stripe.prices.create({
        unit_amount: totalPrice*100,
        currency: 'inr',
        product: product.id,
      });
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      // success_url: `http://localhost:3000/order/${order._id}/success?session_id={CHECKOUT_SESSION_ID}`,
      // cancel_url: 'http://localhost:3000/order',
      success_url: `https://mern-redux-ecommerce-website.herokuapp.com/order/${order._id}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: 'https://mern-redux-ecommerce-website.herokuapp.com/order',
    });
  
    res.send({url:session.url});
  });

  paymentRouter.post('/success',isAuth, async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.body.session_id);
    const today = Date.now()
    const order = await Order.findById(req.body.orderId)
    const updatedOrder = await order.updateOne({
        paymentResult: {
            id: session.id,
            status: session.payment_status,
            update_time: today,
            username: req.user.data.username
          },
        isPaid: true,
        paidAt: today,
    })
    const products = order.orderItems
    products.forEach( async(doc) => {
      const prod = await Product.findById(doc.product)
      await prod.updateOne({
        countInStock: prod.countInStock - doc.quantity
      })
    })

    const updateProducts = await Product.find({})

    if(order){
        res.send({updatedOrder,updateProducts})
    }else{
        res.status(404).send({message:'Order does not exist'})
    }
  });


export default paymentRouter