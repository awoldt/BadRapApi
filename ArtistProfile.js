const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  artist_query: String,
  profile_description: String
});

const ArtistProfile =
  mongoose.models.ArtistProfile || mongoose.model("ArtistProfile", profileSchema); //make sure model exists before creating new one

module.exports = ArtistProfile;