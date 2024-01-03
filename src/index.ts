import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config({ path: '.env' });
import routes from './api/routes';

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/', routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})