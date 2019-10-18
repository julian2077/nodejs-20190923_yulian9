const users = [
  {name: 'Andrey'},
  {name: 'Dmitry'},
  {name: 'Ivan'},
  {name: 'Anna'},
  {name: 'Victoria'},
];

const indexByName = {
  Andrey: users[0],
  Dmitry: users[1],
  Ivan: users[2],
  Anna: users[3],
  Victoria: users[4],
};

function findByName(name) {
  // return users.find(u => u.name === name);
  return indexByName[name];
}

const user1 = findByName('Anna');
const user2 = findByName('Andrey');
