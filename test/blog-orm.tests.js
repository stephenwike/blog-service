var f = require('./testfixture');
const cmd = require('../api/orm/orm-commands');
var assert = require('assert');

describe('ORM Commands', function () {

  afterEach(f.AfterEach);
  for (let entity of f.TestEntities) {

    describe(entity.name, function () {
      let type = entity.type;

      beforeEach((done) => {
        console.log(`can prepopulate data for table ${entity.name}`);
        entity.Setup(done);
      });

      it(`should be able to create a new ${entity.name}.`, async () => {
        let expectedValue = entity.CreateOfType;
        let result = await cmd.Create(type, expectedValue);
        assert(expectedValue[entity.CreateProp]);
        assert(expectedValue[entity.CreateProp] === result.dataValues[entity.CreateProp]);
      });

      it(`should be able to fetch an ${entity.name} by its id`, (done) => {
        let model = entity.FetchCreateOfType;
        cmd.Create(type, model).then(typeResult => {
          cmd.GetById(type, typeResult.dataValues.id).then(result => {
            assert(model[entity.CreateProp] === result.dataValues[entity.CreateProp]);
            done();
          })
        });
      });

      it(`should be able to update ${entity.name}`, (done) => {
        let model = entity.UpdateCreateOfType;
        cmd.Create(type, model).then(modelResult => {
          let updateId = modelResult.dataValues.id;
          cmd.GetById(type, updateId).then(preResult => {

            // Update Name
            let oldProp = preResult.dataValues[entity.CreateProp];
            let updateModel = preResult.dataValues;
            updateModel[entity.UpdateProp] = entity.UpdateValue;
            cmd.Update(type, updateModel).then(updatedResult => {
              cmd.GetById(type, updatedResult[1][0].dataValues.id).then(result => {
                assert(result.dataValues[entity.UpdateProp] === updateModel[entity.UpdateProp]);
                assert(oldProp === model[entity.CreateProp]);
                assert(result.dataValues[entity.UpdateProp] != oldProp);
                done();
              })
            })
          })
        })
      })

      it(`should be able to retrieve list of ${entity.name}`, (done) => {
        cmd.Create(type, entity.Create1).then(r1 => {
          cmd.Create(type, entity.Create2).then(r2 => {
            cmd.Create(type, entity.Create3).then(r3 => {
              cmd.GetAll(type).then(result => {
                assert(result.length > 2);
                done();
              })
            })
          })
        })
      })

      it(`should be able to delete an ${entity.name} by id`, (done) => {
        cmd.Create(type, entity.EntityToDelete).then(r => {
          let model = r.dataValues;
          cmd.GetById(type, model.id).then(r2 => {
            assert(r2.dataValues);
            assert(r2.dataValues[entity.CreateProp] === model[entity.CreateProp]);
            cmd.Delete(type, model).then(r3 => {
              assert(r3 === 1);
              cmd.GetById(type, model.id).then(result => {
                assert(model.id);
                assert(!result);
                done();
              })
            })
          })
        })
      })
    });
  }

});