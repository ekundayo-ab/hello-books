import { ADD_FLASH_MESSAGE } from '../actions/types';

function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message,
  };
}

export {
  addFlashMessage,
};
