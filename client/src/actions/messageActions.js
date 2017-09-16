import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';

function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message,
  };
}

function deleteFlashMessage(id) {
  return {
    type: DELETE_FLASH_MESSAGE,
    id,
  };
}

export {
  addFlashMessage,
  deleteFlashMessage,
};
