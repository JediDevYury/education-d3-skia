import {ImageSourcePropType} from 'react-native';

export interface ActivityType {
  name: string;
  date: string;
  price: string;
  image: ImageSourcePropType;
  cardId: number;
}

export interface DataType {
  cardId: number;
  name: string;
  number: string;
  exp: string;
  cvv: string;
  type: string;
  image: ImageSourcePropType;
  backgroundColor: string;
  activity: ActivityType[];
}

const data: DataType[] = [
  {
    cardId: 1,
    name: 'John Doe',
    number: '1234 5678 9101 1121',
    exp: '12/29',
    cvv: '123',
    type: 'mastercard',
    image: require('../../assets/cards/Mastercard.png'),
    backgroundColor: '#6d85a4',
    activity: [
      {
        name: 'Netflix',
        date: '20 Min agp',
        price: '-$22.99',
        image: require('../../assets/cards/Netflix.png'),
        cardId: 1,
      },
      {
        name: 'Spotify',
        date: '1 Hour ago',
        price: '-$10.99',
        image: require('../../assets/cards/Spotify.png'),
        cardId: 1,
      },
      {
        name: 'Apple Music',
        date: '6 Hour ago',
        price: '-$10.99',
        image: require('../../assets/cards/AppleMusic.png'),
        cardId: 1,
      },
      {
        name: 'Paypal',
        date: '1 Day ago',
        price: '+$1200',
        image: require('../../assets/cards/Paypal.png'),
        cardId: 1,
      },
      {
        name: 'Youtube Premium',
        date: '1 Day ago',
        price: '-$10.99',
        image: require('../../assets/cards/Youtube.png'),
        cardId: 1,
      },
      {
        name: 'Apple TV',
        date: '2 Day ago',
        price: '-$50.99',
        image: require('../../assets/cards/AppleTV.png'),
        cardId: 1,
      },
      {
        name: 'Steam',
        date: '2 Day ago',
        price: '-$50.99',
        image: require('../../assets/cards/Steam.png'),
        cardId: 1,
      },
    ],
  },
  {
    cardId: 2,
    name: 'Gerald Nathaniel',
    number: '1234 5678 9101 1121',
    exp: '12/29',
    cvv: '123',
    type: 'visa',
    image: require('../../assets/cards/Visa.png'),
    backgroundColor: '#86b4ee',
    activity: [
      {
        name: 'Paypal',
        date: '5 Min agp',
        price: '+$700',
        image: require('../../assets/cards/Paypal.png'),
        cardId: 2,
      },
      {
        name: 'Steam',
        date: '40 min ago',
        price: '-$50.99',
        image: require('../../assets/cards/Steam.png'),
        cardId: 2,
      },
    ],
  },
  {
    cardId: 3,
    name: "Jane Doe",
    number: '1234 5678 9101 1121',
    exp: '12/29',
    cvv: '123',
    type: 'visa',
    image: require('../../assets/cards/Visa.png'),
    backgroundColor: '#795de7',
    activity: [
      {
        name: 'Apple TV',
        date: '25 Min ago',
        price: '-$50.99',
        image: require('../../assets/cards/AppleTV.png'),
        cardId: 3,
      },
      {
        name: 'Paypal',
        date: '3 Hour agp',
        price: '+$900',
        image: require('../../assets/cards/Paypal.png'),
        cardId: 3,
      },
      {
        name: 'Spotify',
        date: '10 Hour ago',
        price: '-$10.99',
        image: require('../../assets/cards/Spotify.png'),
        cardId: 3,
      },
    ],
  },
  {
    cardId: 4,
    name: 'John Doe',
    number: '1234 5678 9101 1121',
    exp: '12/29',
    cvv: '123',
    type: 'mastercard',
    image: require('../../assets/cards/Mastercard.png'),
    backgroundColor: '#6d85a4',
    activity: [
      {
        name: 'Netflix',
        date: '20 Min agp',
        price: '-$22.99',
        image: require('../../assets/cards/Netflix.png'),
        cardId: 41,
      },
      {
        name: 'Spotify',
        date: '1 Hour ago',
        price: '-$10.99',
        image: require('../../assets/cards/Spotify.png'),
        cardId: 42,
      },
      {
        name: 'Apple Music',
        date: '6 Hour ago',
        price: '-$10.99',
        image: require('../../assets/cards/AppleMusic.png'),
        cardId: 43,
      },
      {
        name: 'Paypal',
        date: '1 Day ago',
        price: '+$1200',
        image: require('../../assets/cards/Paypal.png'),
        cardId: 44,
      },
      {
        name: 'Youtube Premium',
        date: '1 Day ago',
        price: '-$10.99',
        image: require('../../assets/cards/Youtube.png'),
        cardId: 45,
      },
      {
        name: 'Apple TV',
        date: '2 Day ago',
        price: '-$50.99',
        image: require('../../assets/cards/AppleTV.png'),
        cardId: 46,
      },
      {
        name: 'Steam',
        date: '2 Day ago',
        price: '-$50.99',
        image: require('../../assets/cards/Steam.png'),
        cardId: 47,
      },
    ],
  },
  {
    cardId: 5,
    name: 'Gerald Nathaniel',
    number: '1234 5678 9101 1121',
    exp: '12/29',
    cvv: '123',
    type: 'visa',
    image: require('../../assets/cards/Visa.png'),
    backgroundColor: '#86b4ee',
    activity: [
      {
        name: 'Paypal',
        date: '5 Min agp',
        price: '+$700',
        image: require('../../assets/cards/Paypal.png'),
        cardId: 51,
      },
      {
        name: 'Steam',
        date: '40 min ago',
        price: '-$50.99',
        image: require('../../assets/cards/Steam.png'),
        cardId: 52,
      },
    ],
  },
  {
    cardId: 6,
    name: "Jane Doe",
    number: '1234 5678 9101 1121',
    exp: '12/29',
    cvv: '123',
    type: 'visa',
    image: require('../../assets/cards/Visa.png'),
    backgroundColor: '#795de7',
    activity: [
      {
        name: 'Apple TV',
        date: '25 Min ago',
        price: '-$50.99',
        image: require('../../assets/cards/AppleTV.png'),
        cardId: 63,
      },
      {
        name: 'Paypal',
        date: '3 Hour agp',
        price: '+$900',
        image: require('../../assets/cards/Paypal.png'),
        cardId: 63,
      },
      {
        name: 'Spotify',
        date: '10 Hour ago',
        price: '-$10.99',
        image: require('../../assets/cards/Spotify.png'),
        cardId: 63,
      },
    ],
  },
];

export {data};
