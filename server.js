require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname, { extensions: ['html'] }));
const knowledge = fs.readFileSync(path.join(__dirname, 'knowledge.txt'), 'utf8');
const PORT = Number(process.env.PORT || 3000);
const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
app.get('/api/health', (_req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ ok:true, serverRunning:true, apiKeyConfigured:Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here'), model:MODEL });
});
app.post('/api/chat', async (req, res) => {
  const question = String(req.body?.question || '').trim().slice(0, 5000);
  const language = req.body?.language === 'en' ? 'English' : 'Sinhala';
  if (!question) return res.status(400).json({ error:'Please enter a question.' });
  const key = process.env.OPENAI_API_KEY;
  if (!key || key === 'your_openai_api_key_here') return res.status(503).json({ error:'OpenAI API key is not configured. Add OPENAI_API_KEY to .env and restart the server.' });
  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method:'POST',
      headers:{ Authorization:`Bearer ${key}`, 'Content-Type':'application/json' },
      body:JSON.stringify({ model:MODEL, instructions:`${knowledge}\n\nRespond in ${language}. Distinguish archaeological evidence, historical records, epic literature and folklore. Be transparent about uncertainty.`, input:question, max_output_tokens:1600 }),
      signal:AbortSignal.timeout(45000)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return res.status(response.status).json({ error:data.error?.message || 'OpenAI request failed.' });
    const answer = (data.output || []).flatMap(item => item.content || []).filter(part => part.type === 'output_text').map(part => part.text).join('\n').trim();
    res.json({ answer:answer || 'No text answer was returned.' });
  } catch (error) {
    res.status(502).json({ error:'Cannot reach the OpenAI API. Check server internet access and try again.' });
  }
});
app.listen(PORT, () => console.log(`YAKSHA archive running at http://localhost:${PORT}`));
