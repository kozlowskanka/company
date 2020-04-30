const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw an error if some arg is missed', () => {
        const empl1 = new Employee({ lastName: 'Smith', department: 'IT'});
        const empl2 = new Employee({ firstName: 'Michael', department: 'IT'});
        const empl3 = new Employee({ firstName: 'Michael', lastName: 'Smith' });
      
        const cases = [empl1, empl2, empl3];

        for (let empl of cases) {
            empl.validate(err => {
            expect(err.errors).to.exist;
            });
        }
    });

    it('should throw an error if arg is not a string', () => {
        const empl1 = new Employee({ firstName: [], lastName: 'Smith', department: 'IT'});
        const empl2 = new Employee({ firstName: 'Michael', lastName: [], department: 'IT'});
        const empl3 = new Employee({ firstName: 'Michael', lastName: 'Smith', department: [] });
    
        const cases = [empl1, empl2, empl3];

        for (let empl of cases) {
          empl.validate(err => {
            expect(err.errors).to.exist;
          });
        }
      });

    it('should not throw an error if "firstName", "lastName", "department" is okay', () => {

        const empl = new Employee({ firstName: 'Michael', lastName: 'Smith', department: 'IT' });

        empl.validate(err => {
        expect(err).to.not.exist;
        });
    });

    after(() => {
        mongoose.models = {};
    });

  });