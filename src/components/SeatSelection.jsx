import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { FaChair, FaMoneyBillWave, FaArrowRight, FaToilet, FaSuitcase, FaDoorOpen } from 'react-icons/fa'
import { MdAirlineSeatReclineExtra } from 'react-icons/md'

const seatLegend = [
  { type: 'available', label: 'Available', color: 'bg-zinc-800', icon: FaChair },
  { type: 'selected', label: 'Selected', color: 'bg-white', icon: FaChair },
  { type: 'booked', label: 'Occupied', color: 'bg-red-900', icon: FaChair },
  { type: 'premium', label: 'Premium Seat', color: 'bg-amber-500', icon: MdAirlineSeatReclineExtra },
  { type: 'exit', label: 'Emergency Exit', color: 'bg-green-600', icon: FaDoorOpen },
]

const busLayouts = {
  small: { rows: 10, seatsPerRow: 8, aisleAfter: 2, premiumRows: [1, 2], exitRows: [5, 6], hasToilet: true, luggageAreas: [3, 7] },
  medium: { rows: 10, seatsPerRow: 5, aisleAfter: 2, premiumRows: [1], exitRows: [5], hasToilet: true, luggageAreas: [3] },
  large: { rows: 12, seatsPerRow: 4, aisleAfter: 3, premiumRows: [1, 2], exitRows: [6], hasToilet: true, luggageAreas: [3, 7] },
  xl: { rows: 10, seatsPerRow: 6, aisleAfter: 2, premiumRows: [1], exitRows: [5], hasToilet: true, luggageAreas: [3] },
  xxl: { rows: 10, seatsPerRow: 6, aisleAfter: 2, premiumRows: [1, 2], exitRows: [5], hasToilet: true, luggageAreas: [3, 7] },
  xxxl: { rows: 13, seatsPerRow: 4, aisleAfter: 3, premiumRows: [1], exitRows: [6], hasToilet: true, luggageAreas: [3] },
  
}

