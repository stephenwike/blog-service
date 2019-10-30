
// var f = require('./testfixture');
// const cmd = require('../api/orm-commands');
// const pg = require('../api/postgres-dataaccess');
// var assert = require('assert');

// describe('Controller', function () {

//   describe('Author', function () {
//     let type = pg.Author;

//     it('should should be able to create a new author.', async () => {
//       let expectedValue = { name: "billy" };
//       let result = await cmd.Create(type, expectedValue);
//       assert(expectedValue.name === result.dataValues.name);
//     });

//     it('should be able to fetch an auther by its id', (done) => {
//       let author = { name: "susie" };
//       cmd.Create(type, author).then(authorResult => {
//         cmd.GetById(type, authorResult.dataValues.id).then(result => {
//           assert(author.name === result.dataValues.name);
//           done();
//         })
//       });
//     });

//     it('should be able to update author', (done) => {
//       let author = { name: "jack" };
//       cmd.Create(type, author).then(authorResult => {
//         let updateId = authorResult.dataValues.id;
//         cmd.GetById(type, updateId).then(preResult => {

//           // Update Name
//           let oldname = preResult.dataValues.name;
//           let update = { id: updateId, name: "new Jack" };
//           cmd.Update(type, update).then(updatedResult => {
//             cmd.GetById(type, updatedResult[1][0].dataValues.id).then(result => {
//               assert(result.dataValues.name = update.name);
//               assert(oldname === author.name);
//               assert(result.dataValues.name != oldname);
//               done();
//             })
//           })
//         })
//       })
//     })

//     it('should be able to retrieve list of authors', (done) => {
//       cmd.Create(type, { name: "john"}).then(r1 => {
//         cmd.Create(type, { name: "jacob"}).then(r2 => {
//           cmd.Create(type, { name: "jingle"}).then(r3 => {
//             cmd.GetAll(type).then(result => {
//               assert(result.length > 2);
//               done();
//             })
//           })
//         })
//       })
//     })

//     it('should be able to delete an author by id', (done) => {
//       cmd.Create(type, { name: "john"}).then(r => {
//         let author = r.dataValues;
//         cmd.GetById(type, author.id).then(r2 => {
//           // console.log(r2);
//           assert(r2.dataValues);
//           assert(r2.dataValues.name === "john");
//           cmd.Delete(type, author).then(r3 => {
//             assert(r3 === 1);
//             cmd.GetById(type, author.id).then(result => {
//               assert(author.id);
//               assert(!result);
//               done();
//             }) 
//           })
//         })
//       })
//     })

//   });
// });