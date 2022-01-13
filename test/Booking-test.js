import chai from 'chai';
import { bookings } from '../test/test-data';
import Booking from '../src/classes/Booking'
const expect = chai.expect;

describe('Booking', () => {
  let booking;
  let booking1;

  beforeEach(() => {
    booking = new Booking(bookings[0]);
    booking1 = new Booking({});
  });
  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });
  it('Should instantiate a new instance of Booking', () => {
    expect(booking).to.be.an.instanceOf(Booking);
  });
  it('Should be able to store an ID', () => {
    expect(booking.id).to.equal("5fwrgu4i7k55hl6t8");
    expect(booking1.id).to.equal(undefined);
  });
  it('Should be able to store an associated userID', () => {
    expect(booking.userID).to.equal(1);
    expect(booking1.userID).to.equal(undefined);
  });
  it('Should be able to store a booking date', () => {
    expect(booking.date).to.equal("2022/02/05");
    expect(booking1.date).to.equal(undefined);
  });
  it('Should have an associated room number', () => {
    expect(booking.roomNumber).to.equal(12);
    expect(booking1.roomNumber).to.equal(undefined);
  })
});
