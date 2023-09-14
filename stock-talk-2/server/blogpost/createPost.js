import React, { useState } from 'react';
import ReplyForm from './replyForm';

const BlogPost = ({ title, content }) => {
  const [likes, setLikes] = useState(0);
  const [replies, setReplies] = useState([]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleReply = (replyText) => {
    const newReply = {
      text: replyText,
      id: replies.length + 1, 
    };
    setReplies([...replies, newReply]);
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={handleLike}>Like ({likes})</button>
      <div>
        <h3>Replies</h3>
        <ul>
          {replies.map((reply) => (
            <li key={reply.id}>{reply.text}</li>
          ))}
        </ul>
      </div>
      <ReplyForm onReply={handleReply} />
    </div>
  );
};

export default BlogPost;