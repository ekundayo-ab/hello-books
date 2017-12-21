// For authentication operations
export const userAuthenticated = {
  isAuthenticated: true,
  user: {
    id: 49,
    role: 'admin',
    username: 'ekundayo'
  }
};

export const userNotAuthenticated = {
  isAuthenticated: false,
  user: {}
};

// For book operations
export const book1 = {
  id: 280,
  isbn: 456,
  title: 'The Secret of the Lorax',
  author: 'O\'Hare',
  description: 'The secret of the lorax features a man selling air',
  image: 'https://res.cloudinary.com/dcl7tqhww/image/upload/' +
  'v1510914293/fbuuwg6uqiab9b3rxpvh.jpg',
  status: true,
  quantity: 57,
  category: 'Sports',
  updatedAt: '2017-11-17T10:25:01.852Z',
  createdAt: '2017-11-17T10:25:01.852Z'
};

export const book2 = {
  id: 389,
  isbn: 456,
  title: 'The Secret of the Lorax',
  author: 'O\'Hare',
  description: 'The secret of the lorax features a man selling air',
  image: 'https://res.cloudinary.com/dcl7tqhww/image/upload/' +
  'v1510914293/fbuuwg6uqiab9b3rxpvh.jpg',
  status: true,
  quantity: 57,
  category: 'Sports',
  updatedAt: '2017-11-17T10:25:01.852Z',
  createdAt: '2017-11-17T10:25:01.852Z'
};

export const book3 = {
  id: 389,
  isbn: 456,
  title: 'Ancient Tips on travelling',
  author: 'O\'Hare',
  description: 'This tips would help you become a better traveller',
  image: 'https://res.cloudinary.com/dcl7tqhww/image/upload/' +
  'v1510914293/fbuuwg6uqiab9b3rxpvh.jpg',
  status: true,
  quantity: 57,
  category: 'Travels',
  updatedAt: '2017-11-17T10:25:01.852Z',
  createdAt: '2017-11-17T10:25:01.852Z'
};

export const books1 = [book1];
export const books2 = [book1, book2];

export const booksAfterDeletion = [book2];
export const booksAfterUpdating = [book1, book3];

// For borrowing operations
export const borrow1 = {
  id: 299,
  returned: false,
  dueDate: '2017-11-20T13:21:03.365Z',
  actualReturnDate: '2017-11-17T13:21:03.365Z',
  createdAt: '2017-11-17T13:21:03.365Z',
  updatedAt: '2017-11-17T13:21:03.365Z',
  bookId: 299,
  userId: 49,
  book: {
    id: 299,
    isbn: 9,
    title: 'Gilead',
    author: 'Marilynne Robinson',
    description: 'Gilead is a novel written by Marilynne Robinson',
    image: 'http://res.cloudinary.com/dcl7tqhww/image/upload' +
    '/v1509139554/kf18x2ukcnygh6bau1o2.png',
    status: true,
    quantity: 10,
    category: 'Arts',
    createdAt: '2017-11-17T13:11:15.472Z',
    updatedAt: '2017-11-17T13:21:03.361Z'
  }
};

export const borrow2 = {
  id: 302,
  returned: false,
  dueDate: '2017-11-20T13:21:23.296Z',
  actualReturnDate: '2017-11-17T13:21:23.296Z',
  createdAt: '2017-11-17T13:21:23.296Z',
  updatedAt: '2017-11-17T13:21:23.296Z',
  bookId: 294,
  userId: 49,
  book: {
    id: 294,
    isbn: 4,
    title: 'Wolf Hall',
    author: 'Hilary Mantel',
    description: 'Wolf Hall is a historical novel by English author Hilary',
    image: 'http://res.cloudinary.com/dcl7tqhww/image/upload' +
    '/v1509139539/w9wpuonkyguo32i90mg8.png',
    status: true,
    quantity: 9,
    category: 'Arts',
    createdAt: '2017-11-17T13:11:15.472Z',
    updatedAt: '2017-11-17T13:21:23.293Z'
  }
};

export const borrows1 = [borrow1];
export const borrows2 = [borrow1, borrow2];
export const booksAfterReturning = [borrow2];


// For categories operations
export const category1 = {
  id: 6,
  title: 'Programming',
  createdAt: '2017-10-14T17:58:13.884Z',
  updatedAt: '2017-10-14T17:58:13.884Z'
};

export const category2 = {
  id: 8,
  title: 'Sciences',
  createdAt: '2017-10-14T17:58:26.597Z',
  updatedAt: '2017-10-14T17:58:26.597Z'
};

export const category3 = {
  id: 9,
  title: 'Arts',
  createdAt: '2017-10-14T17:58:29.869Z',
  updatedAt: '2017-10-14T17:58:29.869Z'
};

export const categories1 = [category1, category2];
export const categories2 = [category1, category2, category3];

