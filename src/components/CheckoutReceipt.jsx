import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaBus, FaMapMarkerAlt, FaChair, FaMoneyBillWave } from 'react-icons/fa'

const CheckoutReceipt = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { bus, selectedSeats } = location.state || {}

  if (!bus || !selectedSeats) {
    return <div>No booking information available.</div>
  }

  const totalPrice = selectedSeats.length * bus.price

  const handleProceedToCheckout = () => {
    // Here you would typically integrate with a payment gateway
    // For this example, we'll simulate a successful payment and booking
    const bookingDetails = {
      busId: bus.id,
      seats: selectedSeats,
      totalPrice: totalPrice,
      // Add any other relevant booking details
    }

    // Simulate API call to book seats
    setTimeout(() => {
      // Navigate to a confirmation page or back to seat selection with updated seat availability
      navigate(`/select-seat/${bus.id}`, { 
        state: { 
          bookingConfirmed: true, 
          bookedSeats: selectedSeats 
        }
      })
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-black text-white rounded-sm shadow-md overflow-hidden border border-zinc-800">
        <div className="bg-white text-black p-4">
          <h1 className="text-2xl font-bold">Booking Summary</h1>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <FaBus className="inline-block mr-2" />
            <span className="font-semibold">{bus.title}</span>
          </div>
          <div className="mb-4">
            <FaMapMarkerAlt className="inline-block mr-2" />
            <span>{bus.origin} to {bus.destination}</span>
          </div>
          <div className="mb-4">
            <FaChair className="inline-block mr-2" />
            <span>Selected Seats: {selectedSeats.join(', ')}</span>
          </div>
          <div className="mb-4">
            <FaMoneyBillWave className="inline-block mr-2" />
            <span className="font-semibold">Total Price: ${totalPrice}</span>
          </div>
          <button
            className="w-full bg-white text-black px-4 py-2 rounded-sm text-lg hover:bg-zinc-200 transition duration-300 mt-4"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutReceipt