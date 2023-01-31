import { Tags } from "./app/shared/model/tag";
import { Watch } from "./app/shared/model/watch";

export const WATCHES: Watch[] = [
  {
    id:'1',
    name: 'Zinvo Blade',
    cookTime: '10-20',
    price: 350,
    favorite: false,
    origins: ['italy'],
    stars: 4.5,
    imageUrl: 'assets/Zinvo-Blade-Bryce-Zinvo-Bryce.png',
    tags: ['Zinvo', 'Hot', 'Cool'],
  },
  {
    id:'2',
    name: 'Zinvo',
    price: 300,
    cookTime: '20-30',
    favorite: true,
    origins: ['persia', 'middle east', 'china'],
    stars: 4.7,
    imageUrl: 'assets/Zinvo.png',
    tags: ['Zinvo', 'Cool'],
  },
  {
    id:'3',
    name: 'ZinvoBlade-Gold',
    price: 400,
    cookTime: '10-15',
    favorite: false,
    origins: ['germany', 'us'],
    stars: 3.5,
    imageUrl: 'assets/ZinvoBlade-Gold.png',
    tags: ['Zinvo', 'Golden'],
  },
  {
    id:'4',
    name: 'ZinvoBlade Nitro',
    price: 320,
    cookTime: '15-20',
    favorite: true,
    origins: ['belgium', 'france'],
    stars: 3.3,
    imageUrl: 'assets/ZinvoBlade-Nitro-Nitro34Side.png',
    tags: ['Zinvo', 'Hot'],
  },
  {
    id:'5',
    name: 'ZinvoBlade Spirit',
    price: 300,
    cookTime: '40-50',
    favorite: false,
    origins: ['india', 'asia'],
    stars: 3.0,
    imageUrl: 'assets/ZinvoBlade-Spirit-p.png',
    tags: ['Zenvo', 'Cool'],
  },
]

export const watch_tags:Tags[] = [
  { name: 'All', count: 5 },
  { name: 'Zinvo', count: 5 },
  { name: 'Pizza', count: 2 },
  { name: 'Lunch', count: 3 },
  { name: 'SlowFood', count: 2 },
  { name: 'Hamburger', count: 1 },
  { name: 'Fry', count: 1 },
  { name: 'Soup', count: 1 },
]

