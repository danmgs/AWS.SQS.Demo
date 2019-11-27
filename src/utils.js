/**
 * Don't hard-code your credentials!
 * Create an IAM role for your EC2 instance instead.
 */

const SSM = require('aws-sdk/clients/ssm');
const UTILS = require('./utils.js');

var servmgr = new SSM();

function getParameterFromStore(param) {
  return new Promise(function (resolve, reject) {
    console.log('Looking in Parameter Store the param : ' + param.Name);
    servmgr.getParameter(param, function (err, data) {
      if (err) {
        reject(console.log('Error getting parameter: ' + err, err.stack));
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {
  getParameterFromStore
};