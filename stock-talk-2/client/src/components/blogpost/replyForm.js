import React, { useState } from 'react';

const ReplyForm = ({ onReply }) => {
  const [replyText, setReplyText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (replyText.trim() !== '') {
      onReply(replyText);
      setReplyText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Write a reply..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <button type="submit">Reply</button>
    </form>
  );
};

export default ReplyForm;