const SearchQuery = require("./../models/SearchQuery");
const ITUNES_URL = "https://itunes.apple.com";
const request = require("request");

module.exports = {
  search: (req, res) => {
    let currentQuery = req.params.query;
    if (!currentQuery) res.sendStatus(global.BAD_REQUEST);
    let search = `search?term=${encodeURI(req.params.query)}&limit=25`;
    let url = `${ITUNES_URL}/${search}`;
    request(url, { json: true }, async (err, r, body) => {
      if (err) {
        console.error(err);
        res.sendStatus(global.INTERNAL_ERROR);
      }
      res.json(body);

      try {
        // update query in DB
        currentQuery = currentQuery.toLowerCase();
        let queries = await SearchQuery.find({
          query: currentQuery
        });
        if (queries.length === 1) {
          let existentQuery = queries[0];
          existentQuery.count++;
          await existentQuery.save();
        } else {
          await new SearchQuery({
            query: currentQuery,
            count: 0
          }).save();
        }
      } catch (err) {
        console.error("Failed to update query in DB");
        console.error(err);
      }
    });
  },

  getItem: (req, res) => {
    let search = `lookup?id=${encodeURI(req.params.id)}`;
    let url = `${ITUNES_URL}/${search}`;
    request(url, { json: true }, (err, r, body) => {
      if (err) {
        console.error(err);
        res.sendStatus(global.INTERNAL_ERROR);
      }
      if (body.resultCount === 0) res.sendStatus(global.NOT_FOUND);
      else if (body.resultCount === 1) res.json(body.results[0]);
      else res.sendStatus(global.BAD_REQUEST);
    });
  },

  createOrUpdateQuery: async (req, res) => {
    try {
      let currentQuery = req.body.text;
      if (!currentQuery) res.sendStatus(global.BAD_REQUEST);
      currentQuery = currentQuery.toLowerCase();
      let userQueries = await SearchQuery.find({
        text: currentQuery
      });
      if (userQueries.length === 1) {
        let exsistentQuery = userQueries[0];
        exsistentQuery.count++;
        await exsistentQuery.save();
        res.send(exsistentQuery);
      } else {
        let newQuery = await new SearchQuery({
          text: currentQuery,
          count: 0
        }).save();
        if (!newQuery) res.sendStatus(global.BAD_REQUEST);
        else res.send(newQuery);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(global.INTERNAL_ERROR);
    }
  }
};
