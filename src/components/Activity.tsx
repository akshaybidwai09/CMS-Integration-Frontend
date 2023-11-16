import React, { useState, useEffect } from 'react';
import axios from 'axios';

type UserFeedItem = {
  blogText: string;
  uploadedDate: string;
  file: {
    type: number;
    data: string;
  };
};

const Activity = () => {
  const [userFeed, setUserFeed] = useState<UserFeedItem[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserFeed = async () => {
      const userProfile = localStorage.getItem('userProfile');
      if (!userProfile) {
        setError('User profile not found. Please login.');
        return;
      }

      const { email } = JSON.parse(userProfile);

      try {
        const response = await axios.post('http://127.0.0.1:8080/api/userfeed/get-user-feed', { email });
        if (response.data.statusCode === 200) {
          setUserFeed(response.data.response);
        } else {
          setError(response.data.error || 'Failed to fetch user feed.');
        }
      } catch (error: any) {
        setError('An error occurred while fetching user feed.');
      }
    };

    fetchUserFeed();
  }, []);

  const renderFile = (file: UserFeedItem['file']) => {
    if (file.type === 0 && file.data) {
      // Assuming type 0 indicates an image
      return <img src={file.data} alt="User Post" className="user-post-image" />;
    }
    // Add more conditions if there are other file types like videos
    return null;
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="activity">
      <h1>Your Activity</h1>
      <div className="activity-feed">
        {userFeed.length > 0 ? (
          userFeed.map((item, index) => (
            <div key={index} className="activity-item">
              <p className="blog-text">{item.blogText}</p>
              <p className="date">{new Date(item.uploadedDate).toLocaleDateString()}</p>
              {renderFile(item.file)}
            </div>
          ))
        ) : (
          <p className="no-activity">No activity to display.</p>
        )}
      </div>
    </div>
  );
};

export default Activity;
