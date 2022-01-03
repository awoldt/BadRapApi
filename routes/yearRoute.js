const express = require("express");
const router = express.Router();
const SongModel = require("../SongModel");

router.get("/year", async (req, res) => {
  res.status(200);

  const allSongs = await SongModel.find();

  var y = new Array();
  allSongs.forEach((x) => {
    if (y.indexOf(x.release_date) == -1) {
      y.push(x.release_date);
    }
  });

  y = y.sort();

  const returnData = await Promise.all(
    y.map(async (x) => {
      const songsInYear = await SongModel.find({ release_date: x });

      return {
        year: x,
        songs_in_year: songsInYear,
      };
    })
  );


  res.render("year", {
    data: returnData,
  });
});

router.get("/year/:id", async (req, res) => {
  const songs = await SongModel.find({ release_date: req.params.id }).sort({
    date_added: -1,
  });

  //404
  if (songs.length == 0) {
    res.status(404);
    res.send("Cannot find year");
  }
  //200
  else {
    res.render("yearPage", {
      year: req.params.id,
      song_data: songs,
    });
  }
});

module.exports = router;
