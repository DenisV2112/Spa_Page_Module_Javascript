
  # Event Management SPA

A Single Page Application (SPA) built with JavaScript, HTML5, and CSS3, focused on event management. Designed for event organizers to create, edit, and delete events, while visitors can explore available events and register based on availability.

---

##  Developer Information

- **Name:** Denis Sanchez 
- **Clan:** Van Rossum 
- **Email:** personal.denis.sanchez@gmail.com
- **ID Number:** 3510756

---

##  Technologies Used

- JavaScript 
- HTML5 & CSS3
- json-server (to simulate a REST database)
- Local Storage
- Pure SPA 

---

##  Core Features

1. **Authentication System**
   - User registration with two roles: **admin** and **visitor**.
   - Login functionality for registered users.
   - Route protection using a custom router and guards.

2. **Session Persistence**
   - Uses Local Storage to maintain login state even after page reloads.

3. **Data Consistency**
   - Full CRUD operations synchronized with `json-server`.

4. **User Interface**
   - Responsive SPA with smooth navigation and intuitive forms.

---


###  Full Functionality

- Register and log in users based on roles.
- Admin:
  - Can create, read, update, and delete events.
- Visitor:
  - Can view available events and register for them if space allows.
  - Can view their registered events.

###  Session Persistence

- Session remains active between page reloads using Local Storage.

###  Data Synchronization

- All operations are reflected in real time in `db.json`.

###  Route Logic

- If a non-authenticated user tries to access protected routes, redirect to a custom `not-found.js` page.
- If an authenticated user accesses `/login` or `/register`, redirect to `/dashboard`.


##  User Types
###  Admin User

- A default admin user must exist in `db.json`.
- Can perform all event-related operations.

###  Visitor User

- Can:
  - Register for events if capacity allows.
  - View their registered events in the same view.

---
![Uploading image.png…]()



### How to run
 - Donwload project zip.
 - install json-server using npm install json-server.
 - run in bash to deploy the database: json-server db.json --watch --port 3001
 - open index.html (Can be using live Server)
