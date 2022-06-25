import { createApp } from "./app";

const port = process.env.PORT;
const url = process.env.RAILWAY_STATIC_URL || "localhost";

const App = createApp();
App.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://${url}:${port} ....`);
});
