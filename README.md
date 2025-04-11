## Project Overview

This project consists of a backend and frontend setup, running concurrently to provide a full-stack application with the following features:

- **User Login**
- **Sales Dashboard Summary**
- **User CRUD**
- **Chatbot with Gemini AI**

## 📁 Folder Structure

```
project/
  ├── backend/
  ├── frontend/
  ├── package.json
  └── READNE.md
```


## ✅ Features

### 1. User Login
Users can log into the application with the default admin credentials.

### 🔐 Default Admin Credentials:
- **Username:** `sysadmin`
- **Password:** `admin123`

### 2. Sales Dashboard Summary
Displays an overview of sales data.

### 3. User CRUD
Features to create, read, update, and delete users.

### 4. Chatbot with Gemini AI
Integrates a chatbot using Gemini AI.


## 🚀 How to Run

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

### Running

To start both the backend and frontend simultaneously, use the following command:

```
npm run dev
```

This will:
- Run the frontend using `npm run dev` in the `frontend/` directory.
- Start the backend using `uvicorn` in the `backend/` directory.


#### Backend

To run the backend individually, use:

```bash
uvicorn backend.app.main:app --reload
```


#### Frontend

To run the frontend individually, use:

```bash
npm run dev
```

## 📷 Screenshot

- Login
  
  ![image](https://github.com/user-attachments/assets/f34d5da7-6902-43c8-b60b-ba40969ecaba)

- Sales Dashboard
  
  ![image](https://github.com/user-attachments/assets/78d38905-1fe0-4397-a9a1-4e2005d6ef75)

- User CRUD

  ![image](https://github.com/user-attachments/assets/f1b02326-b85c-42ab-8534-ffcba8843a77)

- Chatbot Assistant with Gemini AI

  ![image](https://github.com/user-attachments/assets/627aaf6f-5f0d-49be-9dc0-1652c1ab1022)

- Responsive UI

  ![image](https://github.com/user-attachments/assets/92936baf-7849-4aca-a339-8f5987932e72)

  ![image](https://github.com/user-attachments/assets/8e49f798-0eb1-4121-9763-bde6e30859f3)






## 📦 API Documentation

Once the backend server is running, you can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`


## 🛸 Contact

Feel free to reach out if you have any questions or need assistance.

- **Email:** fadlysyah96@gmail.com
- **LinkedIn:** [Fadly Tanjung](https://linkedin.com/in/fadlytjg)

## License

[MIT](https://choosealicense.com/licenses/mit/)
