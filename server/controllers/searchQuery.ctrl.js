const SearchQuery = require("./../models/SearchQuery");

module.exports = {
  getSearchQuery: async (req, res) => {
    try {
      let query = await SearchQuery.findById(req.params.id);
      if (!query) res.sendStatus(global.NOT_FOUND);
      else res.send(query);
    } catch (err) {
      console.error(err);
      res.sendStatus(global.INTERNAL_ERROR);
    }
  },

  getTop10: async (req, res) => {
    try {
      let queries = await SearchQuery.find({}, null, {
        sort: { count: -1 }
      }).limit(10);
      if (!queries) res.sendStatus(global.NOT_FOUND);
      else res.send(queries);
    } catch (err) {
      console.error(err);
      res.sendStatus(global.INTERNAL_ERROR);
    }
  }
};
