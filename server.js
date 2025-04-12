import express from 'express';
import cors from 'cors';
import routes from './routes/_index.js'; 

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// CORS ayarları
app.use(cors({
  origin: ['http://localhost:8080', 'https://pythmatic-client.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Ana endpoint
app.get('/', (req, res) => {
  res.send('Backend API çalışıyor');
});

// Tüm rotaları buraya bağla
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});