const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_KEY);

const payment = async(req, res) => {
    const {userId, items} = req.body;
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map(item => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: "https://food-delivery-application-neon.vercel.app/orderplaced",
            cancel_url: "https://food-delivery-application-neon.vercel.app/",
        });
        res.json({success: true,msg:"Payment success", sessionUrl: session.url});
    }
    catch(err){
        console.log(err);
        res.json({success: false, msg: "Error Occured in payment"});
    }
}

module.exports = payment;