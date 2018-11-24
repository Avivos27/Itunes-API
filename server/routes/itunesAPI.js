const ItunesController = require("../controllers/itunes.ctrl");

module.exports = router => {
  /* get all users */
  router.route("/itunes/search/:query").get(ItunesController.search);

  /* get a particlular user */
  router.route("/itunes/item/:id").get(ItunesController.getItem);
};
