/**
 * @class LocalStorageMock
 */
class LocalStorageMock {
  /**
   * Creates an instance of LocalStorageMock.
   * @memberof LocalStorageMock
   */
  constructor() {
    this.store = {};
  }
  /**
   * @returns {object} - store
   * @memberof LocalStorageMock
   */
  clear() {
    this.store = {};
  }

  /**
   * @param {string} key
   * @returns {string} returns item or null
   * @memberof LocalStorageMock
   */
  getItem(key) {
    return this.store[key] || null;
  }

  /**
   * @param {string} key
   * @param {string} value
   * @returns {string} value
   * @memberof LocalStorageMock
   */
  setItem(key, value) {
    this.store[key] = value;
  }

  /**
   * @param {string} key
   * @returns {string} value
   * @memberof LocalStorageMock
   */
  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
