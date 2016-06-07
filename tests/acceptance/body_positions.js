'use strict';

var expect = require('chai').expect;
var Monkey = require('../../src/index.js');
var Utils = require('../utils');

var patchTarget;

var fnBodyDefault;

function insertVals(str, a, b) {
  console.log(str);
  return str.replace('(VAL-A)', a).replace('(VAL-B)', b).replace('(VAL-S)', a + b);
}

beforeEach(function () {
  fnBodyDefault = '-------Line: 0-------\n' +
      'Line: 1, a: (VAL-A)' + '\n' +
      'Line: 2, b: (VAL-B)' + '\n' +
      'Line: 3' + '\n' +
      'Line: 4' + '\n' +
      'Line: 5' + '\n' +
      'Line: 6' + '\n' +
      'Line: 7' + '\n' +
      'Line: 8' + '\n' +
      'Line: 9' + '\n' +
      'Line: 10: a + b: (VAL-S)' + '\n' +
      '-------Line: 11-------';

  patchTarget = {
    msg: function (a, b) {
      return '-------Line: 0-------\n' +
          'Line: 1, a: ' + a + '\n' +
          'Line: 2, b: ' + b + '\n' +
          'Line: 3' + '\n' +
          'Line: 4' + '\n' +
          'Line: 5' + '\n' +
          'Line: 6' + '\n' +
          'Line: 7' + '\n' +
          'Line: 8' + '\n' +
          'Line: 9' + '\n' +
          'Line: 10: a + b: ' + (a + b) + '\n' +
          '-------Line: 11-------';
    },
    oneLiner: function (a, b) {return 'OneLinerSum: ' + a + b;}// this function should be a single line
  };
});

