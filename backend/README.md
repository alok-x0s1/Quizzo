# Quizzo | Backend

Quizzo is a **Quiz Management System** where teachers can log in, create, edit, and delete quizzes. The backend is built using **TypeScript, Express, Prisma, and PostgreSQL** to handle authentication and quiz management.

## Tech Stack

-   **Node.js & Express.js** - Backend framework
-   **TypeScript** - Type-safe development
-   **Prisma ORM** - Database management
-   **PostgreSQL** - Realional Database
-   **Nodemon** - Development tool
-   **Bcryptjs** - Password encryption

## Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/alok-x0s1/Quizzo.git
cd Quizzo/backend
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Configure Environment Variables**

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/quizzo"
PORT=3000
SECRET_KEY=your-secret-key
NODE_ENV=development
```

Replace `user`, `password`, and `quizzo` with your actual PostgreSQL credentials.

### **4️⃣ Set Up the Database**

Run the following Prisma commands to create the database schema: You can skip this step if you have a pre-existing database.

```sh
npx prisma migrate dev --name init
```

### **5️⃣ Start the Server**

```sh
npm run dev
```

The backend will be running at: `http://localhost:3000`

## API Documentation

### **Authentication Routes**

#### 🔹 **Login**

**POST** `/api/users/login`

##### Request Body:

```json
{
	"username": "test1",
	"password": "test12345"
}
```

##### Response:

```json
{
    "success": true,
	"message": "Logged in successfully",
	"data": 405f9d8d-e5fb-44bf-b647-d5ed337d099e
}
```

### **Quiz Management Routes**

#### 🔹 **Create a Quiz**

**POST** `/api/quizzes`

##### Request Body:

```json
{
	"title": "Math Quiz",
	"description": "A quiz on Algebra"
}
```

##### Response:

```json
{
	"success": true,
    "message": "Quiz created successfully",
    "data": {
        "id": 1,
	    "title": "Math Quiz",
	    "description": "A quiz on Algebra",
	    "teacherId": 405f9d8d-e5fb-44bf-b647-d5ed337d099e,
        "createdAt": "2025-02-15T00:00:00.000Z"
    }
}
```

#### 🔹 **Get All Quizzes**

**GET** `/api/quizzes`

##### Response:

```json
{
    "success": true,
    "message": "Quizzes fetched successfully",
    "data": [
        {
            "id": 1,
            "title": "Math Quiz",
            "description": "A quiz on Algebra",
            "teacherId": 405f9d8d-e5fb-44bf-b647-d5ed337d099e,
            "createdAt": "2025-02-15T00:00:00.000Z"
        },
    ]
}
```

#### 🔹 **Get Quiz by ID**

**GET** `/api/quizzes/{id}`

##### Response:

```json
{
    "success": true,
    "message": "Quiz fetched successfully",
    "data": {
        "id": 1,
        "title": "Math Quiz",
        "description": "A quiz on Algebra",
        "teacherId": 405f9d8d-e5fb-44bf-b647-d5ed337d099e,
        "createdAt": "2025-02-15T00:00:00.000Z"
    }
}
```

#### 🔹 **Update a Quiz**

**PUT** `/api/quizzes/{id}`

##### Request Body:

```json
{
	"title": "Updated Quiz Title",
	"description": "Updated description"
}
```

##### Response:

```json
{
    "success": true,
    "message": "Quiz updated successfully",
    "data": {
        "id": 1,
        "title": "Updated Quiz Title",
        "description": "Updated description",
        "teacherId": 405f9d8d-e5fb-44bf-b647-d5ed337d099e,
        "createdAt": "2025-02-15T00:00:00.000Z"
    }
}
```

#### 🔹 **Delete a Quiz**

**DELETE** `/api/quizzes/{id}`

##### Response:

```json
{
	"success": true,
	"message": "Quiz deleted successfully"
}
```

## Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int     @id @default(autoincrement())
  username String  @unique
  password String
  quizzes  Quiz[]
}

model Quiz {
  id          Int     @id @default(autoincrement())
  title       String
  description String
  teacherId   Int
  createdAt   DateTime @default(now())

  teacher     User     @relation(fields: [teacherId], references: [id], onDelete: Cascade)
}
```

## Contributing

Feel free to submit pull requests and open issues. Contributions are always welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## Support

For any issues, contact : **[@contact_me](https://instagram.com/mr_x0s1)**

🎉 Thank You!
