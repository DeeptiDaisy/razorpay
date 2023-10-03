const express = require('express');
const path = require('path');
const Razorpay = require('razorpay');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/',(req, res)=>{
//     res.send('Hi');
// });

app.post("/order", async (req, res)=>{
const amount = req.body.amount
var instance = new Razorpay({
     key_id: 'rzp_test_ISouoZTcPU0j35', 
     key_secret: 'DPmvAyrDX88lRCV6IJQH0IYa'
     //THIS  needs to go in .envk
     })

var options = {
    amount: amount* 100, // amount in the smallest currency unit\
    currency: "INR",
    receipt: "receipt#1",
};
//  instance.orders.create(options, function(err, order){
//  console.log(order); 
// });
const myOrder = await instance.orders.create(options)

res.status(200).json({
    success: true,
    amount,
    order: myOrder
})
});

app.listen(4000, ()=> console.log(`server is running at port 4000..`));



