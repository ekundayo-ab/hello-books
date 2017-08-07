import bcrypt from 'bcrypt';

export default function seed(models) {
  return models.User.create({
    username: 'DayoTest',
    email: 'dayotest@gmail.com',
    password: bcrypt.hashSync('ekundayo', 10),
    role: 2,
  })
    .catch(e => console.log(e));
}
