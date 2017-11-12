/**
 * Get paginated data from the server
 * @description An helper function for getting
 * data from the database in a paginated format
 * @param {object} getData
 * @param {number} pageId
 * @param {number} userId
 * @returns {object} // Returns the number of pages and the page ID
 */
const paginate = (getData, pageId, userId) => {
  if (pageId === null) pageId = 1;
  return getData(pageId, userId)
    .then((getDataResponse) => {
      const numberOfPages = getDataResponse.numberOfPages;
      const pages = Array.from(Array(numberOfPages)).map((e, i) => i + 1);
      return {
        pages,
        pageId
      };
    });
};

export default paginate;
