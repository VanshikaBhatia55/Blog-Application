// Import necessary modules and styles
import React from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Improved App component
function App() {
  const navigate = useNavigate();

  // Function to handle button click
  const handleButtonClick = () => {
    // Additional logic if needed before navigating
    console.log("Button clicked!");
    // Navigate to the "create" route
    navigate("create");
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="app-heading">Welcome to My App</h1>
        <p className="app-description">
          Explore and create amazing things with our app!
        </p>
        <Button
          variant="outline-success"
          className="app-button"
          onClick={handleButtonClick}
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default App;
