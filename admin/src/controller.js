const config = require("config");
const request = require("request");

module.exports = {
    getAllInvestments : function () {
        return new Promise((resolve,reject) => {
            request.get(
                `${config.investmentsServiceUrl}/investments/`,
                (e, r, investments) => {
                  if (e) {
                    console.error(e);
                    reject(e);
                  } else {
                    // console.log(investments);
                    resolve(JSON.parse(investments));
                  }
                }
              );
        })
    },
    getAllCompanies : function () {
        return new Promise((resolve,reject) => {
            request.get(
                `${config.financeServiceUrl}/companies/`,
                (e, r, companies) => {
                  if (e) {
                    console.error(e);
                    reject(e);
                  } else {
                    // console.log(companies);
                    resolve(JSON.parse(companies));
                  }
                }
              );
        })
    }
}