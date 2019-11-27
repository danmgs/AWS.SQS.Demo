/**
 * Never hard-code your credentials!
 * Create an IAM role for your EC2 instance instead.
 */

const AWS = require('aws-sdk');
const UTILS = require('./utils.js');

var sqs = new AWS.SQS();

const param = { Name: '/SQS_DEMO/SQS/QUEUE_URL' }
UTILS.getParameterFromStore(param)
      .then(data => {
          console.log(data);
          const queueUrl = data.Parameter.Value;
          createMessages(queueUrl, 5);
          createMessagesInBatch(queueUrl, 2, 3);
        });

// nodejs version > 8 is required to support async features.
async function createMessages(queueUrl, numberOfMessage) {

  console.log('Calling createMessages to create ' + numberOfMessage + ' message(s) in queue ' + queueUrl);

  var messages = [];
  for (var a = 0; a < numberOfMessage; a++) {
    messages[a] = 'This is the content for message ' + a + '.';
  }

  // Asynchronously deliver messages to SQS queue
  for (const message of messages) {
    console.log('Sending message: ' + message)
    params = {
      MessageBody: message, /* required */
      QueueUrl: queueUrl /* required */
    };

    await sqs.sendMessage(params, function (err, data) { // wait until callback
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data);  // successful response
    });
  }
}

/**
 * If the maximum total payload size (i.e., the sum of all a batch's individual message lengths) is 256 KB (262,144 bytes)or less,
 * we can use a single sendMessageBatch call. This reduces our number of calls and resource costs.
 * Now let’s use sendMessageBatch to do send up to 10 messages at a time
 */
// Create numberOfBatchs * numberOfMessagesByBatch SQS messages
async function createMessagesInBatch(queueUrl, numberOfBatchs, numberOfMessagesByBatch) {

  console.log('Calling createMessagesInBatch to create ' + numberOfBatchs + ' x ' + numberOfMessagesByBatch + ' message(s) in batch mode in queue ' + queueUrl);

  var messages = [];
  for (var a = 0; a < numberOfBatchs; a++) {
    messages[a] = [];
    for (var b = 0; b < numberOfMessagesByBatch; b++) {
      messages[a][b] = '[BATCH] This is the content for message ' + (a * numberOfMessagesByBatch + b) + '.';
    }
  }

  // Asynchronously deliver messages to SQS queue
  for (const message of messages) {
    console.log('Sending message: ' + message)
    params = {
      Entries: [],
      QueueUrl: queueUrl /* required */
    };
    for (var b = 0; b < numberOfMessagesByBatch; b++) {
      params.Entries.push({
        MessageBody: message[b],
        Id: 'Message' + (messages.indexOf(message) * numberOfMessagesByBatch + b)
      });
    }

    await sqs.sendMessageBatch(params, function (err, data) { // Wait until callback
      console.log('Sending messages in batch mode in ' + numberOfBatchs + " calls");
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data);           // successful response
    });
  }
}
