// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import Customer from './classes/Customer';
import RoomTracker from './classes/RoomTracker';
import domUpdates from './domUpdates';
import { fetchAllCustomers, fetchAllRooms, fetchAllBookings } from './apiCalls';

//Query Selectors
const dashboardView = document.querySelector('#dashboardView');
const bookingPageView = document.querySelector('#bookingPageView');
const bookRoomButton = document.querySelector('#bookRoomButton');
const selectedDate = document.querySelector('#selectedDate');
const bookingCardSection = document.querySelector('#bookingCardSection');
const bookingPageHeading = document.querySelector('#bookingPageHeading');

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
    .catch(err => console.log(err))
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
  domUpdates.addHidden([dashboardView]);
  domUpdates.removeHidden([bookingPageView]);
  let userSelectedDate = selectedDate.value.replace('-', '/').replace('-', '/');
  roomTracker.filterRoomsByDate(userSelectedDate);
  domUpdates.showAvailabilityByDate(roomTracker, userSelectedDate);
  // console.log(roomTracker)
  // console.log(`${selectedDate.value.replace('-', '/').replace('-', '/').slice(5, 10)}/2022`)
}

const stateHandle = () => {
  if(document.querySelector("#selectedDate").value === "") {
    bookRoomButton.disabled = true;
  } else {
    bookRoomButton.disabled = false;
  }
}

//Event Listeners
window.addEventListener('load', fetchAll);
bookRoomButton.addEventListener('click', displayAvailabilityByDate);
selectedDate.addEventListener("change", stateHandle);
