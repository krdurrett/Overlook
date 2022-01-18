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

export const addABooking = (userID, date, roomNumber) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({ "userID": userID, "date": date, "roomNumber": roomNumber }),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => determinePostAPIResponse(response, date, roomNumber))
}

export const addBookingByManager = (userID, date, roomNumber) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({ "userID": userID, "date": date, "roomNumber": roomNumber }),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => determineManagerPostAPIResponse(response, date, roomNumber))
}

export const deleteBooking = bookingNumber => {
  return fetch(`http://localhost:3001/api/v1/bookings/${bookingNumber}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => determineDeleteAPIResponse(response, bookingNumber))
}
