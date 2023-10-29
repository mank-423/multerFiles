import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Loader from './components/Loader';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('Please select a file before uploading');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = (event) => {
    event.preventDefault();

    if (file) {
      setLoading(true); // Set loading to true while file upload is in progress

      let formData = new FormData();
      formData.append('profileImage', file);

      axios
        .post('http://localhost:8000/upload', formData)
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          } else {
            setMessage('File upload failed - Server response error');
          }
        })
        .then((data) => {
          if (data) {
            setMessage('File uploading...');
            setLoading(true);
            // Set the message to 'Please select a file before uploading'
            setTimeout(() => {
              setMessage('Please select a file before uploading');
              setFile(null);
              setLoading(false); // Set loading to false after the timeout
              document.getElementById('fileInput').value = '';
              alert("File uploaded successfully");
            }, 3000); // 3000 milliseconds (3 seconds)
          }
        })
        .catch((error) => {
          setMessage('File upload failed - Request error');
          setLoading(false); // Set loading to false in case of an error
          console.error(error);
        });
    } else {
      setMessage('Please select a file before uploading');
    }
  };

  return (
    <>
      <div>
        <form method="POST" encType="multipart/form-data" onSubmit={handleFileUpload}>
          <input type="file" id="fileInput" name="profileImage" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
        {loading ? <Loader /> : <p>{message}</p>} {/* Conditionally render loader */}
      </div>
    </>
  );
}

export default App;
