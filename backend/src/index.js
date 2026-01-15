import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { neon } from '@neondatabase/serverless';
import blogRoutes from './routes/blogRoutes.js'

dotenv.config()

const app = express();
const PORT = 3000;
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

app.use(express.json())
app.use(cors())

const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
);

async function getPgVersion() {
  const result = await sql`SELECT version()`;
  console.log(result[0]);
}

getPgVersion();

app.use("/api/blogs", blogRoutes)


app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})