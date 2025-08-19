import app from './api/index';
import { startWorker } from './data/solanaRpc';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ API server running on http://localhost:${PORT}`);
  
  // Start listening for new Solana blocks
  startWorker(361133619);
});