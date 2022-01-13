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

//Global Variables
let customer;
let roomTracker;

//Functions
const fetchAll = () => {
  Promise.all([fetchAllCustomers(), fetchAllRooms(), fetchAllBookings()])
    .then(data => {
      let randomCustomer = getRandomElement(data[0].customers);
      customer = new Customer(randomCustomer, data[2].bookings, data[1].rooms);
      roomTracker = new RoomTracker(data[1].rooms, data[2].bookings);
    })
    .catch(err => console.log(err))
}

const getRandomElement = array => {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

//Event Listeners
window.addEventListener('load', fetchAll)
