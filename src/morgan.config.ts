import { createWriteStream } from "fs";
import morgan from "morgan";

const MorganLogFile = morgan("common", {
  stream: createWriteStream("./access.log", { flags: "a" }),
});

const MorganLogConsole = morgan("combined");

export default {
  MorganLogConsole,
  MorganLogFile,
};
