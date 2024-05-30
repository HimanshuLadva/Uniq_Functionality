import * as express from 'express';
import { getAccounts, getUsers } from './user-route';

const bodyParser = require('body-parser');

const app: express.Application = express();

app.use(bodyParser.json());

const cors = require('cors');

app.use(cors({ origin: true }));

app.route('/api/billdata').get(getUsers);
app.route('/api/getaccounts').get(getAccounts);

app.listen(9000, () => {
  console.log('Server is listening on port 9000');
});