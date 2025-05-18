# Ticket Management System

A full-stack ticket management system built with React (frontend) and Django (backend). The system allows users to create, manage, and communicate through tickets with real-time updates.

## Features

- User authentication and authorization
- Create and manage tickets with priority levels
- Real-time messaging system within tickets
- Clean and responsive Material-UI interface
- Token-based authentication
- Message threading functionality

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- Node.js 14.x or higher
- npm or yarn
- Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Ticket-Management-System.git
cd Ticket-Management-System
```

### 2. Backend Setup

```bash
# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate

# Navigate to backend directory
cd backend

# Install required packages
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create a superuser (follow the prompts)
python manage.py createsuperuser

# Start the backend server
python manage.py runserver
```

The backend server will start at `http://localhost:8000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

The frontend application will start at `http://localhost:3000`

## Environment Setup

### Backend (Django)

Create a `.env` file in the backend directory with the following variables:
```env
DEBUG=True
SECRET_KEY=your_secret_key_here
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend (React)

Create a `.env` file in the frontend directory with:
```env
REACT_APP_API_URL=http://localhost:8000
```

## API Endpoints

### Authentication
- POST `/api/auth/login/` - User login
- POST `/api/auth/register/` - User registration

### Tickets
- GET `/api/tickets/` - List all tickets
- POST `/api/tickets/` - Create new ticket
- GET `/api/tickets/<id>/` - Get ticket details
- PUT `/api/tickets/<id>/` - Update ticket
- DELETE `/api/tickets/<id>/` - Delete ticket

### Messages
- GET `/api/messages/` - List messages
- POST `/api/messages/` - Create message
- GET `/api/messages/<id>/` - Get message details

## Usage

1. Register a new user account or login with existing credentials
2. Create a new ticket with title, description, and priority
3. View all tickets in the main dashboard
4. Click on a ticket to view details and message thread
5. Add messages to tickets for communication

## Tech Stack

### Frontend
- React
- Material-UI
- React Router
- Universal Cookie for token management

### Backend
- Django
- Django REST Framework
- SQLite (default database)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 