const SeatSelection = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [bus, setBus] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [bookedSeats, setBookedSeats] = useState([])
  const [premiumSeats, setPremiumSeats] = useState([])

  useEffect(() => {
    // In a real application, you would fetch the bus data from an API
    // For this example, we'll use mock data
    const mockBuses = [
      {
        id: 1,
        title: "Luxury Coach",
        totalSeats: 80,
        price: 50,
        route: ["Harare", "Bulawayo"],
        layout: 'small'
      },
      {
        id: 2,
        title: "City Shuttle",
        totalSeats: 50,
        price: 40,
        route: ["Harare", "Hwange"],
        layout: 'medium'
      },
      {
        id: 3,
        title: "Tour Bus",
        totalSeats: 48,
        price: 60,
        route: ["Victoria Falls", "Harare"],
        layout: 'large'
      },
      {
        id: 4,
        title: "Deluxe Bus",
        totalSeats: 60,
        price: 80,
        route: ["Victoria Falls", "Bulawayo"],
        layout: 'xl'
      },
      {
        id: 5,
        title: "Cross Border Bus",
        totalSeats: 60,
        price: 200,
        route: ["Capetown", "Harare"],
        layout: 'xxl'
      },
      {
        id: 6,
        title: "Budgetliner",
        totalSeats: 52,
        price: 40,
        route: ["Hwange", "Harare"],
        layout: 'xxxl'
      }

    ]

    const selectedBus = mockBuses.find(bus => bus.id === parseInt(id))
    setBus(selectedBus)

    if (selectedBus) {
      const layout = busLayouts[selectedBus.layout]
      if (layout && layout.premiumRows) {
        const premiumSeatNumbers = layout.premiumRows.flatMap(row => 
          Array.from({ length: layout.seatsPerRow }, (_, i) => 
            (row - 1) * layout.seatsPerRow + i + 1
          )
        )
        setPremiumSeats(premiumSeatNumbers)
      } else {
        setPremiumSeats([])
      }
    }

    // Check if there's a booking confirmation
    if (location.state?.bookingConfirmed) {
      setBookedSeats(prevBookedSeats => [
        ...prevBookedSeats,
        ...location.state.bookedSeats
      ])
      // Show a confirmation message to the user
      alert("Booking confirmed! Your seats have been reserved.")
    }
  }, [id, location.state])

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      // Seat is already booked, don't allow selection
      return
    }

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber))
    } else {
      setSelectedSeats([...selectedSeats, seatNumber])
    }
  }

  const handleCheckout = () => {
    navigate('/checkout', { state: { bus, selectedSeats } })
  }

  const calculateTotal = () => {
    if (!bus || !selectedSeats) return 0
    const regularSeatsPrice = selectedSeats.filter(seat => !premiumSeats.includes(seat)).length * bus.price
    const premiumSeatsPrice = selectedSeats.filter(seat => premiumSeats.includes(seat)).length * (bus.price * 1.3)
    return (regularSeatsPrice + premiumSeatsPrice).toFixed(2)
  }

  if (!bus) return <div>Loading...</div>

  const layout = busLayouts[bus.layout]
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">{bus.title} - Seat Selection</h1>
      <div className="flex justify-center items-center mb-4 text-lg text-white">
        <span className="font-semibold">{bus.route[0]}</span>
        <FaArrowRight className="mx-2" />
        <span className="font-semibold">{bus.route[1]}</span>
      </div>
      <div className="flex justify-center gap-4 mb-6">
        {seatLegend.map(({ type, label, color, icon }) => (
          <div key={type} className="flex items-center gap-2">
            <div className={`w-6 h-6 ${color} rounded-sm flex items-center justify-center`}>
              <icon className="text-sm" />
            </div>
            <span className="text-white text-sm">{label}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-zinc-900 p-4 rounded-sm border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 text-white">Select Your Seats</h2>
          <div className="relative">
            <div className="w-full flex items-center justify-between mb-8 border-2 border-zinc-700 rounded-t-3xl p-4">
              <div className="w-16 h-16 border-2 border-zinc-700 rounded-full flex items-center justify-center">
                <span className="text-zinc-400 text-xs">Driver</span>
              </div>
              <div className="flex-1 mx-4 h-8 bg-zinc-800 rounded-lg">
                <div className="text-center text-zinc-400 text-sm py-1">Dashboard</div>
              </div>
              <div className="w-16 h-16 border-2 border-zinc-700 rounded-lg flex items-center justify-center">
                <span className="text-zinc-400 text-xs">Door</span>
              </div>
            </div>

            <div className="relative border-2 border-zinc-700 rounded-lg p-4">
              <div className="absolute top-0 left-0 right-0 h-2 bg-zinc-700 flex justify-between px-4">
                {[...Array(Math.ceil(layout.rows / 2))].map((_, i) => (
                  <FaSuitcase key={i} className="text-zinc-500 -mt-3" />
                ))}
              </div>

              <div className="absolute top-0 left-4 bottom-0 w-1 bg-zinc-700"></div>
              <div className="absolute top-0 right-4 bottom-0 w-1 bg-zinc-700"></div>

              <div className="grid gap-2">
                {[...Array(layout.rows)].map((_, rowIndex) => (
                  <div key={rowIndex} className="relative">
                    {layout.exitRows.includes(rowIndex + 1) && (
                      <>
                        <div className="absolute -left-8 top-1/2 -translate-y-1/2">
                          <FaDoorOpen className="text-green-600 text-xl" />
                        </div>
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                          <FaDoorOpen className="text-green-600 text-xl" />
                        </div>
                      </>
                    )}

                    {layout.luggageAreas.includes(rowIndex + 1) && (
                      <div className="absolute -right-12 top-1/2 -translate-y-1/2">
                        <FaSuitcase className="text-zinc-500" />
                      </div>
                    )}

                    <div className="flex justify-center gap-2">
                      {[...Array(layout.seatsPerRow)].map((_, seatIndex) => {
                        const seatNumber = rowIndex * layout.seatsPerRow + seatIndex + 1
                        const isBooked = bookedSeats.includes(seatNumber)
                        const isSelected = selectedSeats.includes(seatNumber)
                        const isPremium = premiumSeats.includes(seatNumber)
                        const isExitRow = layout.exitRows.includes(rowIndex + 1)

                        return (
                          <React.Fragment key={seatIndex}>
                            {seatIndex === layout.aisleAfter && (
                              <div className={`w-8 ${isExitRow ? 'bg-green-600/20' : ''}`}></div>
                            )}
                            <button
                              className={`
                                w-10 h-12 rounded-t-lg relative group
                                ${isBooked
                                  ? 'bg-red-900 text-white cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-white text-black'
                                  : isPremium
                                  ? 'bg-amber-500 text-black hover:bg-amber-400'
                                  : isExitRow
                                  ? 'bg-zinc-800 text-white hover:bg-zinc-700 border-b-2 border-green-600'
                                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
                                }
                              `}
                              onClick={() => handleSeatClick(seatNumber)}
                            >
                              <div className="absolute inset-x-0 -top-1 h-2 bg-current rounded-t-lg opacity-50"></div>
                              <FaChair className="mx-auto mt-1" />
                              <span className="text-xs block">{seatNumber}</span>
                              {isPremium && 
                                <span className="text-[10px] block">Premium</span>
                              }
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                                <div className="bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                                  Seat {seatNumber}
                                  {isPremium && ' (Premium)'}
                                  {isBooked && ' (Occupied)'}
                                </div>
                              </div>
                            </button>
                          </React.Fragment>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 h-2 bg-zinc-700 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 p-4 rounded-sm border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 text-white">Booking Summary</h2>
          <div className="space-y-3 text-zinc-400">
            <p className="flex justify-between">
              <span>Selected Seats:</span>
              <span>{selectedSeats.join(', ') || 'None'}</span>
            </p>
            <p className="flex justify-between">
              <span>Regular Seats:</span>
              <span>${selectedSeats.filter(seat => !premiumSeats.includes(seat)).length * bus.price}</span>
            </p>
            <p className="flex justify-between">
              <span>Premium Seats:</span>
              <span>${selectedSeats.filter(seat => premiumSeats.includes(seat)).length * (bus.price * 1.3)}</span>
            </p>
            <div className="border-t border-zinc-800 pt-3">
              <p className="flex justify-between font-semibold text-white">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </p>
            </div>
          </div>
          <button
            className="bg-white text-black px-6 py-3 rounded-sm text-lg hover:bg-zinc-200 transition duration-300 w-full"
            onClick={handleCheckout}
            disabled={selectedSeats.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default SeatSelection