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
  it('Should be able to filter room availability a date', () => {
    roomTracker.filterRoomsByDate("2022/01/24");
    roomTracker1.filterRoomsByDate("2022/01/24");
    expect(roomTracker.availableRoomsByDate).to.be.a('array');
    expect(roomTracker.availableRoomsByDate.length).to.equal(12);
    expect(roomTracker1.availableRoomsByDate.length).to.equal(0);
  });
  it('Should be able to filter available rooms by room type', () => {
    roomTracker.filterRoomsByDate("2022/01/24");
    roomTracker.filterRoomsByRoomType("single room");
    roomTracker1.filterRoomsByDate("2022/01/24");
    roomTracker1.filterRoomsByRoomType("single room");
    expect(roomTracker.availableRoomsByDateAndFilter).to.be.a('array');
    expect(roomTracker.availableRoomsByDateAndFilter.length).to.equal(5);
    expect(roomTracker1.availableRoomsByDateAndFilter.length).to.equal(0)
  })
  it('Should apologize if no rooms are available under date', () => {
    let bookings = [ {
        "id": "5fwrgu4i7k55hl6vn",
        "userID": 4,
        "date": "2022/02/20",
        "roomNumber": 1,
        "roomServiceCharges": []
      },
      {
       "id": "5fwrgu4i7k55hl6vr",
       "userID": 5,
       "date": "2022/02/20",
       "roomNumber": 14,
       "roomServiceCharges": []
     },
     {
        "id": "5fwrgu4i7k55hl6vu",
        "userID": 9,
        "date": "2022/02/20",
        "roomNumber": 23,
        "roomServiceCharges": []
      }
    ]
    let roomTracker = new RoomTracker(rooms, bookings);
    roomTracker.filterRoomsByDate("2022/02/20");
    expect(roomTracker.availableRoomsByDate).to.be.a('array');
    expect(roomTracker.availableRoomsByDate.length).to.equal(0);
    expect(roomTracker.filterRoomsByDate("2022/02/20")).to.equal(`We sincerely apologize, but no rooms match your search criteria!`);
  })
  it('Should apologize if no rooms are available under room type', () => {
    let rooms = [
      {
        "number": 1,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      },
      {
        "number": 11,
        "roomType": "single room",
        "bidet": true,
        "bedSize": "twin",
        "numBeds": 2,
        "costPerNight": 207.24
      },
      {
        "number": 12,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "twin",
        "numBeds": 2,
        "costPerNight": 172.09
      },
    ];
    let roomTracker = new RoomTracker(rooms, bookings);
    roomTracker.filterRoomsByDate("2022/01/27");
    roomTracker.filterRoomsByRoomType("junior suite");
    expect(roomTracker.availableRoomsByDateAndFilter).to.be.a('array');
    expect(roomTracker.availableRoomsByDateAndFilter.length).to.equal(0);
    expect(roomTracker.filterRoomsByRoomType("junior suite")).to.equal(`We sincerely apologize, but no rooms match your search criteria!`);
  })
});
