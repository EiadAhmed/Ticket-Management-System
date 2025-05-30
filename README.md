# Ticket Management System

A full-stack ticket management system built with React (frontend) and Django (backend). The system allows users to create, manage, and communicate through tickets with real-time updates.

## Features

- User authentication and authorization
- Create and manage tickets with priority levels
- Real-time messaging system within tickets
- Clean and responsive Material-UI interface
- Token-based authentication
- Message threading functionality
## Go to the instructions (Ubuntu preferred) after the images
![admin](https://github.com/user-attachments/assets/a5647ef8-b131-4b1a-bde2-c431905ca13f)

![admin2](https://github.com/user-attachments/assets/a4fb4c38-7215-4597-89a5-c00e2d9bef41)

![admin3](https://github.com/user-attachments/assets/c2568370-066d-411d-ad05-abc12235b23d)
![userui](https://github.com/user-attachments/assets/5c4e1fe8-f999-4d4b-bbbd-39ba853e5a87)
![userui2](https://github.com/user-attachments/assets/e9dffc7a-01bf-47b9-89e3-219780f0711a)

![userui3](https://github.com/user-attachments/assets/16d4e355-0071-4223-b854-11cfc8edac7c)
![userui4](https://github.com/user-attachments/assets/9f0a2438-feab-496b-9000-0cdfaffaf74b)


## Prerequisites

Before you begin, ensure you have the following installed:
```bash
sudo apt update
sudo apt upgrade -y            # optional, but recommended
sudo apt install -y curl gnupg software-properties-common build-essential
sudo apt install git-all
sudo apt install git
sudo apt install nodejs
sudo apt install npm

```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/EiadAhmed/Ticket-Management-System.git
cd Ticket-Management-System
```

### 2. Backend Setup

```bash
# Create and activate virtual environment
sudo apt install python3.12-venv
sudo python -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate

# Install required packages
pip install -r requirements.txt
#create .env file 
# Create the .env File
#You can use any text editor, such as nano, to create and edit the .env file:
 

nano .env
#paste them or change secret key if you want
```env
DEBUG=True
SECRET_KEY=django-insecure-lx&3r2e1155fghfd@&eghi^&8li=wfb1alxu=xqatw+y+4g$k2w3f86-d
API_HOSTNAME=localhost,127.0.0.1
```
```bash
# When you're done, save the file:

# Press Ctrl + O to write (save) the file.

# Press Enter to confirm.

# Press Ctrl + X to exit the editor.

# Navigate to backend directory

cd backend



# Run migrations
python manage.py migrate

# Create a superuser (follow the prompts)
python manage.py createsuperuser

# Start the backend server
python manage.py runserver
```

The backend server will start at on port`:8000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```



