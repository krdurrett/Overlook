import { determinePostAPIResponse, determineFetchAPIResponse, determineManagerPostAPIResponse, determineDeleteAPIResponse } from './scripts';

export const fetchAllCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
}

export const fetchSingleCustomer = userID => {
  return fetch(`http://localhost:3001/api/v1/customers/${userID}`)
    .then(response => determineFetchAPIResponse(response))
}

export const fetchAllRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
}

export const fetchAllBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
}

export const addABooking = (customer, date, roomNumber) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({ "userID": customer.id, "date": date, "roomNumber": roomNumber }),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => determinePostAPIResponse(response, date, roomNumber, customer))
}

export const addBookingByManager = (customer1, date, roomNumber) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({ "userID": customer1.id, "date": date, "roomNumber": roomNumber }),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => determineManagerPostAPIResponse(response, date, roomNumber, customer1))
}

export const deleteBooking = (bookingNumber, customer1) => {
  return fetch(`http://localhost:3001/api/v1/bookings/${bookingNumber}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => determineDeleteAPIResponse(response, bookingNumber, customer1))
}
