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
const filterRoomButton = document.querySelector('#filterRoomButton');
const selectedDate = document.querySelector('#selectedDate');
const bookingCardSection = document.querySelector('#bookingCardSection');
const bookingPageHeading = document.querySelector('#bookingPageHeading');
const filterView = document.querySelector('#filterView');

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
      // console.log(data[2].bookings.map(booking => booking.date))
      // console.log(data[2].bookings.filter(booking => {return booking.date === '2022/01/18'}).map(booking => booking.roomNumber).reduce((acc, number) => {
      //   if (!acc.includes(number)) {
      //     acc.push(number)
      //   }
      //   return acc
      // }, []))
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
}

const stateHandle = () => {
  if(document.querySelector("#selectedDate").value === "") {
    bookRoomButton.disabled = true;
  } else {
    bookRoomButton.disabled = false;
  }
}

const displayFilterView = () => {
  // console.log(roomTracker.availableRoomsByDate)
  domUpdates.addHidden([bookingPageView]);
  domUpdates.removeHidden([filterView])
}

//Event Listeners
window.addEventListener('load', fetchAll);
bookRoomButton.addEventListener('click', displayAvailabilityByDate);
selectedDate.addEventListener('change', stateHandle);
filterRoomButton.addEventListener('click', displayFilterView);
