const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const request = require("request");
let converter = require('json-2-csv');
const requestContollers  = require("./controller")
const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
function getHoldingValue(total, percent) {
  let value = 0;
    value += total  *percent;
  return value;
}

app.get("/investments/:id", (req, res) => {
  const { id } = req.params;
  request.get(
    `${config.investmentsServiceUrl}/investments/`,
    (e, r, investments) => {
      if (e) {
        console.error(e);
        res.send(500);
      } else {
        console.log(investments);
        res.send(JSON.parse(investments));
      }
    }
  );
});

app.get("/export/:userId", async (req, res) => {
  let {userId} = req.params;
  let investments = await requestContollers.getAllInvestments();
  let companies = await requestContollers.getAllCompanies();
  
  // console.log(investments, companies)
  // res.send({investments, companies})
  let finalData = [];
  investments
    .filter((item) => item.userId == userId && item)
    .forEach((inv) => {
      let obj = {
        userId: inv.userId,
        firstName: inv.firstName,
        lastName: inv.lastName,
        date: inv.date,
      };
      for (let i = 0; i < inv.holdings.length; i++) {
        let getCompanyName = companies.filter(
          (item) => item.id == inv.holdings[i].id && item
        );
        // holdings.push({ name: getCompanyName[0].name });
        obj.holding = getCompanyName[0].name;
        obj.value = getHoldingValue(inv.investmentTotal, inv.holdings[i].investmentPercentage);
        finalData.push(obj);
      }
    });
    let fileName=`users_${userId}.csv`
    const csv = await converter.json2csv(finalData);
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
    // res.send(finalData)
});

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err);
    process.exit(1);
  }
  console.log(`Server running on port ${config.port}`);
});
