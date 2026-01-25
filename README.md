# Online Forum Website

A frontend-only responsive online forum/discussion board website built with HTML, CSS, and JavaScript. This project simulates a forum using localStorage for data persistence.

## Features

- **Homepage**: List of forum topics with search and filters
- **Topic Details**: View topic content and comments
- **Create Topic**: Form to add new topics (requires login)
- **User Authentication**: Simulated login and registration
- **User Profiles**: View and edit user profiles
- **Likes and Comments**: Interactive like buttons and comment system
- **Moderation**: Admin can delete topics and comments
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- HTML5
- CSS3 (with Bootstrap 5)
- JavaScript (Vanilla JS)
- localStorage for data storage

## Getting Started

1. Open `index.html` in a web browser.
2. Register a new account or login with demo accounts:
   - Username: `admin` (admin role)
   - Username: `user1` (regular user)
   - Password: any value

## Project Structure

```
/
├── index.html          # Homepage
├── topic.html          # Topic details page
├── create-topic.html   # Create new topic
├── login.html          # Login page
├── register.html       # Registration page
├── profile.html        # User profile
├── edit-profile.html   # Edit profile
├── css/
│   └── style.css       # Custom styles
├── js/
│   ├── app.js          # Common functions
│   ├── data.js         # Dummy data initialization
│   ├── index.js        # Homepage logic
│   ├── topic.js        # Topic page logic
│   ├── create-topic.js # Create topic logic
│   ├── login.js        # Login logic
│   ├── register.js     # Register logic
│   ├── profile.js      # Profile logic
│   └── edit-profile.js # Edit profile logic
└── assets/             # Images and icons (placeholder)
```

## Usage

- Browse topics on the homepage
- Click on a topic title to view details and comments
- Login to add comments or create topics
- Use the search bar to find topics
- Filter topics by newest or most liked
- Toggle dark mode for better viewing
- Admins can delete topics and comments

## Notes

- All data is stored in the browser's localStorage
- No real backend; functionality is simulated
- Avatars use placeholder images
- Timestamps are in local format