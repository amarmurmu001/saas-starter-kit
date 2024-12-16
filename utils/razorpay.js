import Razorpay from 'razorpay';

const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_K4rTfT3JSI2JKu',
  key_secret: 'iu7Xp9Aad8mb0MhwrM52pELg',
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
