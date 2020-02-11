export let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Exploratorium',
    description: 'Fun place to go when visiting the city',
    image: 'https://bayareane.ws/2LV2C0W',
    address: 'Pier 15, The Embarcadero, San Francisco, CA 94111',
    coordinates: {
      lat: 37.7989102,
      lng: -122.4074185
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Coit Tower',
    description: 'Fun place to go when visiting the city',
    image: 'https://bit.ly/38DhXNp',
    address: '1 Telegraph Hill Blvd, San Francisco, CA 94133',
    coordinates: {
      lat: 37.8023949,
      lng: -122.4058222
    },
    creator: 'u2'
  }
]

export const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Steven McHenry',
    email: 'WEOW@gmail.com',
    password: '123'
  },
  {
    id: 'u2',
    name: 'Tim McHenry',
    email: 'WEOW22@gmail.com',
    password: '123'
  }
]

export const setDUMMY_PLACES = (NEW_DUMMY_PLACES) => {
  DUMMY_PLACES = NEW_DUMMY_PLACES
}
