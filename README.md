# Quizzo

Quizzo is a **Quiz Management System** where teachers can log in, create, edit, and delete quizzes. It consists of a **React (Vite) frontend** and a **TypeScript (Express) backend** using **Prisma** and **PostgreSQL**.

```js
# Test user credentials:

username: test1
password: test12345

username: test2
password: test12345
```

## Overview

This allows teachers to create, manage, and delete quizzes. It also provides a **user-friendly interface** for teachers to create, edit, and delete quizzes.

### **Home Page**

![Home Page](/frontend/public/home.png)

### **Login Page**

![Login Page](/frontend/public/login.png)

### **Dashboard Page**

![Dashboard Page](/frontend/public/dashboard.png)

### **Quiz Details Page**

![Quiz Details Page](/frontend/public/quiz-details.png)

### **About Page**

![About Page](/frontend/public/about.png)

### **Contact Page**

![Contact Page](/frontend/public/contact.png)

## Tech Stack

### **Frontend**

-   **React.js & Vite** - Frontend framework
-   **TypeScript** - Type-safe development
-   **TailwindCSS** - Styling
-   **ShadCN UI** - UI components
-   **React Router** - Navigation
-   **Axios** - API requests handling
-   **React Hook Form & Zod** - Form validation
-   **Framer Motion** - Animations

### **Backend**

-   **Node.js & Express.js** - Backend framework
-   **TypeScript** - Type safety
-   **Prisma ORM** - Database management
-   **PostgreSQL** - Database
-   **Nodemon** - Development tool
-   **Bcryptjs** - Password encryption

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/alok-x0s1/Quizzo.git
cd Quizzo
```

### **2️⃣ Install Dependencies**

Run the following command to install all the necessary dependencies:

```bash
cd frontend && npm install
cd ../backend && npm install
```

### **3️⃣ Configure Environment Variables**

Refer to the [Backend README](/backend/README.md) and [Frontend README](/frontend/README.md) for environment variable setup instructions.

### **4️⃣ Set Up the Database**

Run the following Prisma commands:

```sh
npx prisma migrate dev --name init
```

### **5️⃣ Run the Application**

Run the following command to start the application:

```bash
cd backend && npm run dev
cd ../frontend && npm run dev
```

### **5️⃣ Access the Application**

The application will be accessible at [http://localhost:5173](http://localhost:5173) in your browser.

## API Endpoints

Refer to the [Backend README](/server/README.md) for detailed API documentation.

## Contributing

Feel free to submit pull requests and open issues. Contributions are always welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## Support

For any issues, contact : **[@contact_me](https://instagram.com/mr_x0s1)**

## Thank You!

Thanks for using E-manage! If you have any questions or feedback, don't hesitate to reach out. Happy event planning!
