import { useState } from 'react';
import api from '../utils/api';

const PaymentButton = ({ amount, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/orders/createPayment', { amount });
      
      // Razorpay options (production)
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: data.order.amount,
        currency: "INR",
        order_id: data.order.id,
        name: "AquaStore",
        description: "Aquarium Products",
        handler: function (response) {
          // Verify payment
          api.post('/orders/verifyPayment', response)
            .then(() => onSuccess())
            .catch(() => alert('Payment verification failed'));
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com"
        },
        theme: {
          color: "#3b82f6"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment}
      disabled={loading}
      className="btn w-full py-3 text-lg font-semibold"
    >
      {loading ? 'Processing...' : `Pay ₹${amount.toLocaleString()}`}
    </button>
  );
};

export default PaymentButton;
