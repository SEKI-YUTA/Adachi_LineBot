// 個人用はうまく動く

const line = require("@line/bot-sdk");
// const {
//   getAllData,
//   createNewHomeWork,
//   deleteHomeWork,
// } = require("./db_helper");
const { getNews } = require("./news_proxy");
const express = require("express");
require("dotenv").config();

const CONFIG = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY,
};

const client = new line.Client(CONFIG);

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("it works!");
});

app.post("/webhook", line.middleware(CONFIG), (req, res) => {
  console.log("webhook");
  handleBot(req, res);
});

app.get("/", (req, res) => {
  res.send("it works!");
});

async function handleBot(req, res) {
  res.status(200).end();
  req.body.events.map(async (event) => {
    console.log("event received");
    console.log(event);
    if (event.message == undefined || event.message.text == undefined) return;
    if (String(event.message.text).startsWith("自己紹介")) {
      replyRequest(
        "自己紹介",
        "名前: 足立夏保\n年齢: 23\n出身地: シンガポール\nプロフィール: https://www.ytv.co.jp/announce/adachi_kaho/",
        event.replyToken
      );
    } else if (String(event.message.text).startsWith("電話しよ")) {
      replyRequest("", "05031873738", event.replyToken);
    } else if (String(event.message.text).startsWith("ニュースを教えて")) {
      let title = "ニュース";
      let newsBody = "";
      let resArticleCount = 3;
      let resJson = await getNews();
      let articles = resJson["articles"];
      let totalResult = resJson["totalResults"];
      if (totalResult < resArticleCount + 1) {
        resArticleCount = totalResult;
      }

      for (let i = 0; i <= resArticleCount; i++) {
        let newsItem = `${articles[i]["title"]}\n${articles[i]["url"]}`;
        newsBody += newsItem;
      }

      replyRequest(title, newsBody, event.replyToken);
    }
  });
}
// async functi
function replyRequest(title, text, token) {
  if (title === "") {
    client.replyMessage(token, {
      type: "text",
      text: `${text}`,
    });
  } else if (text === "") {
    client.replyMessage(token, {
      type: "text",
      text: `${title}`,
    });
  } else {
    client.replyMessage(token, {
      type: "text",
      text: `${title}\n${text}`,
    });
  }
}

function createHomeWorkList(data) {
  homeworkText = "";
  data.forEach((item) => {
    // console.log(item);
    homeworkText += "\n" + item.content;
  });
  return homeworkText;
}

app.listen(PORT, () => console.log(`listening at ${PORT}port`));
