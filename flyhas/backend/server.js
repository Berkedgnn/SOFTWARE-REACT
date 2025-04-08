
const express = require('express');
const cors = require('cors');
const seatRoutes = require('./routes/seats');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/seats', seatRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
