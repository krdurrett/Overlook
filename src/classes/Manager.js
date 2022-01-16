class Manager {
  constructor(bookings, rooms, customers) {
    this.bookings = bookings;
    this.rooms = rooms;
    this.customers = customers;
    this.availableRoomsByDate;
    this.todaysRevenue = 0;
    this.percentageBooked = 0;
    this.customer;
  }
  getAvailableRoomsByDate(date) {
    let roomsBooked = this.bookings.filter(booking => {
      return booking.date === date
    }).map(booking => booking.roomNumber)
    this.availableRoomsByDate = this.rooms.reduce((acc, room) => {
      if (!roomsBooked.includes(room.number)) {
        acc.push(room)
      }
      return acc
    }, [])
  }
  getTodaysRevenue(date) {
    let roomsBooked = this.bookings.filter(booking => {
      return booking.date === date
    }).map(booking => booking.roomNumber)
    this.todaysRevenue = this.rooms.reduce((acc, room) => {
      if (roomsBooked.includes(room.number)) {
        acc += room.costPerNight
      }
      return acc
    }, 0)
  }
  getPercentageBooked(date) {
    let numberRoomsBooked = this.bookings.filter(booking => {
      return booking.date === date
    }).length
    let totalRooms = this.rooms.length
    this.percentageBooked = Math.round((numberRoomsBooked/totalRooms) * 100)
  }
  findCustomer(name) {
    this.customer = this.customers.find(customer => {
      return customer.name === name
    })
  }
}

export default Manager;
