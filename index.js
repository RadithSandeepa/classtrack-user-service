import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import seedAdmin from './seeders/adminSeeder.js';
import { swaggerDocs } from "./docs/swagger.js";

const app = express();
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
swaggerDocs(app);

app.use('/users', userRoutes);

// Start server
app.listen(PORT, async () => {
  console.log(`User Service running on port ${PORT}`);
  // await seedAdmin(); // seed admin at startup
})
