import chai from 'chai';
import { rooms } from '../test/test-data';
import Room from '../src/classes/Room'
const expect = chai.expect;

describe('Room', () => {
  let room;
  let room1;

  beforeEach(() => {
    room = new Room(rooms[0]);
    room1 = new Room({});
  });
  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });
  it('Should instantiate a new instance of Room', () => {
    expect(room).to.be.an.instanceOf(Room);
  });
  it('Should have a room number', () => {
    expect(room.number).to.equal(1);
    expect(room1.number).to.equal(undefined);
  });
  it('Should have a room type', () => {
    expect(room.roomType).to.equal("residential suite");
    expect(room1.roomType).to.equal(undefined);
  });
  it('Should be able to reflect whether or not it has a bidet', () => {
    expect(room.hasBidet).to.equal(true);
    expect(room1.hasBidet).to.equal(undefined);
  });
  it('Should have a bed size', () => {
    expect(room.bedSize).to.equal("queen");
    expect(room1.bedSize).to.equal(undefined);
  });
  it('Should have a bed count', () => {
    expect(room.numBeds).to.equal(1);
    expect(room1.numBeds).to.equal(undefined);
  });
  it('Should have a cost per night', () => {
    expect(room.costPerNight).to.equal(358.4);
    expect(room1.costPerNight).to.equal(undefined);
  });
});
