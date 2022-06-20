import { createApp } from "./app";

const port = process.env.PORT;

const App = createApp();
App.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${port} ....`
  );
});
