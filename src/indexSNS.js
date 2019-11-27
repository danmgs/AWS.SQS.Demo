/**
 * Never hard-code your credentials!
 * Create an IAM role for your EC2 instance instead.
 */

const AWS = require('aws-sdk');
const UTILS = require('./utils.js');

var sns = new AWS.SNS();

const param = { Name: '/SQS_DEMO/SNS/TARGET_ARN' }
UTILS.getParameterFromStore(param)
      .then(data => {
          console.log(data);
          createMessagesWithSNS(data.Parameter.Value);
        });

function createMessagesWithSNS(targetArn) {
  var message = 'This is a message from SNS on date ' + new Date();
  console.log('Sending messages : ' + message);
  sns.publish({
    Message: message,
    TargetArn: targetArn
  }, function (err, data) {
    if (err) {
      console.log('An error has occured ' + err.stack);
    }
    else {
      console.log('Message sent by SNS : ' + data);
    }
  });
}

