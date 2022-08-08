const axios = require("axios");

async function getNews() {
  const endPoint =
    "https://newsapi.org/v2/top-headlines?country=jp&category=business&apiKey=eb632193384348238d832abb8e6ae41b";
  //   await axios
  //     .get(
  //       //   "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=eb632193384348238d832abb8e6ae41b"
  //       "https://yahoo.co.jp"
  //     )
  //     .then((res) => {
  //       console.log(res.body);
  //     });
  let articleJson;
  try {
    var respose = await axios.get(endPoint);
    // console.log(respose["data"]);
    articleJson = respose["data"];
    console.log(articleJson);
    // var resJson = JSON.parse('"' + JSON.stringify(respose) + '"');
    // console.log(JSON.stringify(resJson));
  } catch (e) {
    console.log(e);
  }

  return articleJson;
}

// (async () => {
//   let resJson = await getNews();
//   console.log(resJson);
// })();

exports.getNews = getNews;
