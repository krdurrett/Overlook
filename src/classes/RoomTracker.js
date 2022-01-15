class RoomTracker {
  constructor(rooms, bookings) {
    this.rooms = rooms
    this.bookings = bookings
    this.availableRoomsByDate = []
    this.availableRoomsByDateAndFilter = []
  }
  filterRoomsByDate(date) {
    let roomsBooked = this.bookings.filter(booking => {
      return booking.date === date
    }).map(booking => booking.roomNumber)
    this.availableRoomsByDate = this.rooms.reduce((acc, room) => {
      if (!roomsBooked.includes(room.number)) {
        acc.push(room)
      }
      return acc
    }, [])
    if (this.availableRoomsByDate.length === 0) {
      return `We sincerely apologize, but no rooms match your search criteria!`
    }
  }
  filterRoomsByRoomType(roomType) {
    let filteredRooms = [];
    this.availableRoomsByDate.forEach(room => {
      if (room.roomType === roomType) {
        filteredRooms.push(room)
      }
    })
    filteredRooms.forEach(room => {
      this.availableRoomsByDateAndFilter.push(room)
    })
    if (filteredRooms.length === 0) {
      return `We sincerely apologize, but no rooms match your search criteria!`
    }
  }
}

export default RoomTracker;