describe('Body, modify at positions tests.', function () {

  describe('Check Inject at lines.', function () {

    describe('Check Inject Strings.', function () {

      it('Inject at single line.', function () {

        var injectionValue = '\'injection to line five(5)\' + ';

        var monkey = new Monkey({
          obj: patchTarget,
          method: 'msg',
          body: {
            positions: {
              5: injectionValue
            }
          }
        });

        console.log(monkey);

         var result = patchTarget.msg(2, 3);

        console.log(monkey);

        // console.log(12312312312);
        // var expectedFnBody = insertVals(fnBodyDefault, 2, 3);
        // expectedFnBody = Utils.insertAtStr(expectedFnBody, 5, injectionValue);
        // expect(result).to.be.equal(expectedFnBody);

      });

      // it('Inject at multiple lines.', function () {
      //
      //   new Monkey({
      //     obj: patchTarget,
      //     method: 'sum',
      //     body: {
      //       positions: {
      //         1: '// injection to line one(1)',
      //         5: '// injection to line five(5)',
      //         2: '// injection to line two(2)'
      //       }
      //     }
      //   });
      //
      // });
      //
      // it('Inject line to too big line number.', function () {
      //
      //   new Monkey({
      //     obj: patchTarget,
      //     method: 'sum',
      //     body: {
      //       positions: {
      //         999: '// injection to line 999'
      //       }
      //     }
      //   });
      //
      // });

    });

  //   describe('Check Inject Functions.', function () {
  //
  //     it('Inject at single line.', function () {
  //
  //       function injectAtLineFive(cb) {
  //         var result = '// injection to line five(5)';
  //         //TODO (S.Panfilov)
  //         cb();
  //         return result;
  //       }
  //
  //       new Monkey({
  //         obj: patchTarget,
  //         method: 'sum',
  //         body: {
  //           positions: {
  //             5: injectAtLineFive
  //           }
  //         }
  //       });
  //
  //     });
  //
  //     it('Inject at multiple lines.', function () {
  //
  //       function injectAtLineOne(cb) {
  //         //TODO (S.Panfilov)
  //         var result = '// injection to line one(1)';
  //         cb();
  //         return result;
  //       }
  //
  //       function injectAtLineTwo(cb) {
  //         //TODO (S.Panfilov)
  //         var result = '// injection to line two(2)';
  //         cb();
  //         return result;
  //       }
  //
  //       function injectAtLineFive(cb) {
  //         var result = '// injection to line five(5)';
  //         //TODO (S.Panfilov)
  //         cb();
  //         return result;
  //       }
  //
  //       new Monkey({
  //         obj: patchTarget,
  //         method: 'sum',
  //         body: {
  //           positions: {
  //             1: injectAtLineOne,
  //             5: injectAtLineTwo,
  //             2: injectAtLineFive
  //           }
  //         }
  //       });
  //
  //     });
  //
  //     it('Inject line to too big line number.', function () {
  //
  //       function injectAtLine999(cb) {
  //         var result = '// injection to line 999';
  //         //TODO (S.Panfilov)
  //         cb();
  //         return result;
  //       }
  //
  //       new Monkey({
  //         obj: patchTarget,
  //         method: 'sum',
  //         body: {
  //           positions: {
  //             999: injectAtLine999
  //           }
  //         }
  //       });
  //
  //     });
  //
  //   });
  //
  // });
  //
  // describe('Check Inject at lines and columns.', function () {
  //
  //   describe('Check Inject Strings.', function () {
  //
  //     it('Inject at single line and column.', function () {
  //
  //       new Monkey({
  //         obj: patchTarget,
  //         method: 'sum',
  //         body: {
  //           positions: {
  //             '5,3': '// injection to line five(5) and column three(3)'
  //           }
  //         }
  //       });
  //
  //     });
  //
  //     it('Inject at multiple lines and columns.', function () {
  //
  //       new Monkey({
  //         obj: patchTarget,
  //         method: 'sum',
  //         body: {
  //           positions: {
  //             5: '// injection to line five(5)',
  //             '5,5': '// injection to line five(5), column five(5)',
  //             '6,0': '// injection to line six(6), column zero(0)',
  //             4: '// injection to line four(4)',
  //             '6,1': '// injection to line six(6), column one(1)',
  //             '6,2': '// injection to line six(6), column two(2)',
  //             6: '// injection to line six(6)'
  //           }
  //         }
  //       });
  //
  //     });
  //
  //     it('Inject line to too big line and column number.', function () {
  //
  //       new Monkey({
  //         obj: patchTarget,
  //         method: 'sum',
  //         body: {
  //           positions: {
  //             '999, 1999': '// injection to line (999,1999)'
  //           }
  //         }
  //       });
  //
  //     });
  //
  //   });
  //
  //   describe('Check Inject Functions.', function () {
  //
  //     it('Inject at single line and column.', function () {
  //
  //       function injectAtLineFiveColumnThree(cb) {
  //         var result = '// injection to line five(5), column three(3)';
  //         //TODO (S.Panfilov)
  //         cb();
  //         return result;
  //       }
  //
  //       new Monkey({
  //         obj: patchTarget,
  //         method: 'sum',
  //         body: {
  //           positions: {
  //             '5,3': injectAtLineFiveColumnThree
  //           }
  //         }
  //       });
  //
  //     });
  //
  //     it('Inject at multiple lines and columns.', function () {
  //
  //
  //       function injectAtLineFour(cb) {
  //         var result = '// injection to line four(4)';
  //         //TODO (S.Panfilov)
  //         cb();
  //         return result;
  //       }
  //
  //       function injectAtLineFive(cb) {
  //         var result = '// injection to line five(5)';
  //         //TODO (S.Panfilov)
  //         cb();
  //         return result;
  //       }
  //
  //       function injectAtLineSix(cb) {
  //         var result = '// injection to line six(6)';
  //         //TODO (S.Panfilov)
  //         cb();
  //         return result;
  //       }
  //
  //       function injectAtLineFiveColumnFive(cb) {
  //         var result = '// injection to line five(5), column five(5)';
  //         //TODO (S.Panfilov)
  //         cb();
  //         return result;
  //       }
  //
  //       function injectAtLineSixColumnZero(cb) {
  //         var result = '// injection to line six(6), column zero(0)';
  //         //TODO (S.Panfilov)
  //         cb();
  //         return result;
  //       }
  //
  //       function injectAtLineSixColumnOne(cb) {
  //         var result = '// injection to line six(6), column one(1)';
  //         //TODO (S.Panfilov)
  //         cb();
  //         return result;
  //       }
  //
  //       function injectAtLineSixColumnTwo(cb) {
  //         var result = '// injection to line six(6), column two(2)';
  //         //TODO (S.Panfilov)
  //         cb();
  //         return result;
  //       }
  //
  //       new Monkey({
  //         obj: patchTarget,
  //         method: 'sum',
  //         body: {
  //           positions: {
  //             5: injectAtLineFive,
  //             '5,5': injectAtLineFiveColumnFive,
  //             '6,0': injectAtLineSixColumnZero,
  //             4: injectAtLineFour,
  //             '6,1': injectAtLineSixColumnOne,
  //             '6,2': injectAtLineSixColumnTwo,
  //             6: injectAtLineSix
  //           }
  //         }
  //       });
  //
  //     });
  //
  //     it('Inject line to too big line and column number.', function () {
  //
  //       function injectAtLine999Column1999(cb) {
  //         var result = '// injection to line (999,1999)';
  //         //TODO (S.Panfilov)
  //         cb();
  //         return result;
  //       }
  //
  //       new Monkey({
  //         obj: patchTarget,
  //         method: 'sum',
  //         body: {
  //           positions: {
  //             '999, 1999': injectAtLine999Column1999
  //           }
  //         }
  //       });
  //
  //     });
  //
  //   });
  //
  // });
  //
  // describe('Body all-in-one check.', function () {
  //
  //   it('Inject at single line and column.', function () {
  //
  //     function injectAtLineFour(cb) {
  //       var result = '// injection to line four(4)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     function injectAtLineFive(cb) {
  //       var result = '// injection to line five(5)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     function injectAtLineSix(cb) {
  //       var result = '// injection to line six(6)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     function injectAtLineFiveColumnFive(cb) {
  //       var result = '// injection to line five(5), column five(5)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     function injectAtLineSixColumnZero(cb) {
  //       var result = '// injection to line six(6), column zero(0)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     function injectAtLineSixColumnOne(cb) {
  //       var result = '// injection to line six(6), column one(1)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     function injectAtLineSixColumnTwo(cb) {
  //       var result = '// injection to line six(6), column two(2)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     function injectAtLine1024(cb) {
  //       var result = '// injection to line (1024)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     function injectAtLine666Column999(cb) {
  //       var result = '// injection to (666, 999)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     function injectAtLine666Column0(cb) {
  //       var result = '// injection to (666, 0)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     new Monkey({
  //       obj: patchTarget,
  //       method: 'sum',
  //       body: {
  //         positions: {
  //           '1,2': '// injection to line one(1) column two(2)',
  //           1: '// injection to line one(1)',
  //           '1,3': '// injection to line one(1) column three(3)',
  //           5: injectAtLineFive,
  //           '5,5': injectAtLineFiveColumnFive,
  //           '7,2': '// injection to line seven(7) column two(2)',
  //           '7,3': '// injection to line seven(7) column three(3)',
  //           '6,0': injectAtLineSixColumnZero,
  //           4: injectAtLineFour,
  //           '6,1': injectAtLineSixColumnOne,
  //           '6,2': injectAtLineSixColumnTwo,
  //           6: injectAtLineSix,
  //           1024: injectAtLine1024,
  //           '666,999': injectAtLine666Column999,
  //           '666,0': injectAtLine666Column0,
  //           1023: '// injection to line 1023',
  //           '777,888': '// injection to line (777,888)',
  //           '777,1': '// injection to line (777,1)'
  //         }
  //       }
  //     });
  //
  //   });
  //
  // });
  //
  // describe('Wrong keys checks.', function () {
  //
  //   it('Inject at multiple lines and columns.', function () {
  //
  //     function injectAtLineA(cb) {
  //       var result = '// injection to line A(A)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     function injectionWithSpaceLine5Column5(cb) {
  //       var result = '// injection to line five(5), column five(5)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     function injectAtColumnOne(cb) {
  //       var result = '// injection to BAD line, column one(1)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     function injectAtLineSixColumnTwo(cb) {
  //       var result = '// injection to line six(6), column two(2)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     function injectAtLineSeven(cb) {
  //       var result = '// injection to line seven(7)';
  //       //TODO (S.Panfilov)
  //       cb();
  //       return result;
  //     }
  //
  //     new Monkey({
  //       obj: patchTarget,
  //       method: 'sum',
  //       body: {
  //         positions: {
  //           'a': injectAtLineA,
  //           'b': '// injection to line B(B)',
  //           '5, 5': injectionWithSpaceLine5Column5,
  //           '6, 0': '// injection to line siz(6), column zero(0)',
  //           ',1': injectAtColumnOne,
  //           ',2': '// injection to BAD line, column two(2)',
  //           '6.2': injectAtLineSixColumnTwo,
  //           '6.3': '// injection to line six(6), column three(3)',
  //           '7,': injectAtLineSeven,
  //           '8,': '// injection to line eight(6)'
  //         }
  //       }
  //     });
  //
  //   });

  });

  //==============================================================

  // new Monkey({
  //   obj: patchTarget,
  //   method: 'sum',
  //   body: {
  //     positions: {
  //       1: '// injection to line one(1)',
  //       5: '// injection to line five(5)',
  //       2: '// injection to line two(2)',
  //       '6,10': '// Injection to line 6 column 10',
  //       '2,3': lineTwoColumnThreeInjectionFunc
  //     }
  //   }
  // });

  //==============================================================

  // it('Patch value from closure.', function () {
  //   var pureResult = patchTarget.sum(1, 1);
  //   expect(pureResult).equal(2);
  //   patchTarget.property = '';
  //
  //   var lineOneInjectionStr = 'this.property += \'-> injection on line 1\';';
  //   var lineFiveInjectionStr =
  //       'this.property += \'-> injection on line 5\';' +
  //       ' a += 1;\n' +
  //       'this.property += \'end of injection(5) ->\';';
  //
  //   var expectedStr;
  //   expectedStr = insertString(bodyStr, 5, lineFiveInjectionStr);
  //   expectedStr = insertString(expectedStr, 1, lineOneInjectionStr);
  //   expectedStr = insertString(expectedStr, 0, '!--before--!\n');
  //   expectedStr += '!--after---!\n';
  //
  //   function doItBefore(cb) {
  //     this.property += '!--before--!\n';
  //     //if (cb) cb();
  //   }
  //
  //   function doItAfter(cb) {
  //     this.property += '!--after---!\n';
  //     //if (cb) cb();
  //   }
  //
  //   new Monkey({
  //     obj: patchTarget,
  //     method: 'sum',
  //     before: doItBefore,
  //     after: doItAfter,
  //     1: lineOneInjectionStr,
  //     5: lineFiveInjectionStr
  //   });
  //
  //   //expect(patchTarget.property).equal(bodyStr);
  //   var patchedResult = patchTarget.sum(1, 1);
  //   expect(patchedResult).equal(3);
  //   console.log(patchTarget.property);
  //   expect(patchTarget.property).equal(expectedStr);
  // });
});
