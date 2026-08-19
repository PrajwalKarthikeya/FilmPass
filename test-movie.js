const { getMovieDetails } = require("./src/lib/tmdb.ts");

async function run() {
  try {
    const movie = await getMovieDetails(3);
    console.log("Returned:", movie ? movie.title : "null");
  } catch (e) {
    console.error("Error:", e);
  }
}
run();
