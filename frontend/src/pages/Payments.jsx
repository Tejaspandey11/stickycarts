import { useContext, useEffect, useState } from 'react';
import { paymentAPI } from '../api/payment.api';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentAPI.getUserPayments();
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payments-page">
      <div className="payments-container">
        <h1>My Payments</h1>

        {loading ? (
          <p>Loading payments...</p>
        ) : payments.length === 0 ? (
          <p>No payments yet</p>
        ) : (
          <div className="payments-table">
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Payer</th>
                  <th>Receiver</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment._id}>
                    <td>${payment.amount.toFixed(2)}</td>
                    <td>{payment.payer?.firstName} {payment.payer?.lastName}</td>
                    <td>{payment.receiver?.firstName} {payment.receiver?.lastName}</td>
                    <td className={`status-${payment.status}`}>{payment.status}</td>
                    <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
