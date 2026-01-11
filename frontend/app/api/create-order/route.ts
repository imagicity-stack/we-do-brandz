import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = "USD", receipt, notes = {} } = body ?? {};

    if (typeof amount !== "number" || Number.isNaN(amount)) {
      return NextResponse.json({ error: "A numeric amount is required" }, { status: 400 });
    }

    const publicKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const privateKeyId = process.env.RAZORPAY_KEY_ID;
    const privateKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!publicKey || !privateKeyId || !privateKeySecret) {
      return NextResponse.json(
        { error: "Razorpay environment variables are missing" },
        { status: 500 }
      );
    }

    const modeForKey = (key: string) => {
      if (key.startsWith("rzp_test_")) return "test" as const;
      if (key.startsWith("rzp_live_")) return "live" as const;
      return "unknown" as const;
    };

    const publicMode = modeForKey(publicKey);
    const privateMode = modeForKey(privateKeyId);

    if (publicMode !== "unknown" && privateMode !== "unknown" && publicMode !== privateMode) {
      return NextResponse.json(
        { error: "Razorpay keys must use the same mode (test or live)." },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: privateKeyId,
      key_secret: privateKeySecret
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency,
      receipt: receipt ?? `wd-brandz-${Date.now()}`,
      notes
    });

    console.log("order created:", order);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: publicKey
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
