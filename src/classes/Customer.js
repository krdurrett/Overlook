class Customer {
  constructor(customer, bookings, rooms) {
    this.id = customer.id
    this.name = customer.name
    this.allBookings = bookings
    this.rooms = rooms
    this.myBookings = []
    this.totalCost
  }
  findMyBookings() {
    let filteredBookings = this.allBookings.filter(booking => {
      return booking.userID === this.id
    })
    let unsortedBookings = filteredBookings.reduce((acc, booking) => {
      acc.push({bookingDate: booking.date, roomNumber: booking.roomNumber, cost: this.rooms.find(room => room.number === booking.roomNumber).costPerNight})
      return acc
    }, [])
    let dateCorrectBookings = unsortedBookings.map(booking => {
      return {bookingDate: `${booking.bookingDate.slice(5, 10)}/2022`, roomNumber: booking.roomNumber, cost: booking.cost}
    })
    this.myBookings = dateCorrectBookings.sort((a, b) => {
      let aDate = a.bookingDate.slice(0, 5).replace('/','')
      let bDate = b.bookingDate.slice(0, 5).replace('/','')
      if (aDate < bDate) {
        return -1
      }
      if (aDate > bDate) {
        return 1
      } else {
        return 0
      }
    })
  }
  calculateTotalCost() {
     let cost = this.myBookings.reduce((acc, booking) => {
      acc += this.rooms.find(room => room.number === booking.roomNumber).costPerNight
      return acc
    }, 0)
    this.totalCost = Math.round(cost * 100) / 100
  }
}

export default Customer;
