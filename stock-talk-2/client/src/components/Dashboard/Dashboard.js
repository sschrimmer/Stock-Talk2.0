import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Ticker from "../Ticker/Ticker";

const Dashboard = () => {
  const { category: selectedCategory } = useParams(); // Access the category parameter
  const [postText, setPostText] = useState("");
  const [selectedPostCategory, setSelectedPostCategory] = useState(""); // New state for post category selection
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    try {
      let response;
      if (selectedCategory) {
        // Fetch posts for a specific category
        response = await fetch("/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query PostsByCategory($category: String!) {
                postsByCategory(category: $category) {
                  _id
                  text
                  likes
                  date
                  category
                }
              }
            `,
            variables: {
              category: selectedCategory,
            },
          }),
        });
      } else {
        // Fetch posts from the dashboard home
        response = await fetch("/graphql", {
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
                  category
                }
              }
            `,
          }),
        });
      }

      if (response.status === 200) {
        const data = await response.json();
        const postsData = selectedCategory
          ? data.data.postsByCategory
          : data.data.posts;
          console.log("Fetched posts data:", postsData);
        setPosts(postsData);
        setFilteredPosts(postsData);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Fetch posts error:", error);
    }
  }, [selectedCategory]);

  useEffect(() => {
    // Fetch posts based on the selected category or from the dashboard home
    fetchPosts();
  }, [selectedCategory, fetchPosts]);

  const handlePostChange = (e) => {
    setPostText(e.target.value);
  };

  const handlePostCategoryChange = (e) => {
    setSelectedPostCategory(e.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a GraphQL mutation to create a new post with category
      const response = await fetch("/graphql", {
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
                category
              }
            }
          `,
          variables: {
            text: postText,
            category: selectedPostCategory, // Use the selected category for the new post
          },
        }),
      });

      if (response.status === 200) {
        // Upon successful post creation, update the posts state
        fetchPosts();
        setPostText("");
        setSelectedPostCategory(""); // Reset selected category
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
      <h2 class = 'label'>
        {selectedCategory
          ? `Posts in ${selectedCategory}`
          : "Dashboard Home"}
      </h2>
      <Ticker />
      <div>
        {/* Remove the link to go back to the dashboard home */}
        {/* <Link to="/dashboard">Back to Dashboard Home</Link> */}
      </div>
      <div>
        <label class = 'label'>Filter by: </label>
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
        <div>
          <label class = 'label'>Select Category: </label>
          <select
            onChange={handlePostCategoryChange}
            value={selectedPostCategory || "General"}
          >
            <option value="">General</option>
            <option value="Cryptocurrency">Cryptocurrency</option>
            <option value="Commodities">Commodities</option>
            <option value="Economic Indicators">Economic Indicators</option>
          </select>
        </div>
        <button type="submit">Post</button>
      </form>
      <div>
        {filteredPosts &&
          filteredPosts.map((post) => (
            <div key={post._id}>
              <p>{post.text}</p>
              <p>Category: {post.category || "General"}</p>
              <p>Likes: {post.likes}</p>
              <p>Date: {new Date(post.date).toLocaleDateString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
