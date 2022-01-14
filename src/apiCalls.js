export const fetchAllCustomers = () => {
    return fetch('http://localhost:3001/api/v1/customers')
      .then(response => response.json())
}

export const fetchAllRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
}

export const fetchAllBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
}
