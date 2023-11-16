import React, { useState } from 'react';
import axios from 'axios';

const NewPost = () => {
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve email from local storage
    const storedUserInfo = localStorage.getItem("userProfile");
    let userEmail = storedUserInfo ? JSON.parse(storedUserInfo).email : '';

    if (!userEmail) {
      setMessage("User email not found. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append('email', userEmail);
    formData.append('blogText', postContent);
    if (image) {
      formData.append('file', image);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8080/api/userfeed/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.statusCode === 200) {
        setMessage("Content Successfully Posted!");
      } else {
        setMessage("Something went wrong while uploading content!");
      }
    } catch (error) {
      setMessage("An error occurred while posting the content.");
    }
  };

  return (
    <div>
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={postContent}
          onChange={handleTextChange}
          required
        ></textarea>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};

export default NewPost;
