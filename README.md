# Online Forum Website

A simple frontend-only interactive forum / discussion board built using HTML, CSS & JavaScript. This project simulates user registration, login, topics, comments, profiles and more — all using browser storage (no real backend).

🚀 Features

🏠 Homepage listing all forum topics

🔎 Search & filter topics

📄 Topic detail view with comments

✍️ Create new topics (after login)

🔑 User authentication (register + login)

👤 User profiles & edit profile page

👍 Likes on topics / comments

🗑️ Admin moderation capabilities

🌙 Dark & light theme toggle

📱 Fully responsive for mobile & desktop

🛠️ Tech Stack
Technology	Purpose
HTML5	Markup and page structure
CSS3	Layout + design (Bootstrap & custom styles)
JavaScript	Logic, interactivity, storage
localStorage	Simulated “database” to persist user data
📁 Project Structure
/
├── css/
│   └── style.css
├── js/
│   ├── view_data.js
│   └── database.js
├── index.html
├── login.html
├── register.html
├── profile.html
├── edit-profile.html
├── topic.html
├── create-topic.html
├── stats.html
├── package.json
└── server.js

Detailed pages include homepage, login, registration, topic views, create topic, profile pages, and stats.

🚀 How to Run the Project

This is a static frontend project — no backend required.

🔹 Option 1: Open Locally

Download or clone the repo

git clone https://github.com/ayushydv071/project-html5-css-js.git

Open any .html file in your browser (index.html is the main entry).

That’s it! All interactivity works inside the browser.

🔹 Option 2: Use VS Code + Live Server

Open the project folder in Visual Studio Code.

Install the Live Server extension.

Right-click index.html → Open with Live Server.
This gives auto-reload on changes.

🗃️ How Data Is Stored (Simulated Database)

This project does not connect to a real database server. Instead, it uses the browser’s localStorage to store data:

Stored Items	Where
Registered users	localStorage.users
Logged in user session	localStorage.loggedInUser
Topics & comments	localStorage.topics

The contents of these storage keys can be viewed and edited via browser DevTools → Application → localStorage. You can manually check, update, or clear data there.

For example:

Open your browser.

Press F12 (DevTools).

Go to Application → localStorage → your site.

Inspect the JSON values for users, topics, etc.

This storage drives the forum simulation without a backend.

👤 Demo Accounts

You can register any username & password, or use these presets:

admin → full moderation rights

user1 → regular user
(Password: any value)

📝 Notes

✔ The entire app runs client-side — no server or database required.
✔ Refreshing the page keeps data thanks to localStorage.
✔ If local storage gets cleared, all forum content will reset.

📄 License

This project does not specify a license yet — consider adding one (e.g., MIT License) so others can reuse your work.

🙌 Contributions

Contributions are welcome! You can:

✔ Add real backend support (Node/Express + database)
✔ Improve UI/UX and mobile responsiveness
✔ Add user avatars and image uploads
✔ Store data on a server instead of localStorage

If you want, I can also help you generate a badge section, screenshots/GIFs in README, or setup CI/CD with GitHub Pages. Want that? 😊

https://github.com/ayushydv071/project-html5-css-js do same for this repo

Here’s a clean, complete README.md you can use for your Repository – ayushydv071/project-html5-css-js
 — describing the project, how it works, how to run it, and how to check stored data:

📘 Online Forum Website

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
