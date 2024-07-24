import React, { useState } from 'react';
import axios from 'axios';


function App(){
  const [podName, setPodName] = useState('');
  const [numOfPods, setNumOfPods] = useState(1);
  const [namespace, setNamespace] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const data = {
      podName,
      numOfPods: parseInt(numOfPods),
      namespace,
      image
    };
      try {
        const response = await axios.post('http://localhost:3000/create-pods', data);
        alert('Pods created successfully!');
        console.log(response.data);
    } catch (error) {
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error response:', error.response.data);
          alert('Error creating pods: ' + error.response.data.error);
      } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
          alert('No response received from the server.');
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
          alert('Error creating pods: ' + error.message);
      }
  }
};

return (
    <div className="App">
        <h1>Create Kubernetes Pods</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Pod Name:</label>
                <input type="text" value={podName} onChange={(e) => setPodName(e.target.value)} required />
            </div>
            <div>
                <label>Number of Pods:</label>
                <input type="number" value={numOfPods} onChange={(e) => setNumOfPods(e.target.value)} required min="1" />
            </div>
            <div>
                <label>Namespace:</label>
                <input type="text" value={namespace} onChange={(e) => setNamespace(e.target.value)} required />
            </div>
            <div>
                <label>Image:</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
            </div>
            <button type="submit">Create Pods</button>
        </form>
    </div>
);
}

export default App;
