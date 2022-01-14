import RoomTracker from './classes/RoomTracker';
import Customer from './classes/Customer';


let domUpdates = {
  addHidden(elements) {
    elements.forEach(item => {
      item.classList.add("hidden");
    })
  },
  removeHidden(elements) {
    elements.forEach(item => {
      item.classList.remove("hidden");
    })
  },
  showRandomUser(customer) {
    dashboardView.innerHTML = ``;
    let bookingsList = customer.myBookings.reduce((acc, booking) => {
      acc += `<li class="booking">Date: ${booking.bookingDate} Room #: ${booking.roomNumber} Cost: $${booking.cost}</li>`
      return acc
    }, ``);
    dashboardView.innerHTML = `
      <div class="heading">
        <p>Welcome ${customer.name}</p>
      </div>
      <div class="bookings-history">
        <div class="booking-title">
          <p>Bookings History</p>
        </div>
        <div class="booking-list-section">
          <ul class="booking-list">${bookingsList}</ul>
        </div>
        <div>
          <p>Total Cost $${customer.totalCost}</p>
        </div>
      </div>
    `
  }
}
 export default domUpdates;
