# Project Overview

This project consists of a backend and frontend setup, running concurrently to provide a full-stack application with the following features:

- **User Login**
- **Sales Dashboard Summary**
- **User CRUD**
- **Chatbot with Gemini AI**

## Folder Structure

```
project/
  ├── backend/
  ├── frontend/
  ├── package.json
  └── READNE.md
```

## Features

### 1. User Login
Users can log into the application with the default admin credentials.

**Default Admin Credentials:**
- **Username:** sysadmin
- **Password:** admin123

### 2. Sales Dashboard Summary
Displays an overview of sales data.

### 3. User CRUD
Features to create, read, update, and delete users.

### 4. Chatbot with Gemini AI
Integrates a chatbot using Gemini AI.

## Running the Project

The project consists of a backend and frontend, and both should be run simultaneously.

### Setup

Before running the project, ensure that the necessary environment variables are set. Both the `backend/` and `frontend/` folders contain `.env` and `.env.example` files. Make sure to configure the environment variables as needed.

### Install Dependencies

1. **Backend Requirements**  
   Navigate to the `backend/` folder and install the required dependencies by running:

   ```bash
   pip install -r requirements.txt
   ```

2. **Frontend Dependencies**  
   From the root directory, install the frontend dependencies by running:

   ```bash
   npm install
   ```

### Running the Project

To start both the backend and frontend simultaneously, use the following command:

```
npm run dev
```

This will:
- Run the frontend using `npm run dev` in the `frontend/` directory.
- Start the backend using `uvicorn` in the `backend/` directory.

### Backend

To run the backend individually, use:

```bash
uvicorn backend.app.main:app --reload
```

### Frontend

To run the frontend individually, use:

```bash
npm run dev
```

## API Documentation

Once the backend server is running, you can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contact

Feel free to reach out if you have any questions or need assistance.

- **Email:** fadlysyah96@gmail.com
- **LinkedIn:** [Fadly Syah](https://linkedin.com/in/fadlytjg)

```
