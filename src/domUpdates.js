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
  },
  showAvailabilityByDate(roomTracker, userSelectedDate) {
    let correctedDate = `${userSelectedDate.slice(5, 10)}/2022`;
    bookingPageHeading.innerText = `Available Bookings for ${correctedDate}`;
    bookingCardSection.innerHTML = ``;
    roomTracker.availableRoomsByDate.forEach(room => {
      bookingCardSection.innerHTML += `
      <section class="booking-card">
        <div>
          <p>Room Details</p>
        </div>
        <div class="room-detail-list">
          <ul>
            <li>Room Number: ${room.number}</li>
            <li>Type of Room: ${room.roomType}</li>
            <li>Beds: ${room.numBeds} ${room.bedSize}/s</li>
            <li>Has bidet? ${room.bidet}</li>
            <li>Cost Per Night: $${room.costPerNight}</li>
          <ul>
        </div>
        <div>
          <button>Book Room</button>
        </div>
      </section>
      `
    })
  }
}
 export default domUpdates;
