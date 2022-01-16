import chai from 'chai';
import { rooms, bookings, customers } from '../test/test-data';
import Manager from '../src/classes/Manager'
const expect = chai.expect;

describe('Manager', () => {
  let manager;
  let manager1;

  beforeEach(() => {
    manager = new Manager(bookings, rooms, customers);
    manager1 = new Manager([], [], []);
  });
  it('should be a function', () => {
    expect(Manager).to.be.a('function');
  });
  it('Should instantiate a new instance of Manager', () => {
    expect(manager).to.be.an.instanceOf(Manager);
  });
  it('Should be able to store all bookings', () => {
    expect(manager.bookings).to.be.a('array');
    expect(manager1.bookings.length).to.equal(0);
  });
  it('Should be able to store all rooms', () => {
    expect(manager.rooms).to.be.a('array');
    expect(manager1.rooms.length).to.equal(0);
  });
  it('Should be able to store all customers', () => {
    expect(manager.customers).to.be.a('array');
    expect(manager1.customers.length).to.equal(0);
  });
  it('Should be able to show all rooms available for todays date', () => {
    manager.getAvailableRoomsByDate("2022/01/24");
    manager1.getAvailableRoomsByDate("2022/01/24");
    expect(manager.availableRoomsByDate).to.be.a('array');
    expect(manager.availableRoomsByDate.length).to.equal(12);
    expect(manager1.availableRoomsByDate.length).to.equal(0);
  });
  it('Should be able to show total revenue for todays date', () => {
    manager.getTodaysRevenue("2022/01/24");
    manager1.getTodaysRevenue("2022/01/24");
    expect(manager.todaysRevenue).to.equal(374.67);
    expect(manager1.todaysRevenue).to.equal(0);
  });
  it('Should show percentage of rooms booked for todays date', () => {
    manager.getPercentageBooked("2022/01/24");
    manager1.getPercentageBooked("2022/01/24");
    expect(manager.percentageBooked).to.equal(8);
    expect(manager1.percentageBooked).to.deep.equal(NaN);
  })
  it('Should be able to find a customer by name', () => {
    manager.findCustomer("Rhiannon Little");
    manager1.findCustomer("Rhiannon Little");
    expect(manager.customer).to.be.an('object');
    expect(manager.customer).to.deep.equal({
      "id": 5,
      "name": "Rhiannon Little"
    })
    expect(manager1.customer).to.equal(undefined);
  });
});
