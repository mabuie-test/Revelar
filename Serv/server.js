require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const deviceDataRoutes = require('./routes/deviceDataRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro na conexão com MongoDB:', err));

// Rotas
app.use('/api/data', deviceDataRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
