import './css/base.scss';
import Customer from './classes/Customer';
import RoomTracker from './classes/RoomTracker';
import Manager from './classes/Manager';
import domUpdates from './domUpdates';
import { fetchAllCustomers, fetchSingleCustomer, fetchAllRooms, fetchAllBookings, addABooking, addBookingByManager, deleteBooking } from './apiCalls';

//Query Selectors
const dashboardView = document.querySelector('#dashboardView');
const bookingPageView = document.querySelector('#bookingPageView');
const filterView = document.querySelector('#filterView');
const errorMessageView = document.querySelector('#errorMessageView');
const successView = document.querySelector('#successView');
const logInView = document.querySelector('#logInView');
const managerDashboard = document.querySelector('#managerDashboard');
const foundCustomerSection = document.querySelector('#foundCustomerSection');
const customerInformationSection = document.querySelector('#customerInformationSection');
const adjustBookingsSection = document.querySelector('#adjustBookingsSection');
const managerBookingError = document.querySelector('#managerBookingError');
const logInNav = document.querySelector('#logInNav');
const dashboardNav = document.querySelector('#dashboardNav');
const managerNav = document.querySelector('#managerNav');
const bookRoomButton = document.querySelector('#bookRoomButton');
const filterRoomButton = document.querySelector('#filterRoomButton');
const filterByRoomTypeButton = document.querySelector('#filterByRoomTypeButton');
const tryAgainButton = document.querySelector('#tryAgainButton');
const logInButton = document.querySelector('#logInButton');
const homeButton = document.querySelector('#homeButton');
const navHomeButton = document.querySelector('#navHomeButton');
const managerNavHomeButton = document.querySelector('#managerNavHomeButton');
const findCustomerButton = document.querySelector('#findCustomerButton');
const bookRoomManagerButton = document.querySelector('#bookRoomManagerButton');
const passwordError = document.querySelector('#passwordError');
const customerNameError = document.querySelector('#customerNameError');
const selectedDate = document.querySelector('#selectedDate');
const userName = document.querySelector('#userName');
const password = document.querySelector('#password');
const bookingCardSection = document.querySelector('#bookingCardSection');
const bookingPageHeading = document.querySelector('#bookingPageHeading');
const errorMessage = document.querySelector('#errorMessage');
const summarySection = document.querySelector('#summarySection');
const customerName = document.querySelector('#customerName');
const findAnotherCustomerButton = document.querySelector('#findAnotherCustomerButton');
const customerNameForManagerBooking = document.querySelector('#customerNameForManagerBooking');
const managerSelectedDate = document.querySelector('#date');
const roomNumber = document.querySelector('#roomNumber');
const bookingListManager = document.querySelector('#bookingsListManager');

//Global Variables
let customer;
let roomTracker;
let allRooms;
let allBookings;
let manager;
bookRoomButton.disabled = true;

//Functions
const fetchAll = () => {
  Promise.all([fetchAllCustomers(), fetchAllRooms(), fetchAllBookings()])
    .then(data => {
      allRooms = data[1].rooms
      allBookings = data[2].bookings
      roomTracker = new RoomTracker(data[1].rooms, data[2].bookings);
      manager = new Manager(data[2].bookings, data[1].rooms, data[0].customers);
    })
    .catch(err => displayGetErrorMessage())
}

const displaySpecificCustomer = (customer) => {
  customer.findMyBookings();
  customer.calculateTotalCost();
  domUpdates.addHidden([passwordError]);
  domUpdates.showSpecificUser(customer);
}

const displayAvailabilityByDate = () => {
  event.preventDefault();
  roomTracker.availableRoomsByDate = [];
  let userSelectedDate = selectedDate.value.replace('-', '/').replace('-', '/');
  roomTracker.filterRoomsByDate(userSelectedDate);
  if (roomTracker.availableRoomsByDate.length === 0) {
    let message = `We sincerely apologize, but no rooms are available on ${userSelectedDate}!`
    domUpdates.showErrorMessage(message)
    domUpdates.addHidden([dashboardView, bookingPageView, filterView, successView, managerNav, managerDashboard]);
    domUpdates.removeHidden([errorMessageView]);
  } else {
    domUpdates.addHidden([dashboardView, filterView, errorMessageView, successView, managerNav, managerDashboard]);
    domUpdates.removeHidden([bookingPageView]);
    domUpdates.showAvailabilityByDate(roomTracker, userSelectedDate);
  }
}

