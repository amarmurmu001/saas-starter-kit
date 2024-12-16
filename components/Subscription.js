import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Subscription({ plan }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        body: JSON.stringify({ amount: plan.amount }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      const options = {
        key: 'your-razorpay-key-id',
        amount: data.amount,
        currency: 'INR',
        name: 'SaaS Starter Kit',
        description: 'Subscription',
        order_id: data.id,
        handler: function (response) {
          alert('Payment successful!');
          router.push('/dashboard');
        },
        prefill: {
          name: 'User',
          email: 'user@example.com',
          contact: '9999999999',
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert('Payment failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">{plan.name} Subscription</h1>
      <p>{plan.description}</p>
      <p className="font-bold">₹{plan.amount}</p>
      <button className="btn btn-primary mt-4" onClick={handleSubscribe} disabled={loading}>
        {loading ? 'Processing...' : 'Subscribe Now'}
      </button>
    </div>
  );
}
