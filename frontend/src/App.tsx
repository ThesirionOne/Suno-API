import { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './lib/supabase';

interface Generation {
  id: string;
  prompt: string;
  tags: string;
  title: string;
  created_at: string;
  status: string;
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [sessionId, setSessionId] = useState('');
  const [cookie, setCookie] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadGenerations();
  }, []);

  const loadGenerations = async () => {
    const { data } = await supabase
      .from('generations')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setGenerations(data);
    }
  };

  const handleGenerate = async () => {
    if (!prompt || !tags || !title) {
      setMessage('Please fill in all fields');
      return;
    }

    if (!sessionId || !cookie) {
      setMessage('Please configure SESSION_ID and COOKIE first');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionId}`,
        },
        body: JSON.stringify({
          prompt,
          tags,
          title,
          make_instrumental: false,
          wait_audio: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();

      const { error } = await supabase
        .from('generations')
        .insert({
          prompt,
          tags,
          title,
          status: 'pending',
        });

      if (!error) {
        setMessage('Music generation started successfully!');
        setPrompt('');
        setTags('');
        setTitle('');
        loadGenerations();
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Music Generator</h1>
        <p>Generate music using AI</p>
      </header>

      <div className="container">
        <div className="config-section">
          <h2>Configuration</h2>
          <p className="info">Get these values from your browser's developer tools after logging into suno.ai</p>
          <div className="form-group">
            <label htmlFor="sessionId">Session ID:</label>
            <input
              id="sessionId"
              type="text"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              placeholder="Enter your session ID"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cookie">Cookie:</label>
            <input
              id="cookie"
              type="text"
              value={cookie}
              onChange={(e) => setCookie(e.target.value)}
              placeholder="Enter your cookie"
            />
          </div>
        </div>

        <div className="generation-section">
          <h2>Generate Music</h2>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Song title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="prompt">Prompt:</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the music you want to generate..."
              rows={4}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags:</label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., pop, rock, electronic"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="generate-btn"
          >
            {loading ? 'Generating...' : 'Generate Music'}
          </button>
          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </div>

        <div className="history-section">
          <h2>Generation History</h2>
          {generations.length === 0 ? (
            <p className="empty">No generations yet</p>
          ) : (
            <div className="generations-list">
              {generations.map((gen) => (
                <div key={gen.id} className="generation-card">
                  <h3>{gen.title}</h3>
                  <p className="prompt">{gen.prompt}</p>
                  <div className="meta">
                    <span className="tags">{gen.tags}</span>
                    <span className="status">{gen.status}</span>
                  </div>
                  <span className="date">
                    {new Date(gen.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
