import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const questionOneRouter = express.Router();

function fizzbuzzCounter(nValue) {
  var result = [];
  for (let counter = 1; counter <= nValue; counter++) {
    if (counter % 5 == 0 && counter % 3 == 0) {
      result.push('fizzbuzz');
    } else if (counter % 5 == 0) {
      result.push('buzz');
    } else if (counter % 3 == 0) {
      result.push('fizz');
    } else {
      result.push(counter);
    }
  }
  return result;
}

questionOneRouter.get(
  '/:n',
  expressAsyncHandler(async (req, res) => {
    const paramNValue = req.params.n;
    const validNValue = /^[1-9]\d*$/.test(paramNValue);

    if (validNValue) {
      const resultOne = fizzbuzzCounter(paramNValue);
      const resultTwo = fizzbuzzCounter(15);

      res
        .status(200)
        .send(
          'Input Result f(n): ' +
            resultOne +
            ' End of Program Result (f(15)): ' +
            resultTwo
        );
    } else {
      res.status(300).send('Invalid Number');
    }
  })
);

export default questionOneRouter;
