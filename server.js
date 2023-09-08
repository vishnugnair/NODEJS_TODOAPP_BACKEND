import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(4005, () => {
  console.log(
    `Server is working in port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});
