import chai from 'chai';
import { rooms, bookings } from '../test/test-data';
import RoomTracker from '../src/classes/RoomTracker'
const expect = chai.expect;

describe('RoomTracker', () => {
  let roomTracker;
  let roomTracker1;

  beforeEach(() => {
    roomTracker = new RoomTracker(rooms, bookings);
    roomTracker1 = new RoomTracker([], []);
  });
  it('should be a function', () => {
    expect(RoomTracker).to.be.a('function');
  });
  it('Should instantiate a new instance of RoomTracker', () => {
    expect(roomTracker).to.be.an.instanceOf(RoomTracker);
  });
  it('Should have a list of all the rooms', () => {
    expect(roomTracker.rooms).to.be.a('array');
    expect(roomTracker.rooms[0]).to.deep.equal({
      "number": 1,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
    });
    expect(roomTracker1.rooms.length).to.equal(0)
  });
  it('Should be have a list of bookings for the rooms', () => {
    expect(roomTracker.bookings).to.be.a('array');
    expect(roomTracker.bookings[0]).to.deep.equal({
      "id": "5fwrgu4i7k55hl6t8",
      "userID": 1,
      "date": "2022/02/05",
      "roomNumber": 12,
      "roomServiceCharges": []
    });
    expect(roomTracker1.bookings.length).to.equal(0);
  });
  it('Should be able to filter room availability by multiple dates', () => {
    let dateRange = ["2022/01/19", "2022/01/20", "2022/01/21", "2022/01/22", "2022/01/23", "2022/01/24"]
    roomTracker.filterRoomsByDateRange(dateRange);
    roomTracker1.filterRoomsByDateRange(dateRange);
    expect(roomTracker.availableRoomsByDate).to.be.a('array');
    expect(roomTracker.availableRoomsByDate.length).to.equal(13);
    expect(roomTracker1.availableRoomsByDate.length).to.equal(0);
  });
});
