import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const questionTwoRouter = express.Router();

var generatedHashes = new Array();
var generatedUUID = new Array();

questionTwoRouter.get(
  '/generateHash',
  expressAsyncHandler(async (req, res) => {
    let generateUUIDValue = uuidv4();

    generatedUUID.push(generateUUIDValue);
    const hash = crypto
      .createHash('sha256')
      .update(generateUUIDValue)
      .digest('hex');
    generatedHashes.push(hash);

    setTimeout(() => {
      res.json({
        hash: hash,
      });
    }, 1000);
  })
);

function timestampToDateTimeConverter(timestamp) {
  const date = new Date(timestamp);

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  return date.toLocaleDateString('en-US', options);
}

questionTwoRouter.get(
  '/hashReturner',
  expressAsyncHandler(async (req, res) => {
    try {
      let requestReceivedTime = Date.now();
      var hashWithLastIndexOddNumberFound = false;
      var hashValue = '';
      while (!hashWithLastIndexOddNumberFound) {
        const generatedHashData = await axios.get(
          `${process.env.URL}/api/Q2/generateHash`
        );
        let generatedHashDataValue = generatedHashData.data.hash;
        if (/[13579]/.test(generatedHashDataValue.slice(-1)) == true) {
          hashValue = generatedHashDataValue;
          hashWithLastIndexOddNumberFound = true;
        }
      }
      res.json({
        hash: hashValue,
        requestReceivedTime: timestampToDateTimeConverter(requestReceivedTime),
        responseReturnTime: timestampToDateTimeConverter(Date.now()),
      });
    } catch (e) {
      res.send(
        'Error Occured during request to generatingHash or Checking Hash'
      );
    }
  })
);

questionTwoRouter.get(
  '/showUUIDAndHashLogs',
  expressAsyncHandler(async (req, res) => {
    res.json({
      'UUID Logs': generatedUUID,
      'Generated Hash Logs': generatedHashes,
    });
  })
);

questionTwoRouter.get(
  '/resetUUIDandHash',
  expressAsyncHandler(async (req, res) => {
    generatedHashes = [];
    generatedUUID = [];
    res.send('Both Array cleared');
  })
);

export default questionTwoRouter;
