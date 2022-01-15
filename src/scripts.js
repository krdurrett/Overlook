// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import Customer from './classes/Customer';
import RoomTracker from './classes/RoomTracker';
import domUpdates from './domUpdates';
import { fetchAllCustomers, fetchAllRooms, fetchAllBookings, addABooking } from './apiCalls';

//Query Selectors
const dashboardView = document.querySelector('#dashboardView');
const bookingPageView = document.querySelector('#bookingPageView');
const filterView = document.querySelector('#filterView');
const errorMessageView = document.querySelector('#errorMessageView');
const successView = document.querySelector('#successView');
const bookRoomButton = document.querySelector('#bookRoomButton');
const filterRoomButton = document.querySelector('#filterRoomButton');
const filterByRoomTypeButton = document.querySelector('#filterByRoomTypeButton');
const tryAgainButton = document.querySelector('#tryAgainButton');
const selectedDate = document.querySelector('#selectedDate');
const bookingCardSection = document.querySelector('#bookingCardSection');
const bookingPageHeading = document.querySelector('#bookingPageHeading');
const errorMessage = document.querySelector('#errorMessage');

//Global Variables
let customer;
let roomTracker;
bookRoomButton.disabled = true;

//Functions
const fetchAll = () => {
  Promise.all([fetchAllCustomers(), fetchAllRooms(), fetchAllBookings()])
    .then(data => {
      let randomCustomer = getRandomElement(data[0].customers);
      customer = new Customer(randomCustomer, data[2].bookings, data[1].rooms);
      roomTracker = new RoomTracker(data[1].rooms, data[2].bookings);
      displayRandomUser(customer);
    })
    .catch(err => displayGetErrorMessage())
}

const getRandomElement = array => {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const displayRandomUser = (customer) => {
  customer.findMyBookings();
  customer.calculateTotalCost();
  domUpdates.showRandomUser(customer);
}

const displayAvailabilityByDate = () => {
  event.preventDefault();
  roomTracker.availableRoomsByDate = [];
  let userSelectedDate = selectedDate.value.replace('-', '/').replace('-', '/');
  roomTracker.filterRoomsByDate(userSelectedDate);
  if (roomTracker.availableRoomsByDate.length === 0) {
    let message = `We sincerely apologize, but no rooms are available on ${userSelectedDate}!`
    domUpdates.showErrorMessage(message)
    domUpdates.addHidden([dashboardView, bookingPageView, filterView, successView]);
    domUpdates.removeHidden([errorMessageView]);
  } else {
    domUpdates.addHidden([dashboardView, filterView, errorMessageView, successView]);
    domUpdates.removeHidden([bookingPageView]);
    domUpdates.showAvailabilityByDate(roomTracker, userSelectedDate);
  }
}

const stateHandle = () => {
  if(document.querySelector("#selectedDate").value === "") {
    bookRoomButton.disabled = true;
  } else {
    bookRoomButton.disabled = false;
  }
}

const displayFilterView = () => {
  domUpdates.addHidden([bookingPageView, dashboardView, errorMessageView, successView]);
  domUpdates.removeHidden([filterView])
}

const displayAvailabilityByRoomType = () => {
  roomTracker.availableRoomsByDateAndFilter = [];
  let userSelectedDate = `${selectedDate.value.replace('-', '/').replace('-', '/').slice(5, 10)}/2022`;
  let userSelectedRoomType = document.querySelector('input[name="roomType"]:checked').value;
  roomTracker.filterRoomsByRoomType(userSelectedRoomType);
  if (roomTracker.availableRoomsByDateAndFilter.length === 0) {
    let message = `We sincerely apologize, but no ${userSelectedRoomType}s are available on ${userSelectedDate}!`
    domUpdates.showErrorMessage(message)
    domUpdates.addHidden([dashboardView, filterView, bookingPageView, successView]);
    domUpdates.removeHidden([errorMessageView]);
  } else {
    domUpdates.addHidden([filterView, errorMessageView, dashboardView, successView]);
    domUpdates.removeHidden([bookingPageView]);
    domUpdates.showAvailabilityByRoomType(roomTracker, userSelectedRoomType);
  }
}

const goBackToDashboard = () => {
  domUpdates.addHidden([errorMessageView, successView, bookingPageView, filterView]);
  domUpdates.removeHidden([dashboardView]);
}

const determineButtonAction = event => {
  if (event.target.classList.contains('book-room-button')) {
    bookARoom(event);
  }
}

const bookARoom = event => {
  let userID = customer.id
  let date = document.querySelector("#selectedDate").value.replace('-', '/').replace('-', '/')
  let roomNumber = parseInt(event.target.id)
  addABooking(customer.id, date, roomNumber)
}

export const determineAPIResponse = (response, date, roomNumber) => {
  if (response.ok) {
    domUpdates.addHidden([filterView, errorMessageView, dashboardView, bookingPageView])
    domUpdates.removeHidden([successView])
    domUpdates.showSuccessMessage(date, roomNumber);
    window.setTimeout(goBackToDashboard, 3000);
  } else {
    domUpdates.addHidden([filterView, successView, dashboardView, bookingPageView])
    domUpdates.removeHidden([errorMessageView])
    Promise.resolve(response)
      .then(resp => resp.json())
      .then(data => domUpdates.showErrorMessage(data.message))
  }
}

const displayGetErrorMessage = () => {
  let message = `Something went wrong while obtaining data!`;
  domUpdates.showErrorMessage(message);
  domUpdates.addHidden([filterView, successView, dashboardView, bookingPageView, tryAgainButton])
  domUpdates.removeHidden([errorMessageView]);
}

//Event Listeners
window.addEventListener('load', fetchAll);
bookRoomButton.addEventListener('click', displayAvailabilityByDate);
selectedDate.addEventListener('change', stateHandle);
filterRoomButton.addEventListener('click', displayFilterView);
filterByRoomTypeButton.addEventListener('click', displayAvailabilityByRoomType);
tryAgainButton.addEventListener('click', goBackToDashboard);
bookingCardSection.addEventListener('click', event => {
  determineButtonAction(event)});
