// src/components/Feed.tsx
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Activity.css";

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
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

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
        data.response[0].userFeed.forEach((userFeedItem: { userName: any }) => {
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      setFilterText(date);
    } else {
      setFilterText("");
    }
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    const utcDate = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );
    return utcDate.toLocaleDateString(undefined, options);
  };

  return (
    <div className="activity">
      <h1>All Posts</h1>
      <div className="search-bar">
        <select onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="date">Date</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
        </select>
        {filterType === "date" ? (
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select a Date"
          />
        ) : (
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setFilterText(e.target.value)}
          />
        )}
        <button onClick={fetchPosts}>Search</button>
      </div>

      <div className="activity-feed">
        {posts.map((post, index) => (
          <div key={index} className="activity-item">
            {/* <h2>{post.userName}</h2> */}
            {renderMedia(post)}
            <p className="blog-text">{post.blogText}</p>
            <div className="post-footer">
              <div className="post-category">{post.category}</div>
              <div className="post-info">
                Posted by {post.userName} on {formatDate(post.uploadedDate)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
