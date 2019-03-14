var expect = require('expect');
var {generatemessage,generateLocationMessage} = require("./message");

describe('generatemessage',()=>{
 it('Should generate correct message object',()=>{
      var from = "PD";
      var text = "Hello"
      var res = generatemessage(from,text);

/* -------------- NOTE -----------------

Mark that expect has been donated to jest you can view documentation
at there website

therfore they have changed few things in expect

below the commented one are previouse expect functions
and just below them are the new updated functions which have
replaced them

*/

      // expect(res.createdAt).toBeA('number');
       expect(typeof res.createdAt).toBe('number');

    // to include will check wheater you are sending from or text
    //  expect(res).toInclude({
      expect(res).toMatchObject({
        from,
        text
      });
 });
});


describe('generateLocationMessage',()=>{
 it('Should generate correct location object',()=>{
      var from = "PD";
      var latitude = 1;
      var longitude = 1;
      var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      var res = generateLocationMessage(from,latitude,longitude);
      expect(typeof res.createdAt).toBe('number');

      expect(res).toMatchObject({
        from,
        url
      });
 });
});
