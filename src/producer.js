'use strict';

var kafka = require('kafka-node');
var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.KafkaClient;
var client = new Client({ kafkaHost: 'localhost:9092' });
var argv = require('optimist').argv;
var topic = argv.topic || 'topic1';
var p = argv.p || 0;
var a = argv.a || 0;
var producer = new Producer(client, { requireAcks: 1 });

producer.on('ready', function () {
  var message = 'Sending random number: ' + Math.random().toString();
  var keyedMessage = new KeyedMessage('keyed', 'a fixed keyed message');

  producer.send([{ topic: topic, partition: p, messages: [message, keyedMessage], attributes: a }], function (
    err,
    result
  ) {
    console.log(err || result);
    process.exit();
  });

  console.log(`Message sent: ${message}`);

});

producer.on('error', function (err) {
  console.log('error', err);
});
