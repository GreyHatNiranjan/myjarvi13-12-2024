'use client';

import { useState,useEffect } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'

export default function PaymentPage() {
 
  const searchParams = useSearchParams()


const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', amount: '' });
  const [paymentResponse, setPaymentResponse] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/payment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setPaymentResponse(data);
  };
  useEffect(() => {
     const oid = searchParams.get('oid')
     setOrderId(oid)
    //  console.log(oid);
     
  }, []);
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-gray-800 px-4 md:px-8 lg:px-16">
        <div className="text-center ">
          <div className='mb-6 flex justify-center'>

            <span>🎉</span>
            <h1 className=" md:text-4xl max-md:text-xl font-bold  text-green-600">
              Test Order Placed Successfully
            </h1>
            <span>🎉</span>
          </div>
          <p className="text-base md:text-lg text-gray-700 mb-8">
            Thank you for placing your test order! You will receive a confirmation shortly.
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-8">
            Order ID : <span className='text-lg font-bold'>{orderId}</span> 
          </p>
          <Link
            className="text-base md:text-lg text-blue-600 hover:text-blue-800 underline transition-all duration-200"
            href="/"
          >
            Go to Homepage
          </Link>
        </div>
        <div className="mt-16 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-yellow-500">Payment Page</h2>
          <p className="text-lg md:text-xl text-orange-500 animate-bounce">
            🚧 Under Construction 🚧
          </p>
        </div>
      </div>


      {/* <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Payment Page</h1>
        <p className="text-2xl text-orange-500">🚧 Under Construction 🚧</p>
        <Link className='text-blue-500 mt-2' href="/">Go to Homepage</Link>
      </div> */}


      {/* <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-md">
        <h1 className="text-xl font-semibold mb-4">Make a Payment</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border rounded-md focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border rounded-md focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Amount (INR)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border rounded-md focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Pay Now
          </button>
        </form>
        {paymentResponse && (
          <div className="mt-4 p-4 bg-green-100 text-green-700">
            <h2>Payment Response</h2>
            <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
          </div>
        )}
      </div> */}
    </div>
  );
}
