// src/components/NewPost.tsx
import React, { useState } from 'react';

const NewPost = () => {
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you will handle the submission and use an API call to the backend
    console.log(postContent);
    if (image) {
      console.log(image.name);
    }
    // TODO: POST request to the backend with the form data
  };

  return (
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
  );
};

export default NewPost;
