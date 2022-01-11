const customers = [
  {
    "id": 1,
    "name": "Leatha Ullrich"
  },
  {
    "id": 2,
    "name": "Rocio Schuster"
  },
  {
    "id": 3,
    "name": "Kelvin Schiller"
  },
  {
    "id": 4,
    "name": "Kennedi Emard"
  },
  {
    "id": 5,
    "name": "Rhiannon Little"
  },
  {
    "id": 6,
    "name": "Fleta Schuppe"
  },
  {
    "id": 7,
    "name": "Dell Rath"
  },
  {
    "id": 8,
    "name": "Era Hand"
  },
  {
    "id": 9,
    "name": "Faustino Quitzon"
  },
  {
    "id": 10,
    "name": "Tony Armstrong"
  }
]

const bookings = [
  {
    "id": "5fwrgu4i7k55hl6t8",
    "userID": 1,
    "date": "2022/02/05",
    "roomNumber": 12,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6ti",
    "userID": 6,
    "date": "2022/01/22",
    "roomNumber": 11,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6tk",
    "userID": 7,
    "date": "2022/01/27",
    "roomNumber": 20,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6tl",
    "userID": 3,
    "date": "2022/01/10",
    "roomNumber": 8,
    "roomServiceCharges": []
  },
  {
   "id": "5fwrgu4i7k55hl6tv",
   "userID": 5,
   "date": "2022/01/19",
   "roomNumber": 21,
   "roomServiceCharges": []
 },
 {
    "id": "5fwrgu4i7k55hl6u0",
    "userID": 4,
    "date": "2022/01/08",
    "roomNumber": 5,
    "roomServiceCharges": []
  },
  {
   "id": "5fwrgu4i7k55hl6ua",
   "userID": 10,
   "date": "2022/01/30",
   "roomNumber": 12,
   "roomServiceCharges": []
 },
 {
   "id": "5fwrgu4i7k55hl6ub",
   "userID": 8,
   "date": "2022/02/09",
   "roomNumber": 17,
   "roomServiceCharges": []
 },
 {
   "id": "5fwrgu4i7k55hl6ur",
   "userID": 8,
   "date": "2022/02/23",
   "roomNumber": 23,
   "roomServiceCharges": []
 },
 {
    "id": "5fwrgu4i7k55hl6uf",
    "userID": 2,
    "date": "2022/01/09",
    "roomNumber": 18,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6uy",
    "userID": 2,
    "date": "2022/01/24",
    "roomNumber": 19,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6v2",
    "userID": 10,
    "date": "2022/02/27",
    "roomNumber": 23,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6v3",
    "userID": 3,
    "date": "2022/02/07",
    "roomNumber": 23,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6va",
    "userID": 8,
    "date": "2022/02/01",
    "roomNumber": 13,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6vn",
    "userID": 4,
    "date": "2022/02/20",
    "roomNumber": 1,
    "roomServiceCharges": []
  },
  {
   "id": "5fwrgu4i7k55hl6vr",
   "userID": 5,
   "date": "2022/01/19",
   "roomNumber": 14,
   "roomServiceCharges": []
 },
 {
    "id": "5fwrgu4i7k55hl6vu",
    "userID": 9,
    "date": "2022/01/16",
    "roomNumber": 23,
    "roomServiceCharges": []
  }
]

const rooms = [
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
  {
    "number": 5,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 340.17
  },
  {
    "number": 8,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 261.26
  },
  {
    "number": 13,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 423.92
  },
  {
    "number": 14,
    "roomType": "residential suite",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 1,
    "costPerNight": 457.88
  },
  {
    "number": 17,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 2,
    "costPerNight": 328.15
  },
  {
    "number": 18,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 2,
    "costPerNight": 496.41
  },
  {
    "number": 19,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 374.67
  },
  {
   "number": 20,
   "roomType": "residential suite",
   "bidet": false,
   "bedSize": "queen",
   "numBeds": 1,
   "costPerNight": 343.95
 },
 {
   "number": 21,
   "roomType": "single room",
   "bidet": false,
   "bedSize": "full",
   "numBeds": 2,
   "costPerNight": 429.32
 },
 {
    "number": 23,
    "roomType": "residential suite",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 176.36
  }
]