// For Authentication actions
export const user = {
  id: 1,
  username: 'ekundayo',
  password: '$2a$10$Vr56t.ASTNcE8mT0.meS0uDk9hxO4ThfiSw8XfX0lcHEyBeZ3bPrG',
  email: 'ekprogs@gmail.com',
  role: 'admin',
  level: 'silver',
  borrowLimit: 2,
  totalBorrow: 10,
  createdAt: '2017-11-22T15:27:47.770Z',
  updatedAt: '2017-11-22T15:41:56.222Z'
};

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e' +
'yJkYXRhIjp7ImlkIjo0OSwicm9sZSI6ImFkbWl' +
'uIiwidXNlcm5hbWUiOiJla3VuZGF5byJ9LCJpYXQi' +
'OjE1MTA5NjI2OTYsImV4cCI6MzYxNTEwOTYyNjk2fQ.' +
'TtaPVG2xai-CqEhLJMB8Nxenm7DIskx3pASF0pdFU2k';

export const googleDetails = {
  El: '116643864639139228843',
  w3: {
    Eea: '116643864639139228843',
    ig: 'Ekundayo Abiona',
    ofa: 'Ekundayo',
    wea: 'Abiona',
    Paa: 'https://lh5.googleusercontent.com/-vI2PRePGAKU/' +
    'AAAAAAAAAAI/AAAAAAAAAAc/2nvT9UwrvUs/s96-c/photo.jpg',
    U3: 'ekundayo.abiona@andela.com'
  },
  googleId: '116643864639139228843',
  tokenObj: {
    token_type: 'Bearer',
    access_token: 'ya29.GlwHBbqo-6eZvqDOPjKQ89C3pXqx08Nt_vxypcQQaB9KQ' +
    '0HvNFd2_0' +
    'PBh2lZK19xF5rV0YhuyxKWDXbTrImxuwV2BBjXrn255YYFULs7PhhvY23CUHUdYxUqu47IPg',
    id_token: 'defualt872%^&#a!'
  }
};

export const googleDetails2 = {
  El: '116643864639139228843',
  w3: {
    Eea: '116643864639139228843',
    ig: 'Ekundayo Abiona',
    ofa: 'Ekundayo',
    wea: 'Abiona',
    Paa: 'https://lh5.googleusercontent.com/-vI2PRePGAKU/' +
    'AAAAAAAAAAI/AAAAAAAAAAc/2nvT9UwrvUs/s96-c/photo.jpg',
    U3: 'ekundayo.abiona@andela.com'
  },
  googleId: '116643864639139228843',
};

export const googleUser = {
  token: googleDetails.tokenObj.access_token,
  username: googleDetails.w3.ig.split(' ')[0],
  email: googleDetails.w3.U3,
  role: 'normal',
  password: googleDetails.tokenObj.id_token,
  passwordConfirmation: googleDetails.tokenObj.id_token,
};

export const regUserData = {
  username: 'maxwell',
  email: 'maxwell@max.com',
  password: 'max37689',
  passwordConfirmation: 'max37689'
};

export const passData = {
  oldPass: 'pass12#4',
  newPass: 'Olpass12#4',
  newPassConfirm: 'Olpass12#4'
};

// For Book Actions
export const books = [
  {
    id: 6,
    isbn: 6,
    title: 'Gilead01',
    author: 'Marilynne Robinson',
    description: 'Gilead is a novel written by Marilynne Robinson',
    image: 'https://res.cloudinary.com/dcl7tqhww/image/' +
    'upload/v1509139554/kf18x2ukcnygh6bau1o2.png',
    status: true,
    quantity: 11,
    categoryId: 1,
    createdAt: '2017-11-22T15:54:07.464Z',
    updatedAt: '2017-11-22T17:35:37.158Z'
  },
  {
    id: 7,
    isbn: 7,
    title: 'Gilead02',
    author: 'Marilynne Robinson',
    description: 'Gilead is a novel written by Marilynne Robinson',
    image: 'https://res.cloudinary.com/dcl7tqhww/image/' +
    'upload/v1509139554/kf18x2ukcnygh6bau1o2.png',
    status: true,
    quantity: 11,
    categoryId: 1,
    createdAt: '2017-11-22T15:54:07.464Z',
    updatedAt: '2017-11-22T15:54:07.464Z'
  },
];

export const book = {
  id: 7,
  isbn: 7,
  title: 'Gilead02',
  author: 'Marilynne Robinson',
  description: 'Gilead is a novel written by Marilynne Robinson',
  image: 'https://res.cloudinary.com/dcl7tqhww/image/'
  + 'upload/v1509139554/kf18x2ukcnygh6bau1o2.png',
  status: true,
  quantity: 11,
  categoryId: 1,
  createdAt: '2017-11-22T15:54:07.464Z',
  updatedAt: '2017-11-22T15:54:07.464Z'
};

export const updatedBook = [0, {
  id: 7,
  isbn: 7,
  title: 'Gilead02',
  author: 'Marilynne Robinson',
  description: 'Gilead is a novel written by Marilynne Robinson',
  image: 'https://res.cloudinary.com/dcl7tqhww/image/'
  + 'upload/v1509139554/kf18x2ukcnygh6bau1o2.png',
  status: true,
  quantity: 11,
  categoryId: 1,
  createdAt: '2017-11-22T15:54:07.464Z',
  updatedAt: '2017-11-22T15:54:07.464Z'
}];

