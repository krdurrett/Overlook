import chai from 'chai';
import { bookings } from '../test/test-data';
import Booking from '../src/classes/Booking'
const expect = chai.expect;

describe('Booking', () => {
  let booking;

  beforeEach(() => {
    booking = new Booking(bookings[0]);
  });
  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });
  it('Should instantiate a new instance of Booking', () => {
    expect(booking).to.be.an.instanceOf(Booking);
  });
  it('Should be able to store an ID', () => {
    expect(booking.id).to.equal("5fwrgu4i7k55hl6t8");
  })
});
