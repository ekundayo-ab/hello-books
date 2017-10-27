/* eslint-disable */
'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Books', [
      {
        isbn : 1,
        title : 'The Amazing Adventures of Kavalier & Clay',
        author: 'Michael Chabon',
        quantity : 45,
        description: 'The Amazing Adventures of Kavalier & Clay is a 2000 novel by Jewish American author Michael Chabon that won the Pulitzer Prize for Fiction in 2001.',
        category: 'Arts',
        image: 'https://res.cloudinary.com/dcl7tqhww/image/upload/v1509138852/emfohjtwnjz1crabccy4.png',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        isbn : 2,
        title : 'Half of a Yellow Sun',
        author: 'Chimamanda Ngozi Adichie',
        quantity : 32,
        description: 'Half of a Yellow Sun is a novel by Nigerian author Chimamanda Ngozi Adichie. Published in 2006 by Knopf/Anchor, the novel tells the story of the Biafran War through the perspective of the characters Olanna, Ugwu, and Richard.',
        category: 'Arts',
        image: 'http://res.cloudinary.com/dcl7tqhww/image/upload/v1509139535/ycj4vsbhobcxiowafaas.png',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        isbn : 3,
        title : 'The Corrections',
        author: 'Jonathan Franzen',
        quantity : 14,
        description: 'The Corrections is a 2001 novel by American author Jonathan Franzen. It revolves around the troubles of an elderly Midwestern couple and their three adult children, tracing their lives from the mid-20th',
        category: 'Arts',
        image: 'http://res.cloudinary.com/dcl7tqhww/image/upload/v1509139550/dre2kfd1k36yfdsnihbf.png',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        isbn : 4,
        title : 'Wolf Hall',
        author: 'Hilary Mantel',
        quantity : 10,
        description: 'Wolf Hall is a historical novel by English author Hilary Mantel, published by Fourth Estate, named after the Seymour family seat of Wolfhall or Wulfhall in Wiltshire.',
        category: 'Arts',
        image: 'http://res.cloudinary.com/dcl7tqhww/image/upload/v1509139539/w9wpuonkyguo32i90mg8.png',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        isbn : 5,
        title : 'White Teeth',
        author: 'Zadie Smith',
        quantity : 21,
        description: 'White Teeth is a 2000 novel by the British author Zadie Smith. It focuses on the later lives of two wartime friends—the Bangladeshi Samad Iqbal and the Englishman Archie Jones—and their families in London.',
        category: 'Arts',
        image: 'http://res.cloudinary.com/dcl7tqhww/image/upload/v1509139546/vzlhfphllnevgtff3oej.png',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        isbn : 6,
        title : 'Gilead',
        author: 'Marilynne Robinson',
        quantity : 11,
        description: 'Gilead is a novel written by Marilynne Robinson that was published in 2004. Gilead won the 2005 Pulitzer Prize for Fiction, as well as the National Book Critics Circle Award.',
        category: 'Arts',
        image: 'http://res.cloudinary.com/dcl7tqhww/image/upload/v1509139554/kf18x2ukcnygh6bau1o2.png',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Books', null, {});
  }
};
