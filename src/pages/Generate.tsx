import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface GenerationParams {
  prompt: string;
  style: string;
  tempo: number;
  duration: number;
}

export default function Generate() {
  const [params, setParams] = useState<GenerationParams>({
    prompt: '',
    style: 'pop',
    tempo: 120,
    duration: 30
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState<string | null>(null);

  const styles = [
    'Pop', 'Rock', 'Electronic', 'Jazz', 'Classical',
    'Hip Hop', 'Ambient', 'Blues', 'Country', 'Reggae'
  ];

  const handleGenerate = async () => {
    if (!params.prompt.trim()) {
      alert('Please enter a description for your music');
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase
        .from('generations')
        .insert({
          prompt: params.prompt,
          style: params.style,
          tempo: params.tempo,
          duration: params.duration,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      setGeneratedMusic(data.id);
      alert('Music generation started! This is a demo - actual generation would happen here.');
    } catch (error) {
      console.error('Error generating music:', error);
      alert('Error generating music. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="generate-container">
      <div className="generate-header">
        <h1>Create Your Music</h1>
        <p>Describe the music you want to create</p>
      </div>

      <div className="generation-form">
        <div className="form-group">
          <label htmlFor="prompt">Music Description</label>
          <textarea
            id="prompt"
            value={params.prompt}
            onChange={(e) => setParams({ ...params, prompt: e.target.value })}
            placeholder="Describe the music you want to create... (e.g., 'Upbeat summer pop song with catchy melody')"
            rows={4}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="style">Music Style</label>
            <select
              id="style"
              value={params.style}
              onChange={(e) => setParams({ ...params, style: e.target.value })}
            >
              {styles.map((style) => (
                <option key={style} value={style.toLowerCase()}>
                  {style}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tempo">Tempo (BPM): {params.tempo}</label>
            <input
              type="range"
              id="tempo"
              min="60"
              max="200"
              value={params.tempo}
              onChange={(e) => setParams({ ...params, tempo: parseInt(e.target.value) })}
            />
            <div className="tempo-labels">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration: {params.duration}s</label>
          <input
            type="range"
            id="duration"
            min="15"
            max="120"
            step="15"
            value={params.duration}
            onChange={(e) => setParams({ ...params, duration: parseInt(e.target.value) })}
          />
        </div>

        <button
          className="generate-button"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Music'}
        </button>

        {generatedMusic && (
          <div className="success-message">
            Music generation request created! ID: {generatedMusic}
          </div>
        )}
      </div>
    </div>
  );
}
