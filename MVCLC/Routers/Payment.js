const express = require('express');
const paymentRouter  = express.Router();
var mongoose = require("mongoose");
const checkAuth = require('../MiddleWares/CheckAuth');
const axios = require('axios');

const Personal = require('../Models/PersonModels');
const { none } = require('../MiddleWares/multr');

paymentRouter.post('/initiate-payment', async (req, res) => {
    try {
      
      const { amount, currency, customerName, email, phone } = req.body;
    
    
     const paytabsPayload =  {
        profile_id: "105571",
        tran_type:  "sale",
        tran_class:  "ecom",
        cart_description: "Description of the items/services",
        cart_id: "1234",
        cart_currency:currency,
        cart_amount: amount,
        return: "none",
        customer_details: {
            name: customerName,
            email: email,
            street1: "404, 11th st",
            city: "Hyd",
            country: "India",
            phone:phone
          },
    
        card_details: {
            pan:  "5200000000000007",
            expiry_month:  12,
            expiry_year:  25,
            cvv: "977"
        }
      }
   
      const paytabsResponse = await axios.post("https://secure.paytabs.sa/payment/request      ", paytabsPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "SHJN6ZGHB9-JHGWHNNHGJ-W2K2W9LN2J",
        },
      });
  
    //   console.error('PayTabs Response:', paytabsResponse.data);
      // Send the PayTabs response back to the client
      res.json(paytabsResponse.data);
    } catch (error) {
        console.log(error);
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = paymentRouter;