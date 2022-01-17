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
  showSpecificUser(customer) {
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
          <ul class="booking-list" tabindex=0>${bookingsList}</ul>
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
      <section class="booking-card" tabindex=0>
        <div>
          <p>Room Details</p>
        </div>
        <div class="room-detail-list">
          <ul>
            <li>Room Number: ${room.number}</li>
            <li>Type of Room: ${room.roomType}</li>
            <li>Beds: ${room.numBeds} ${room.bedSize}(s)</li>
            <li>Has bidet? ${room.bidet}</li>
            <li>Cost Per Night: $${room.costPerNight}</li>
          </ul>
        </div>
        <div>
          <button class="book-room-button" id="${room.number}">Book Room</button>
        </div>
      </section>
      `
    })
  },
  showAvailabilityByRoomType(roomTracker, roomType) {
    bookingPageHeading.innerText = `Available Bookings for a ${roomType}`;
    bookingCardSection.innerHTML = ``;
    roomTracker.availableRoomsByDateAndFilter.forEach(room => {
      bookingCardSection.innerHTML += `
      <section class="booking-card">
        <div>
          <p>Room Details</p>
        </div>
        <div class="room-detail-list">
          <ul>
            <li>Room Number: ${room.number}</li>
            <li>Type of Room: ${room.roomType}</li>
            <li>Beds: ${room.numBeds} ${room.bedSize}(s)</li>
            <li>Has bidet? ${room.bidet}</li>
            <li>Cost Per Night: $${room.costPerNight}</li>
          </ul>
        </div>
        <div>
          <button class="book-room-button" id="${room.number}">Book Room</button>
        </div>
      </section>
      `
    })
  },
  showSuccessMessage(date, roomNumber) {
    successView.innerHTML = `
    <section class="heading">
      <p>Your room has been booked!</p>
    </section>
    <section class="booking-details">
      <p>Room #${roomNumber} on ${date}</p>
    </section>
    `
  },
  showErrorMessage(message) {
    errorMessage.innerText = `${message}`
  },
  showManagerSummary(todaysDate, availableRooms, todaysRevenue, percentageBooked) {
    summarySection.innerHTML = `
    <p>Daily Summary for ${todaysDate}</p>
    <ul class="summary-list" tabindex=0>
      <li>There are ${availableRooms} rooms available.</li>
      <li>${percentageBooked}% of total rooms are booked.</li>
      <li>Total revenue: $${todaysRevenue}</li>
    </ul>
    `
  }
}

export default domUpdates;
