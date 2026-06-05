import { useEffect, useState } from 'react';
// 1. Make sure you import your Form component. 
// (Adjust the path './Form' depending on where your Form.jsx file is saved)
import Form from './component/Form'; 

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    // Fetching data from your backend port 5000
    fetch('http://localhost:5000/api/data')
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message); 
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []); 

  // 2. Place your return statement here.
  // If you want to show the backend message AND the Form together, wrap them in a <div>:
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Frontend (Port 5173)</h1>
      <p>Backend status: <strong>{message}</strong></p>
      
      <hr /> {/* Visual line separator */}

      {/* Your Form component renders here */}
      <Form /> 
    </div>
  );
}

export default App;