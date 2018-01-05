/**
 * @description hardcoded users details for testing
 */
export default {
  firstUser: {
    decoded: {
      data: {
        id: 10,
        username: 'ekundayo',
        password:
        '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
        email: 'ekprogs@gmail.com',
        role: 'admin',
        level: 'bronze',
      },
      iat: 1504038990,
      exp: 1504042590,
    },
  },
  secondUser: {
    decoded: {
      data: {
        id: 10,
        username: 'ekundayo',
        password:
        '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
        email: 'ekprogs@gmail.com',
        role: 'normal',
        level: 'bronze',
      },
      iat: 1504038990,
      exp: 1504042590,
    },
  },
  thirdUser: {
    username: 'ekundayo',
    password: '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
    email: 'ekprogs@gmail.com',
  },
  fourthUser: {
    username: 'ekundayo',
    password: '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
    email: 'ekprogs',
  },
  fifthUser: {
    username: 'ekundayo',
    password: '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
    email: 'ekprogs@gmail',
  },
  sixthUser: {
    username: 'emma',
    password: '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
    email: 'emma@gmail.com',
  },
  seventhUser: {
    username: 'kate',
    password: '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
    email: 'emma@gmail.com',
  },
  eighthUser: {
    username: '',
    password: 'calmsecret',
    email: 'calm@gmail.com',
  },
  eigthUserVariantOne: {
    username: 'good',
    password: '',
    email: 'good@gmail.com',
  },
  eightUserVariantTwo: {
    username: 'gentle',
    password: 'gentlesecret',
    email: '',
  },
  ninthUser: {
    username: 'pate',
    password: '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
    email: 'pate@gmail.com',
  },
  ninthUserVariantOne: {
    body: {
      username: '   murphus',
      password: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      passwordConfirmation: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      email: 'murphus@gmail.com'
    }
  },
  ninthUserVariantTwo: {
    body: {
      username: '',
      password: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      passwordConfirmation: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      email: 'murphus@gmail.com'
    }
  },
  ninthUserVariantThree: {
    body: {
      username: 'lincoln',
      password: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      passwordConfirmation: 'bhVaz30gNLdCmqbZYuRIPQulAB/Sg',
      email: 'murphus@gmail.com'
    }
  },
  ninthUserVariantFour: {
    body: {
      oldPass: '',
      newPass: '',
      newPassConfirm: '',
    }
  },
  ninthUserVariantFive: {
    body: {
      username: 'l',
      password: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      passwordConfirmation: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      email: 'murphus@gmail.com'
    }
  },
  ninthUserVariantSix: {
    body: {
      username: 'lincoln',
      password: 'bhVz',
      passwordConfirmation: 'bhVz',
      email: 'murphus@gmail.com'
    }
  },
  ninthUserVariantSeven: {
    body: {
      oldPass: '',
      newPass: 'frlse',
      newPassConfirm: 'flsee',
    }
  },
  firstUpgradeToken: {
    level: 'bronze',
    totalBorrow: 10
  },
  secondUpgradeToken: {
    level: 'silver',
    totalBorrow: 20
  },
  thirdUpgradeToken: {
    level: 'gold',
    totalBorrow: 30
  },
};

