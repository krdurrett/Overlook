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
      acc += `<li>${booking}</li>`
      return acc
    }, ``);
    dashboardView.innerHTML = `
      <section class="heading">
        <p>Welcome ${customer.name}</p>
      </section>
      <section class="bookings-history">
        <section>
          <p>Bookings History</p>
        </section>
        <section>
          <ul class="booking-list">${bookingsList}</ul>
        </section>
        <section>
          <p>Total Cost $${customer.totalCost}</p>
        </section>
      </section>
    `
  }
}
 export default domUpdates;
