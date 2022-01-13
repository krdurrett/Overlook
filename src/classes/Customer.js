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
    this.myBookings = this.allBookings.filter(booking => {
      return booking.userID === this.id
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