const stateHandle = () => {
  if (selectedDate.value === "") {
    bookRoomButton.disabled = true;
  } else {
    bookRoomButton.disabled = false;
  }
}

const displayFilterView = () => {
  domUpdates.addHidden([bookingPageView, dashboardView, errorMessageView, successView, managerNav, managerDashboard]);
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
    domUpdates.addHidden([dashboardView, filterView, bookingPageView, successView, managerNav, managerDashboard]);
    domUpdates.removeHidden([errorMessageView]);
  } else {
    domUpdates.addHidden([filterView, errorMessageView, dashboardView, successView, managerNav, managerDashboard]);
    domUpdates.removeHidden([bookingPageView]);
    domUpdates.showAvailabilityByRoomType(roomTracker, userSelectedRoomType);
  }
}

const goBackToDashboard = () => {
  domUpdates.addHidden([errorMessageView, successView, bookingPageView, filterView, managerNav, managerDashboard]);
  domUpdates.removeHidden([dashboardView]);
}

const goBackToManagerDashboard = (manager, customer1) => {
  domUpdates.addHidden([errorMessageView, successView, bookingPageView, filterView, logInNav, dashboardNav, foundCustomerSection, customerNameError]);
  domUpdates.removeHidden([managerNav, managerDashboard, customerInformationSection]);
  let currentDate = getReformattedDate();
  manager.findCustomer(customer1.name);
  let foundCustomer = manager.customer;
  customer = new Customer(foundCustomer, allBookings, allRooms);
  customer.findMyBookings();
  customer.calculateTotalCost();
  domUpdates.showCustomerInformationSection(customer, currentDate);
}

const determineButtonAction = event => {
  if (event.target.classList.contains('book-room-button')) {
    bookARoom(event);
  }
  if (event.target.classList.contains('delete-room')) {
    deleteRoomForCustomer(event);
  }
  if (event.target.classList.contains('find-another-customer-button')) {
    displayFindCustomerForm();
  }
}

const bookARoom = event => {
  let date = selectedDate.value.replace('-', '/').replace('-', '/')
  let roomNumber = parseInt(event.target.id)
  addABooking(customer, date, roomNumber)
}

export const determinePostAPIResponse = (response, date, roomNumber, customer) => {
  if (response.ok) {
    domUpdates.addHidden([filterView, errorMessageView, dashboardView, bookingPageView, managerNav, managerDashboard])
    domUpdates.removeHidden([successView])
    domUpdates.showSuccessMessage(date, roomNumber);
    window.setTimeout(function() {
      fetchSingleCustomer(customer.id);
    }, 3000);
  } else {
    domUpdates.addHidden([filterView, successView, dashboardView, bookingPageView, managerNav, managerDashboard])
    domUpdates.removeHidden([errorMessageView])
    Promise.resolve(response)
      .then(resp => resp.json())
      .then(data => domUpdates.showErrorMessage(data.message))
  }
}

export const determineManagerPostAPIResponse = (response, date, roomNumber, customer1) => {
  if (response.ok) {
    domUpdates.addHidden([filterView, errorMessageView, dashboardView, bookingPageView, managerDashboard])
    domUpdates.removeHidden([successView])
    domUpdates.showSuccessMessage(date, roomNumber);
    Promise.all([fetchAllRooms(), fetchAllBookings(), fetchAllCustomers()])
      .then(data => {
        allRooms = data[0].rooms
        allBookings = data[1].bookings
        roomTracker = new RoomTracker(data[0].rooms, data[1].bookings);
        manager = new Manager(data[1].bookings, data[0].rooms, data[2].customers);
        window.setTimeout(function(){goBackToManagerDashboard(manager, customer1)}, 3000);
      })
      .catch(err => displayGetErrorMessage())
  } else {
    domUpdates.addHidden([filterView, successView, dashboardView, bookingPageView, managerDashboard])
    domUpdates.removeHidden([errorMessageView])
    Promise.resolve(response)
      .then(resp => resp.json())
      .then(data => domUpdates.showErrorMessage(data.message))
  }
}

