import express from 'express';
import routes from './routes';

const app = express();
const port = 80;

app.use(routes);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
