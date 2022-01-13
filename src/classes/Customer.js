class Customer {
  constructor(customer, bookings) {
    this.id = customer.id
    this.name = customer.name
    this.allBookings = bookings
    this.myBookings = []
  }
  findMyBookings() {
    this.myBookings = this.allBookings.filter(booking => {
      return booking.userID === this.id
    })
  }
}

export default Customer;
