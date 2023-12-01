import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formValid, setFormValid] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { title, description } = post;
    const isTitleValid = title.trim().length >= 5; // Minimum 5 characters
    const isDescriptionValid = description.trim().length >= 10; // Minimum 10 characters
    const isValid = isTitleValid && isDescriptionValid;
    setFormValid(isValid);
    return isValid;
  };

  const createPost = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/create", post);
      console.log(response.data);
      setSuccessMessage("Post created successfully!");
      handleSuccess();
      navigate("posts");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error creating post. Please try again.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setPost({
      title: "",
      description: "",
    });
  };

  useEffect(() => {
    let timeout;

    if (successMessage) {
      timeout = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); // Clear success message after 3 seconds
    }

    return () => clearTimeout(timeout);
  }, [successMessage]);

  return (
    <div className="create-post-container">
      <h1 className="create-post-heading">Create Post</h1>
      <Form>
        <Form.Group>
          <Form.Control
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <Form.Control
            name="description"
            value={post.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </Form.Group>
        {!formValid && (
          <Alert variant="danger" className="form-alert">
            Title must be at least 5 characters, and description must be at least 10 characters.
          </Alert>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && (
          <Alert variant="success" className="form-alert">
            {successMessage}
          </Alert>
        )}
        <Button
          onClick={createPost}
          variant="success"
          disabled={loading}
          className="create-post-button"
        >
          {loading ? <Spinner animation="border" size="sm" /> : "CREATE POST"}
        </Button>
      </Form>
      <Button
        onClick={() => navigate("posts")}
        variant="outline-success"
        className="all-posts-button"
      >
        ALL POSTS
      </Button>
    </div>
  );
}

export default CreatePost;
