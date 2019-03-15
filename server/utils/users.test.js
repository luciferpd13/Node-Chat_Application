const expect = require('expect');
const {Users} = require('./users');

describe('Users',()=>{
  var users;

  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: '1',
      name : 'Pd',
      room : "yo"
    },{
      id: '2',
      name : 'pp',
      room : "yooo"
    },{
      id: '3',
      name : 'Pd jr',
      room : "yo"
    }];
  });

it('Should add New User', ()=>{
  var users = new Users();
  var user = {
    id :123,
    name: "Prasanna",
    room: "PD"
  };
});

it('Should return names for yo', ()=>{
    var userList = users.getUserList('yo');

  expect(userList).toEqual(['Pd','Pd jr']);
});

it('Should remove a user', ()=>{
var userId = '1';
var user = users.removeUser(userId);

  expect(user.id).toBe(userId);
  expect(users.users.length).toBe(2);s
});

it('Should not remove a user', ()=>{
  var userId = '99';
  var user = users.removeUser(userId);

  expect(user).toBeFalsy();
  expect(users.users.length).toBe(3);
});

it('Should find a user', ()=>{
 var userId = '2';
 var user = users.getUser(userId);

expect(user.id).toBe(userId);
});

it('Should not find a user', ()=>{
  var userId = '99';
  var user = users.getUser(userId);

 expect(user).toBeFalsy();

});


it('Should return names for yooo', ()=>{
  var userList = users.getUserList('yooo');

expect(userList).toEqual(['pp']);

});



});
