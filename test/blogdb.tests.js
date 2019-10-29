
var f = require('./testfixture');
const pg = require('../api/postgres-dataaccess');
var assert = require('assert');

describe('Controller', function () {

  describe('Author', function () {

    it('should should be able to create a new author.', async () => {
      let expectedValue = { name: "billy" };
      let result = await pg.CreateAuthor(expectedValue);
      assert(expectedValue.name === result.dataValues.name, `Actual value was ${result.dataValues.name} when expecting ${expectedValue.name}`);
    });

    it('should be able to fetch an auther by its id', (done) => {
      let author = { name: "susie" };
      pg.CreateAuthor(author).then(authorResult => {
        pg.GetAuthorById(authorResult.dataValues.id).then(result => {
          assert(author.name === result[0].dataValues.name);
          done();
        })
      });
    });

    it('should be able to update author', (done) => {
      let author = { name: "jack" };
      pg.CreateAuthor(author).then(authorResult => {
        let updateId = authorResult.dataValues.id;
        pg.GetAuthorById(updateId).then(preResult => {

          // Update Name
          let oldname = preResult[0].dataValues.name;
          let update = { id: updateId, name: "new Jack" };
          pg.UpdateAuthor(update).then(updatedResult => {
            pg.GetAuthorById(updatedResult[1][0].dataValues.id).then(result => {
              assert(result[0].dataValues.name = update.name);
              assert(oldname === author.name);
              assert(result[0].dataValues.name != oldname);
              done();
            })
          })
        })
      })
    })
  });
});