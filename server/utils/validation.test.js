const expect = require("expect");
const {isRealString} = require("./validation");

describe('isRealString',()=>{
      it('Should reject non-string values',()=>{
          var name = 1;
          var res = isRealString(name)
          expect(res).toBe(false);
      });

      it('Should reject string with only spaces',()=>{
        var res = isRealString('  ')
        expect(res).toBe(false);
      });

      it('Should allow string with non-space characters',()=>{
        var res = isRealString(' Prasanna ')
        expect(res).toBe(true);
      });

    });
