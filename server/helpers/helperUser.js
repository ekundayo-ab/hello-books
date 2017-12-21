/**
 * @description hardcoded users details for testing
 */
export default {
  user1: {
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
  user2: {
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
  user3: {
    username: 'ekundayo',
    password: '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
    email: 'ekprogs@gmail.com',
  },
  user4: {
    username: 'ekundayo',
    password: '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
    email: 'ekprogs',
  },
  user5: {
    username: 'ekundayo',
    password: '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
    email: 'ekprogs@gmail',
  },
  user6: {
    username: 'emma',
    password: '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
    email: 'emma@gmail.com',
  },
  user7: {
    username: 'kate',
    password: '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
    email: 'emma@gmail.com',
  },
  user8: {
    username: '',
    password: 'calmsecret',
    email: 'calm@gmail.com',
  },
  user8a: {
    username: 'good',
    password: '',
    email: 'good@gmail.com',
  },
  user8b: {
    username: 'gentle',
    password: 'gentlesecret',
    email: '',
  },
  user9: {
    username: 'pate',
    password: '$2a$10$bhVz30gNLdCmqbZYuRIPQulAB/SgDA5XwS9CIgKfSTYod1ezymF2.',
    email: 'pate@gmail.com',
  },
  user9a: {
    body: {
      username: '   murphus',
      password: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      passwordConfirmation: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      email: 'murphus@gmail.com'
    }
  },
  user9b: {
    body: {
      username: '',
      password: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      passwordConfirmation: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      email: 'murphus@gmail.com'
    }
  },
  user9c: {
    body: {
      username: 'lincoln',
      password: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      passwordConfirmation: 'bhVaz30gNLdCmqbZYuRIPQulAB/Sg',
      email: 'murphus@gmail.com'
    }
  },
  user9d: {
    body: {
      oldPass: '',
      newPass: '',
      newPassConfirm: '',
    }
  },
  user9e: {
    body: {
      username: 'li',
      password: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      passwordConfirmation: 'bhVz30gNLdCmqbZYuRIPQulAB/Sg',
      email: 'murphus@gmail.com'
    }
  },
  user9f: {
    body: {
      username: 'lincoln',
      password: 'bhVz',
      passwordConfirmation: 'bhVz',
      email: 'murphus@gmail.com'
    }
  },
  user9g: {
    body: {
      oldPass: '',
      newPass: 'frlse',
      newPassConfirm: 'flsee',
    }
  },
  upgradeToken1: {
    level: 'bronze',
    totalBorrow: 10
  },
  upgradeToken2: {
    level: 'silver',
    totalBorrow: 20
  },
  upgradeToken3: {
    level: 'gold',
    totalBorrow: 30
  },
};

