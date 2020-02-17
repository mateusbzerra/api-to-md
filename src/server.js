import express from "express";
import fs from "fs";
import path from "path";
import hbs from "express-handlebars";
const app = express();

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: path.resolve(__dirname, "views", "layouts"),
    partialsDir: path.resolve(__dirname, "views", "partials")
  })
);
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/", async (req, res) => {
  const jsonData = fs.readFileSync(
    path.resolve(__dirname, "..", "tmp", "test.json")
  );

  const test = JSON.parse(jsonData);
  const only = test.resources.filter(item => item._type === "request");
  console.log("reqs", only);
  return res.render("home", { reqs: only });
});

app.listen(3333, () => {
  console.log("server started on port 3333");
});