// For Borrow Actions
export const borrow = {
  id: 3,
  returned: false,
  dueDate: '2017-11-26T15:29:27.869Z',
  actualReturnDate: '2017-11-23T15:29:27.869Z',
  createdAt: '2017-11-23T15:29:27.870Z',
  updatedAt: '2017-11-23T15:29:27.870Z',
  bookId: 7,
  userId: 1
};

export const borrowedBooks = [
  {
    id: 1,
    returned: true,
    dueDate: '2017-11-25T17:35:25.150Z',
    actualReturnDate: '2017-11-22T17:35:35.612Z',
    createdAt: '2017-11-22T17:35:25.150Z',
    updatedAt: '2017-11-22T17:35:35.613Z',
    bookId: 8,
    userId: 1,
    book: {
      id: 8,
      isbn: 8,
      title: 'Gilead03',
      author: 'Marilynne Robinson',
      description: 'Gilead is a novel written by Marilynne Robinson',
      image: 'https://res.cloudinary.com/dcl7tqhww/image/up' +
      'load/v1509139554/kf18x2ukcnygh6bau1o2.png',
      status: true,
      quantity: 11,
      categoryId: 1,
      createdAt: '2017-11-22T15:54:07.464Z',
      updatedAt: '2017-11-23T17:05:40.930Z'
    }
  },
  {
    id: 2,
    returned: true,
    dueDate: '2017-11-25T17:35:31.973Z',
    actualReturnDate: '2017-11-22T17:35:37.153Z',
    createdAt: '2017-11-22T17:35:31.973Z',
    updatedAt: '2017-11-22T17:35:37.154Z',
    bookId: 6,
    userId: 1,
    book: {
      id: 6,
      isbn: 6,
      title: 'Gilead01',
      author: 'Marilynne Robinson',
      description: 'Gilead is a novel written by Marilynne Robinson',
      image: 'https://res.cloudinary.com/dcl7tqhww/image/'
      + 'upload/v1509139554/kf18x2ukcnygh6bau1o2.png',
      status: true,
      quantity: 11,
      categoryId: 1,
      createdAt: '2017-11-22T15:54:07.464Z',
      updatedAt: '2017-11-23T17:05:39.851Z'
    }
  }
];

export const borrowedNotReturnedBooks = [
  {
    id: 1,
    returned: false,
    dueDate: '2017-11-25T17:35:25.150Z',
    actualReturnDate: '2017-11-22T17:35:35.612Z',
    createdAt: '2017-11-22T17:35:25.150Z',
    updatedAt: '2017-11-22T17:35:35.613Z',
    bookId: 8,
    userId: 1,
    book: {
      id: 8,
      isbn: 8,
      title: 'Gilead03',
      author: 'Marilynne Robinson',
      description: 'Gilead is a novel written by Marilynne Robinson',
      image: 'https://res.cloudinary.com/dcl7tqhww/image/up' +
      'load/v1509139554/kf18x2ukcnygh6bau1o2.png',
      status: true,
      quantity: 11,
      categoryId: 1,
      createdAt: '2017-11-22T15:54:07.464Z',
      updatedAt: '2017-11-23T17:05:40.930Z'
    }
  },
  {
    id: 2,
    returned: false,
    dueDate: '2017-11-25T17:35:31.973Z',
    actualReturnDate: '2017-11-22T17:35:37.153Z',
    createdAt: '2017-11-22T17:35:31.973Z',
    updatedAt: '2017-11-22T17:35:37.154Z',
    bookId: 6,
    userId: 1,
    book: {
      id: 6,
      isbn: 6,
      title: 'Gilead01',
      author: 'Marilynne Robinson',
      description: 'Gilead is a novel written by Marilynne Robinson',
      image: 'https://res.cloudinary.com/dcl7tqhww/image/'
      + 'upload/v1509139554/kf18x2ukcnygh6bau1o2.png',
      status: true,
      quantity: 11,
      categoryId: 1,
      createdAt: '2017-11-22T15:54:07.464Z',
      updatedAt: '2017-11-23T17:05:39.851Z'
    }
  }
];

// For validation functions
export const req = {
  username: 'ekpr1ogs',
  password: 'pasek10',
  passwordConfirmation: 'pasekr10'
};

export const req1 = {
  username: 'ek',
  email: 'ekprogs@mail.com',
  password: 'pa',
  passwordConfirmation: 'pa'
};

export const req2 = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
};

export const req3 = {
  username: 'ekprogs',
  email: 'ekprogs@mail.com',
  password: 'pasek10',
  passwordConfirmation: 'pasek10'
};

export const req4 = {
  identifier: '',
  password: '',
};

export const req5 = {
  identifier: 'winterman',
  password: 'win10pa!',
};

export const req6 = {
  body: {
    isbn: 'one',
    title: 'The new book',
    author: '',
    description: 'Intrigue, Thrilling & Beautiful',
    quantity: 'thirty-four',
  }
};

export const req7 = {
  body: {
    isbn: 1,
    title: 'The new book',
    author: 'Newman',
    description: 'Intrigue, Thrilling & Beautiful',
    quantity: 30,
    category: 7,
  }
};

