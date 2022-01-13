class RoomTracker {
  constructor(rooms, bookings) {
    this.rooms = rooms
    this.bookings = bookings
    this.availableRoomsByDate = []
  }
  filterRoomsByDateRange(dateRange) {
    this.availableRoomsByDate = dateRange.reduce((acc, date) => {
      let foundRooms = this.bookings.filter(booking => {
        return booking.date !== date
      }).map(booking => booking.roomNumber)
      foundRooms.forEach(number => {
        if (!acc.includes(number)) {
          acc.push(number)
        }
      })
      return acc
    }, [])
  }
}

export default RoomTracker;
