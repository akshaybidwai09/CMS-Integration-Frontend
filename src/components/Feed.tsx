// src/components/Feed.tsx
import React, { useState, useEffect } from "react";
type Post = {
  userName: string;
  blogText: string;
  uploadedDate: string;
  file: {
    type: number;
    data: string;
  };
  video: boolean;
  category: string;
};
const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {}, [filterType, filterText]);

  const fetchPosts = async () => {
    const response = await fetch(
      "http://127.0.0.1:8080/api/userfeed/get-users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: filterType, filterText }),
      }
    );
    const data = await response.json();
    console.log("api response", data);
    if (data.statusCode === 200) {
        if (filterType === "name" && data.response.length > 0) {
            const name = data.response[0].name;
            data.response[0].userFeed.forEach((userFeedItem: { userName: any; }) => {
            userFeedItem.userName = name;
            });
            setPosts(data.response[0].userFeed);
          } else {
            setPosts(data.response);
          }
    }
  };

  const renderMedia = (post: Post) => {
    if (post.video && post.file && post.file.data) {
      return (
        <video
          src={`data:video/mp4;base64,${post.file.data}`}
          controls
          style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
        />
      );
    } else if (!post.video && post.file && post.file.data) {
      return (
        <img
          src={`data:image/jpeg;base64,${post.file.data}`}
          alt="User Post"
          style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
        />
      );
    }
    return null;
  };

  return (
    <div className="feed">
      <div className="search-bar">
        <select onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="date">Date</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button onClick={fetchPosts}>Search</button>
      </div>
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <h2>{post.userName}</h2>
            <p>{post.blogText}</p>
            <p>{post.uploadedDate}</p>
            <p>{post.category}</p>
            {renderMedia(post)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