export const determineDeleteAPIResponse = (response, bookingNumber, customer1) => {
  if (response.ok) {
    domUpdates.addHidden([filterView, errorMessageView, dashboardView, bookingPageView, managerDashboard])
    domUpdates.removeHidden([successView])
    domUpdates.showDeleteMessage(bookingNumber);
    Promise.all([fetchAllRooms(), fetchAllBookings(), fetchAllCustomers()])
      .then(data => {
        allRooms = data[0].rooms
        allBookings = data[1].bookings
        roomTracker = new RoomTracker(data[0].rooms, data[1].bookings);
        manager = new Manager(data[1].bookings, data[0].rooms, data[2].customers);
        window.setTimeout(function(){goBackToManagerDashboard(manager, customer1)}, 3000);
      })
      .catch(err => displayGetErrorMessage())
  } else {
    domUpdates.addHidden([filterView, successView, dashboardView, bookingPageView, managerDashboard])
    domUpdates.removeHidden([errorMessageView])
    Promise.resolve(response)
      .then(resp => resp.json())
      .then(data => domUpdates.showErrorMessage(data.message))
  }
}

export const determineFetchAPIResponse = response => {
  if (response.ok) {
    domUpdates.addHidden([errorMessageView, filterView, successView, logInView, bookingPageView, logInNav, managerNav])
    domUpdates.removeHidden([dashboardView, dashboardNav])
    Promise.all([fetchAllRooms(), fetchAllBookings()])
      .then(data => {
        allRooms = data[0].rooms
        allBookings = data[1].bookings
        roomTracker = new RoomTracker(data[0].rooms, data[1].bookings);
      })
      .catch(err => displayGetErrorMessage())
    Promise.resolve(response)
      .then(resp => resp.json())
      .then(data => {
        customer = new Customer(data, allBookings, allRooms)
        displaySpecificCustomer(customer)
      })
      .catch(err => displayGetErrorMessage())
  } else {
    domUpdates.addHidden([filterView, successView, dashboardView, bookingPageView, logInView, dashboardNav, tryAgainButton, managerNav, managerDashboard])
    domUpdates.removeHidden([errorMessageView, logInNav])
    Promise.resolve(response)
      .then(resp => resp.json())
      .then(data => domUpdates.showErrorMessage(data.message))
  }
}

const displayGetErrorMessage = () => {
  let message = `Something went wrong while obtaining data! Try again later...`;
  domUpdates.showErrorMessage(message);
  domUpdates.addHidden([filterView, successView, dashboardView, bookingPageView, tryAgainButton, logInView, navHomeButton, managerNav, managerDashboard]);
  domUpdates.removeHidden([errorMessageView]);
}

const getTodaysDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const day = date.getDate();
  const month = `0${date.getMonth() + 1}`;
  const todaysDate = `${year}/${month}/${day}`;
  return todaysDate;
}

const getReformattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const day = date.getDate();
  const month = `0${date.getMonth() + 1}`;
  const reformattedDate = `${month}/${day}/${year}`;
  return reformattedDate;
}

const logUserIn = () => {
  let userID = parseInt(userName.value.slice(8));
  let userPassword = password.value.toLowerCase();
  if (userPassword === 'overlook2021' && userName.value.slice(0,8).toLowerCase() === 'customer') {
    fetchSingleCustomer(userID);
  } else if (userPassword === 'overlook2021' && userName.value.toLowerCase() === 'manager') {
    domUpdates.addHidden([logInView, logInNav, filterView, successView, dashboardView, bookingPageView, tryAgainButton]);
    domUpdates.removeHidden([managerNav, managerDashboard]);
    let todaysDate = getTodaysDate();
    const reformattedDate = getReformattedDate();
    manager.getAvailableRoomsByDate(todaysDate);
    manager.getTodaysRevenue(todaysDate);
    manager.getPercentageBooked(todaysDate);
    domUpdates.showManagerSummary(reformattedDate, manager.availableRoomsByDate.length, manager.todaysRevenue, manager.percentageBooked);
  } else {
    domUpdates.removeHidden([passwordError]);
  }
}

