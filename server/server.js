const app = require("./app");
require("dotenv/config");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;

// app.get("/api/anime", async (req, res, next) => {
//   const response = await axios.get(
//     "https://kitsu.io/api/edge/anime/"
//   );
//   console.log(response);
//   res.json({ message: "Hello there!", anime: response.data[0] });
// });

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});