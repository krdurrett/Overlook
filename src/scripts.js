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


//Functions
const fetchAll = () => {
  Promise.all()
}

//Event Listeners
window.addEventListener('load', fetchAll)
