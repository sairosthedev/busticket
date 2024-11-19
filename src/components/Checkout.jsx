import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCreditCard, FaMobile, FaMoneyBill } from 'react-icons/fa';
import { SiVisa, SiMastercard } from 'react-icons/si';

const paymentMethods = [
  {
    id: 'mobile_money',
    label: 'Mobile Money',
    icon: FaMobile,
    options: ['EcoCash', 'OneMoney', 'Innbucks']
  },
  {
    id: 'cards',
    label: 'Cards',
    icon: FaCreditCard,
    options: ['Visa', 'Mastercard']
  },
  {
    id: 'money_transfer',
    label: 'Money Transfer',
    icon: FaMoneyBill,
    options: ['Mukuru', 'Paynow', 'Sairos']
  }
];

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, selectedSeats } = location.state || {};
  const [activeMethod, setActiveMethod] = useState('mobile_money');
  const [selectedOption, setSelectedOption] = useState('EcoCash');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  if (!bus || !selectedSeats) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20 text-white text-center">
        <h1 className="text-2xl">Invalid checkout session</h1>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-white text-black px-4 py-2 rounded-sm hover:bg-zinc-200"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const calculateTotal = () => {
    const regularSeatsPrice = selectedSeats.filter(seat => !bus.premiumSeats?.includes(seat)).length * bus.price;
    const premiumSeatsPrice = selectedSeats.filter(seat => bus.premiumSeats?.includes(seat)).length * (bus.price * 1.3);
    return (regularSeatsPrice + premiumSeatsPrice).toFixed(2);
  };

  const handlePayment = () => {
    // Here you would integrate with the selected payment provider
    alert(`Processing payment with ${selectedOption}`);
    navigate(`/bus/${bus.id}`, {
      state: {
        bookingConfirmed: true,
        bookedSeats: selectedSeats
      }
    });
  };

  const renderPaymentForm = () => {
    switch (activeMethod) {
      case 'mobile_money':
        return (
          <div className="space-y-4">
            <div className="flex gap-4 mb-6">
              {paymentMethods.find(m => m.id === 'mobile_money').options.map(option => (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={`flex-1 py-2 px-4 rounded-sm border ${
                    selectedOption === option
                      ? 'border-white bg-white text-black'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <label className="block text-zinc-400">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="07X XXX XXXX"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-sm text-white"
              />
            </div>
          </div>
        );

      case 'cards':
        return (
          <div className="space-y-4">
            <div className="flex gap-4 mb-6">
              {paymentMethods.find(m => m.id === 'cards').options.map(option => (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={`flex-1 py-2 px-4 rounded-sm border flex items-center justify-center gap-2 ${
                    selectedOption === option
                      ? 'border-white bg-white text-black'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  {option === 'Visa' ? <SiVisa className="text-xl" /> : <SiMastercard className="text-xl" />}
                  {option}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <label className="block text-zinc-400">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-sm text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-zinc-400">Expiry Date</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-sm text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-zinc-400">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-sm text-white"
                />
              </div>
            </div>
          </div>
        );

      case 'money_transfer':
        return (
          <div className="space-y-4">
            <div className="flex gap-4 mb-6">
              {paymentMethods.find(m => m.id === 'money_transfer').options.map(option => (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={`flex-1 py-2 px-4 rounded-sm border ${
                    selectedOption === option
                      ? 'border-white bg-white text-black'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <label className="block text-zinc-400">Account/Reference Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter your reference number"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-sm text-white"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-white mb-6 hover:text-zinc-300"
      >
        <FaArrowLeft className="mr-2" /> Back to seat selection
      </button>

      <div className="max-w-2xl mx-auto bg-zinc-900 rounded-sm border border-zinc-800 p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">Checkout</h1>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-zinc-400">
            <span>Bus:</span>
            <span>{bus.title}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Route:</span>
            <span>{bus.route[0]} → {bus.route[1]}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Selected Seats:</span>
            <span>{selectedSeats.join(', ')}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Number of Seats:</span>
            <span>{selectedSeats.length}</span>
          </div>
          <div className="border-t border-zinc-800 pt-4">
            <div className="flex justify-between font-semibold text-white">
              <span>Total Amount:</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          {paymentMethods.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveMethod(id);
                setSelectedOption(paymentMethods.find(m => m.id === id).options[0]);
              }}
              className={`flex-1 py-3 px-4 rounded-sm border flex items-center justify-center gap-2 ${
                activeMethod === id
                  ? 'border-white bg-white text-black'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
              }`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>

        {renderPaymentForm()}

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-white text-black px-6 py-3 rounded-sm text-lg hover:bg-zinc-200 transition duration-300"
        >
          Pay ${calculateTotal()} with {selectedOption}
        </button>
      </div>
    </div>
  );
};

export default Checkout; 