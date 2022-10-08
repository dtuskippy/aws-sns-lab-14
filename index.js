const express = require('express');
const AWS = require('aws-sdk');


const app = express();

app.use(express.json());

const creds = new AWS.SharedIniFileCredentials({profile: 'default'});
const sns = new AWS.SNS({creds, region: 'us-east-1'});

const port = 3001;

app.get('/', (req, res) => res.send('Welcome to AWS-SNS Trial!'))


app.get('/status', (req, res) => res.send({status: 'ok', sns}))

app.post('/subscribe', (req, res) => {
  let params = {
    Protocol: 'EMAIL',
    TopicArn: 'arn:aws:sns:us-east-1:732807703652:DogLife',
    Endpoint: req.body.email
  };
   
  sns.subscribe(params, (err, data) => {
    if(err) console.error(err)
    res.send(data)
  })
})

app.post('/publish', (req, res) => {
  let params = {
    Subject: req.body.subject,
    Message: req.body.message,
    TopicArn: 'arn:aws:sns:us-east-1:732807703652:DogLife',
  };

  sns.publish(params, (err, data) => {
    if(err) console.error(err)
    res.send(data)
  })

})



app.listen(port, () => {
  console.log(`AWS-SNS up on port ${port}`);
});