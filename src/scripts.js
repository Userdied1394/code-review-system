import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFeedback(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Code Review System</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="upload-form">
          <input type="file" onChange={handleFileChange} required />
          <button type="submit">Submit</button>
        </form>
        {feedback && <pre className="feedback">{JSON.stringify(feedback, null, 2)}</pre>}
      </main>
      <footer className="App-footer">
        <p>Made with ❤ by AIDS Freaks </p>
      </footer>
    </div>
  );
}

export default App;
