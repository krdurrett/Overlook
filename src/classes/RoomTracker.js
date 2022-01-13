class RoomTracker {
  constructor(rooms, bookings) {
    this.rooms = rooms
    this.bookings = bookings
    this.availableRoomsByDate = []
    this.availableRoomsByDateAndFilter = []
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
  };
  filterRoomsByRoomType(roomType) {
    this.availableRoomsByDate.forEach(number => {
      let foundRoom = this.rooms.find(room => room.number === number);
      if (foundRoom.roomType === roomType) {
        this.availableRoomsByDateAndFilter.push(foundRoom)
      }
    })
  };
}

export default RoomTracker;
