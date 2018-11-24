const SearchQueryController = require("../controllers/searchQuery.ctrl");

module.exports = router => {
  /* get all searchQueries */
  router.route("/searchQueries").get(SearchQueryController.getTop10);

  /* get a particlular searchQuery */
  router.route("/searchQueries/:id").get(SearchQueryController.getSearchQuery);
};
