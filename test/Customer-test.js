import chai from 'chai';
import { rooms, bookings, customers } from '../test/test-data';
import Customer from '../src/classes/Customer'
const expect = chai.expect;


describe('Customer', () => {
  let customer;
  let customer1;

  beforeEach(() => {
    customer = new Customer(customers[0], bookings, rooms);
    customer1 = new Customer({}, [], []);
  });
  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });
  it('Should instantiate a new instance of Customer', () => {
    expect(customer).to.be.an.instanceOf(Customer);
  });
  it('Should be able to store a user ID', () => {
    expect(customer.id).to.equal(1);
    expect(customer1.id).to.equal(undefined);
  });
  it('Should have a name', () => {
    expect(customer.name).to.equal("Leatha Ullrich");
    expect(customer1.name).to.equal(undefined);
  });
  it('Should be able to store bookings', () => {
    expect(customer.allBookings).to.be.a('array');
    expect(customer1.allBookings.length).to.equal(0);
  });
  it('Should be able to store rooms', () => {
    expect(customer.rooms).to.be.a('array');
    expect(customer1.rooms.length).to.equal(0);
  })
  it('Should be able to show all room bookings', () => {
    customer.findMyBookings();
    expect(customer.myBookings).to.be.a('array');
    expect(customer.myBookings).to.deep.equal([{
      "bookingNumber": "5fwrgu4i7k55hl6t8",
      "bookingDate": "02/05/2022",
      "cost": 172.09,
      "roomNumber": 12
    }])
    expect(customer1.myBookings.length).to.equal(0);
  });
  it('Should be able to calculate total cost of all bookings', () => {
    customer.findMyBookings();
    customer.calculateTotalCost();
    expect(customer.totalCost).to.equal(172.09);
    expect(customer1.totalCost).to.equal(undefined);
  })
});
