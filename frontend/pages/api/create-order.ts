import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount, currency = "INR", ...rest } = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    if (!amount) {
      return Response.json({ error: "Amount required" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency,
      receipt: "wd-brandz-" + Date.now(),
      notes: rest
    });

    return Response.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
