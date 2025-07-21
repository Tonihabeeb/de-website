export interface Office {
  id: string;
  name: string;
  address: string;
  position: [number, number];
}

const offices: Office[] = [
  {
    id: 'erbil',
    name: 'Erbil Headquarters',
    address: 'Roya Tower A 1-14, Erbil-44001, Iraq',
    position: [36.1909, 44.0096],
  },
  {
    id: 'basra',
    name: 'Basra Office',
    address: 'Al Muhendisen - Al Zubair Road, Basra, Iraq',
    position: [30.5086, 47.7803],
  },
];

export default offices;
