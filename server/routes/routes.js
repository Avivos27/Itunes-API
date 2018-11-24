const searchQuery = require("./searchQuery");
const itunesAPI = require("./itunesAPI");

global.BAD_REQUEST = 400;
global.FORBIDDEN = 403;
global.NOT_FOUND = 404;
global.INTERNAL_ERROR = 500;

module.exports = router => {
  searchQuery(router);
  itunesAPI(router);
};
