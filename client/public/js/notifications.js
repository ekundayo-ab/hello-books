import io from 'socket.io-client';
import store from '../../src/helpers/store';
import { fetchAllBorrowedBooks } from '../../src/actions/borrowActions';
export const socket = io('localhost:8000');

socket.on('borrow book', (res) => {
  store.dispatch(fetchAllBorrowedBooks(1, 1, true, 10))
    .then((done) => {
      if (store.getState().users.user.role === 'admin') {
        document.getElementById('notify-popout').innerHTML =
        `<span className="notify-badge" >
          <b>New:</b> ${res.username} borrowed ${res.book.title}
        </span>`;
      }
    });
});

