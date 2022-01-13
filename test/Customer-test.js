import chai from 'chai';
import { rooms, bookings, customers } from '../test/test-data';
import Customer from '../src/classes/Customer'
const expect = chai.expect;


describe('Customer', () => {
  let customer;
  let customer1;

  beforeEach(() => {
    customer = new Customer(customers[0]);
    customer1 = new Customer({});
  });
  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });
  it('Should instantiate a new instance of Customer', () => {
    expect(customer).to.be.an.instanceOf(Customer);
  });
});
