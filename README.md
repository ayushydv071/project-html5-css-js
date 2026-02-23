# Online Forum Website

A frontend-only responsive online forum / discussion board built using HTML5, CSS3, and Vanilla JavaScript.
All data (users, topics, comments) is saved in the browser’s localStorage, simulating a backend database.

🚀 Features

✔ Homepage displaying all forum topics
✔ Search bar to find topics
✔ Topic detail view with comments
✔ Login & Register (simulated authentication)
✔ Create new topic (requires login)
✔ Edit user profile
✔ Like topics and comments
✔ Admin moderation (delete topics/comments)
✔ Dark / Light mode toggle
✔ Fully responsive design (mobile/tablet/desktop)

🧠 Tech Stack
Technology	Purpose
HTML5	Markup
CSS3 + Bootstrap	Layout & styling
JavaScript (Vanilla)	Logic & interactivity
localStorage	Browser-based data storage
📁 Project Structure
/
├── css/
│   └── style.css               # Styles
├── js/
│   ├── database.js             # Data storage & utilities
│   └── view_data.js            # Rendering & page logic
├── index.html                  # Homepage
├── login.html                  
├── register.html              
├── profile.html                
├── edit-profile.html          
├── topic.html                 
├── create-topic.html          
├── stats.html                 
├── server.js                  # (empty / placeholder for backend)
├── package.json               
└── package-lock.json          

View full tree on GitHub.

🛠️ How to Run the Project
🔹 Method 1: Open Directly

Clone or download the repo

git clone https://github.com/ayushydv071/project-html5-css-js

In your browser, open index.html.

No installation or server required.

🔹 Method 2: Run with Live Server (VS Code)

Open the project in Visual Studio Code.

Install Live Server extension.

Right-click index.html → Open with Live Server.

This allows automatic refresh when you edit files.

👤 User Accounts (Demo)

You can register any username & password. Two sample roles:

Username	Role
admin	Admin (can delete topics/comments)
user1	Regular user

Password: anything — the app does not enforce a strict password check.

📊 Data Storage (Simulated Database)

This project uses localStorage to store all data — topics, users, comments, profiles.
No actual backend or server-side database.

To view or modify data in localStorage:

Open the project in a browser.

Press F12 → Developer Tools.

Go to Application (Chrome) → localStorage.

Select the current site and inspect keys like:

users
topics
comments
loggedInUser

Each of these stores JSON data your forum uses. You can see, edit, or clear data directly from here — just be cautious, as changes overwrite app state.

📌 Usage Guide

✔ Browse the homepage to see topics
✔ Use search bar to filter by title
✔ Click a topic to view its details & comments
✔ Login to add new topics or post comments
✔ Toggle dark/light mode at the top
✔ Admin account can delete topics/comments
✔ Profile page lets you edit your profile information

🗒️ Notes

✦ There is no backend server — all operations happen in the browser.
✦ If localStorage is cleared, all forum data resets.
✦ Avatars and images are placeholders.
✦ Timestamps are based on user’s local time.

🆕 Improvements You Could Add

✨ Connect to a real backend (Node.js, Express, MongoDB)
✨ Add image uploads
✨ Real password hashing & authentication
✨ Infinite scroll & pagination
✨ Notifications for new comments

📄 License

No license currently specified — consider adding an MIT License to make reuse easier.

📣 Thank You

If this project helped you learn HTML/CSS/JS — leave a ⭐ on the repo! 🚀
Feel free to ask if you want badges, screenshots, GIF preview, or GitHub Pages deployment! 😊
