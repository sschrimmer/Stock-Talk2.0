import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ticker from "../Ticker/Ticker";

const Dashboard = () => {
  const { category } = useParams();
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    // Fetch posts based on the selected category or from the dashboard home
    fetchPosts();
  }, [category]);

  const fetchPosts = async () => {
    try {
      let response;
      if (category) {
        // Fetch posts for a specific category
        const requestPayload = {
          query: `
            query PostsByCategory($category: String!) {
              postsByCategory(category: $category) {
                _id
                text
                likes
                date
              }
            }
          `,
          variables: {
            category: category,
          },
        };

        console.log("GraphQL Request Payload:", JSON.stringify(requestPayload, null, 2));

        response = await fetch("../../../server/graphql/resolvers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestPayload),
        });
      } else {
        // Fetch posts from the dashboard home
        response = await fetch("../../../server/graphql/resolvers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query AllPosts {
                posts {
                  _id
                  text
                  likes
                  date
                }
              }
            `,
          }),
        });
      }

      if (response.status === 200) {
        const data = await response.json();
        const postsData = category ? data.data.postsByCategory : data.data.posts;
        setPosts(postsData);
        setFilteredPosts(postsData);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Fetch posts error:", error);
    }
  };

  const handlePostChange = (e) => {
    setPostText(e.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a GraphQL mutation to create a new post
      const response = await fetch("../../../server/graphql/resolvers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation CreatePost($text: String!, $category: String!) {
              createPost(text: $text, category: $category) {
                _id
                text
                likes
                date
              }
            }
          `,
          variables: {
            text: postText,
            category: category,
          },
        }),
      });
  
      if (response.status === 200) {
        // Upon successful post creation, update the posts state
        fetchPosts();
        setPostText("");
      } else {
        // Handle post creation failure
        console.error("Post creation failed");
      }
    } catch (error) {
      console.error("Post creation error:", error);
    }
  };

  const handleFilterChange = (e) => {
    const filterType = e.target.value;
    if (filterType === "likes") {
      // Sort posts by likes
      const sortedPosts = [...filteredPosts].sort((a, b) => b.likes - a.likes);
      setFilteredPosts(sortedPosts);
    } else if (filterType === "date") {
      // Sort posts by date (most recent first)
      const sortedPosts = [...filteredPosts].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setFilteredPosts(sortedPosts);
    }
  };

  return (
    <div>
      <h2>{category ? `Posts in ${category}` : "Dashboard Home"}</h2>
      <Ticker />
      {category && (
        <div>
          <button onClick={() => fetchPosts()}>Back to Dashboard Home</button>
        </div>
      )}
      <div>
        <label>Filter by: </label>
        <select onChange={handleFilterChange}>
          <option value="likes">Most Liked</option>
          <option value="date">Most Recent</option>
        </select>
      </div>
      <form onSubmit={handlePostSubmit}>
        <div>
          <textarea
            rows="3"
            placeholder="What's on your mind?"
            value={postText}
            onChange={handlePostChange}
            required
          ></textarea>
        </div>
        <button type="submit">Post</button>
      </form>
      <div>
        {filteredPosts &&
          filteredPosts.map((post) => (
            <div key={post._id}>
              <p>{post.text}</p>
              <p>Likes: {post.likes}</p>
              <p>Date: {new Date(post.date).toLocaleDateString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;