const returnToLogIn = () => {
  event.preventDefault;
  domUpdates.addHidden([errorMessageView, filterView, successView, logInView, bookingPageView, dashboardNav, dashboardView, managerNav, managerDashboard])
  domUpdates.removeHidden([logInView, logInNav])
}

const displayCustomerForManager = () => {
  manager.findCustomer(customerName.value);
  let foundCustomer = manager.customer;
  if (foundCustomer === undefined) {
    domUpdates.removeHidden([customerNameError])
  } else {
    let currentDate = getReformattedDate();
    customer = new Customer(foundCustomer, allBookings, allRooms);
    customer.findMyBookings();
    customer.calculateTotalCost();
    domUpdates.addHidden([foundCustomerSection, customerNameError]);
    domUpdates.removeHidden([customerInformationSection]);
    domUpdates.showCustomerInformationSection(customer, currentDate);
  }
}

const displayFindCustomerForm = () => {
  domUpdates.addHidden([customerInformationSection]);
  domUpdates.removeHidden([foundCustomerSection]);
}

const bookRoomForCustomer = () => {
  manager.findCustomer(customerNameForManagerBooking.value);
  let foundCustomer = manager.customer;
  let selectedDate = managerSelectedDate.value.replace('-', '/').replace('-', '/');
  let selectedRoomNumber = parseInt(roomNumber.value);
  roomTracker.filterRoomsByDate(selectedDate);
  let foundSelectedRoom = roomTracker.availableRoomsByDate.find(room => {
    return room.number === selectedRoomNumber
  })
  let availableRoomNumbers = roomTracker.availableRoomsByDate.map(room => room.number).join()
  if (roomTracker.availableRoomsByDate.length === 0) {
    domUpdates.addHidden([adjustBookingsSection]);
    domUpdates.removeHidden([managerBookingError]);
    domUpdates.showManagerBookingError(`Oops! There are no rooms available for selected day!`);
    window.setTimeout(goBackToBookingSection, 3000)
  } else if (foundSelectedRoom === undefined) {
    domUpdates.addHidden([adjustBookingsSection]);
    domUpdates.removeHidden([managerBookingError]);
    domUpdates.showManagerBookingError(`Oops! Room number ${selectedRoomNumber} is unavailable that day! Try ${availableRoomNumbers}`);
    window.setTimeout(goBackToBookingSection, 3000)
  } else {
    addBookingByManager(foundCustomer, selectedDate, selectedRoomNumber);
  }
}

const deleteRoomForCustomer = event => {
  deleteBooking(event.target.id, customer);
}

const goBackToBookingSection = () => {
  domUpdates.addHidden([managerBookingError]);
  domUpdates.removeHidden([adjustBookingsSection]);
}

//Event Listeners
window.addEventListener('load', fetchAll);
bookRoomButton.addEventListener('click', displayAvailabilityByDate);
selectedDate.addEventListener('change', stateHandle);
filterRoomButton.addEventListener('click', displayFilterView);
filterByRoomTypeButton.addEventListener('click', displayAvailabilityByRoomType);
tryAgainButton.addEventListener('click', goBackToDashboard);
bookingCardSection.addEventListener('click', event => {
  determineButtonAction(event)
});
logInButton.addEventListener('click', logUserIn);
homeButton.addEventListener('click', returnToLogIn);
navHomeButton.addEventListener('click', returnToLogIn);
managerNavHomeButton.addEventListener('click', returnToLogIn);
findCustomerButton.addEventListener('click', displayCustomerForManager);
findAnotherCustomerButton.addEventListener('click', displayFindCustomerForm);
bookRoomManagerButton.addEventListener('click', bookRoomForCustomer);
customerInformationSection.addEventListener('click', event => {
  determineButtonAction(event)
})
