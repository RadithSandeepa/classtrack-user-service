import express from 'express';
import userRoutes from './routes/userRoutes.js';
import seedAdmin from './seeders/adminSeeder.js';
import { swaggerDocs } from "./docs/swagger.js";

const app = express();
swaggerDocs(app);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use('/users', userRoutes);

// Start server
app.listen(PORT, async () => {
  console.log(`User Service running on port ${PORT}`);
  await seedAdmin(); // seed admin at startup
})
