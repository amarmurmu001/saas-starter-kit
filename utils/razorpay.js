import Razorpay from 'razorpay';

const razorpayInstance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
});

export const createOrder = async (amount) => {
  const options = {
    amount: amount, 
    currency: 'INR',
    receipt: `receipt_${Math.random()}`,
    payment_capture: 1,
  };
  try {
    const order = await razorpayInstance.orders.create(options);
    return order;
  } catch (error) {
    throw error;
  }
};
