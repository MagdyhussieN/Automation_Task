# Todo Manager - Full Stack Application

A complete full-stack Todo Manager application built with React frontend and Node.js backend.

## Features

- **User Authentication**: Login with email/password
- **Todo Management**: Create, read, update, and delete todos
- **Modern UI**: Built with React and Tailwind CSS
- **Protected Routes**: JWT-based authentication
- **Real-time Updates**: Immediate UI updates after API calls
- **Error Handling**: Comprehensive error messages and validation
- **JSON Data Storage**: Persistent data storage using JSON files

## Tech Stack

### Backend
- Node.js
- Express.js
- JWT for authentication
- bcryptjs for password hashing (optional)
- CORS enabled
- JSON file-based storage (easily replaceable with MongoDB)

### Frontend
- React 18
- Vite for build tooling
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Context API for state management

## Project Structure

```
├── backend/                 # Node.js + Express backend
│   ├── data/               # JSON data files
│   │   ├── users.json      # User data
│   │   └── todos.json      # Todo data
│   ├── services/           # Data service layer
│   │   └── dataService.js  # JSON file operations
│   ├── scripts/            # Utility scripts
│   │   ├── initData.js     # Initialize data files
│   │   └── addUser.js      # Add new users
│   ├── package.json
│   └── server.js
├── frontend/               # React frontend
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── contexts/
│       │   └── AuthContext.jsx
│       ├── services/
│       │   └── api.js
│       └── components/
│           ├── Login.jsx
│           ├── Dashboard.jsx
│           ├── TodoList.jsx
│           ├── TodoItem.jsx
│           └── TodoForm.jsx
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Initialize data files (optional - will be done automatically on startup):
```bash
npm run init-data
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Using Root Scripts

You can also use the root package.json scripts:

```bash
# Install all dependencies
npm run install-all

# Start both backend and frontend
npm run dev

# Start only backend
npm run backend

# Start only frontend
npm run frontend
```

## Data Management

### JSON Data Files

The application uses JSON files for data storage:

- `backend/data/users.json` - User accounts
- `backend/data/todos.json` - Todo items

### Adding New Users

Use the utility script to add new users:

```bash
cd backend
node scripts/addUser.js <email> <password> <name>
```

Example:
```bash
node scripts/addUser.js john@example.com password123 "John Doe"
```

### Data Initialization

Data files are automatically initialized on server startup. You can also manually initialize them:

```bash
cd backend
npm run init-data
```

## API Endpoints

### Authentication
- `POST /login` - User login

### Todos (Protected Routes)
- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Demo Credentials

- **Email**: user@example.com
- **Password**: Mm12345!

## Features in Detail

### Authentication
- JWT-based authentication
- Token stored in localStorage
- Automatic token refresh
- Protected routes

### Todo Management
- Create todos with title and description
- Mark todos as complete/incomplete
- Edit existing todos
- Delete todos
- Real-time updates

### Data Persistence
- JSON file-based storage
- Automatic data initialization
- Persistent across server restarts
- Easy to backup and version control

### UI/UX
- Responsive design
- Loading states
- Error handling
- Form validation
- Modern, clean interface

## Development

### Backend Development
- JSON files are automatically created on first run
- Data is persisted between server restarts
- Easy to switch to MongoDB by updating dataService.js
- JWT secret should be changed in production

### Frontend Development
- Built with Vite for fast development
- Hot module replacement enabled
- Tailwind CSS for styling
- Component-based architecture

### Data Backup
Since data is stored in JSON files, you can easily backup your data:
```bash
cp backend/data/*.json backup/
```

## Production Deployment

### Backend
1. Set environment variables:
   - `PORT` - Server port
   - `JWT_SECRET` - Secret key for JWT

2. Build and deploy:
```bash
npm install --production
npm start
```

### Frontend
1. Build the application:
```bash
npm run build
```

2. Serve the `dist` folder with a static file server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning or commercial purposes. 