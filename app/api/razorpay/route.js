import { createOrder } from '../../utils/razorpay';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount } = req.body;
    try {
      const order = await createOrder(amount);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
