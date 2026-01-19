# 📱 Contact Form Backend API

A production-ready Node.js backend with MongoDB integration, featuring a beautiful contact form UI and comprehensive error handling.

## 🚀 Features

- ✅ **Beautiful Contact Form UI** - Modern, responsive design on base route
- ✅ **RESTful API** - Full CRUD operations for contact submissions
- ✅ **MongoDB Integration** - Secure data persistence
- ✅ **Global Error Handling** - Centralized error management
- ✅ **Validation** - Comprehensive input validation
- ✅ **Custom 404 Page** - Beautiful error page for non-existent routes
- ✅ **Reusable Response Handlers** - Consistent API responses
- ✅ **CORS Enabled** - Cross-origin requests allowed

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🔧 Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8050
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_db
NODE_ENV=development

# Email Configuration (Gmail SMTP)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-specific-password
ADMIN_EMAIL=admin@example.com
```

**MongoDB Connection Options:**
- **Local MongoDB**: `mongodb://localhost:27017/portfolio_db`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/portfolio_db`

**Email Setup (Gmail):**
1. Enable 2-Factor Authentication on your Google Account
2. Generate an App-Specific Password: [Google Account Security](https://myaccount.google.com/apppasswords)
3. Copy the 16-character password and use it as `EMAIL_PASSWORD` in `.env`
4. Use your Gmail address as `EMAIL_USER`

### 3. Start the Server

```bash
npm start
```

The server will start at `http://localhost:8050`

## 📖 API Documentation

### Base URL
```
http://localhost:8050/api
```

### Endpoints

#### 1. **Create Contact (Submit Form)**
```
POST /api/contact
```

**Required Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstname": "John",        // Required: min 2 characters
  "lastname": "Doe",          // Optional
  "email": "john@example.com", // Required: valid email
  "phone": "1234567890",       // Optional: min 10 digits
  "message": "Hello, I'd like to discuss..." // Required: min 5 characters
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "contact": {
      "_id": "507f1f77bcf86cd799439011",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "message": "Hello...",
      "createdAt": "2024-01-17T10:30:00.000Z",
      "updatedAt": "2024-01-17T10:30:00.000Z"
    },
    "emailSent": true,
    "message": "Welcome email sent to your inbox!"
  },
  "timestamp": "2024-01-17T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": {
    "firstname": "First name is required and must be at least 2 characters",
    "email": "Please provide a valid email address",
    "message": "Message is required and must be at least 5 characters"
  },
  "timestamp": "2024-01-17T10:30:00.000Z"
}
```

---

#### 3. **Get All Contacts**
```
GET /api/contact
```

**Response (200):**
```json
{
  "success": true,
  "message": "Retrieved 5 contact(s)",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "message": "Hello...",
      "createdAt": "2024-01-17T10:30:00.000Z"
    },
    // ... more contacts
  ],
  "timestamp": "2024-01-17T10:30:00.000Z"
}
```

---


## 💻 Frontend Integration

### Using Fetch API

```javascript
// Configuration
const API_URL = 'http://localhost:8050/api/contact';

// Submit Form
async function submitContactForm() {
  const formData = {
    firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✓ Form submitted successfully!', data.data);
      // Reset form, show success message
    } else {
      console.error('✗ Validation errors:', data.errors);
      // Show validation errors
    }
  } catch (error) {
    console.error('✗ Network error:', error);
  }
}
```

### Using Axios

```javascript
const axios = require('axios');

const submitContact = async () => {
  try {
    const response = await axios.post('http://localhost:8050/api/contact', {
      firstname: 'John',
      email: 'john@example.com',
      message: 'Your message here',
    });

    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
```

---

## 📁 Project Structure

```
backend/
├── public/
│   ├── index.html          # Contact form UI
│   └── 404.html            # Custom 404 page
├── models/
│   └── Contact.js          # MongoDB schema
├── config/
│   └── db.js          # Connect DB
├── controllers/
│   └── contactController.js # Business logic
├── routes/
│   └── contactRoutes.js    # API routes
├── utils/
│   ├── responseHandler.js  # Reusable response utilities
│   ├── errorHandler.js     # Error definitions
│   └── globalErrorMiddleware.js # Global error handler
├── server.js               # Main server file
├── package.json            # Dependencies
├── .env                    # Environment variables
└── README.md               # This file
```

---

## ✅ Validation Rules

| Field | Required | Type | Rules |
|-------|----------|------|-------|
| firstname | ✓ | string | Min 2 characters |
| lastname | ✗ | string | Any length |
| email | ✓ | string | Valid email format |
| phone | ✗ | string | Min 10 digits (if provided) |
| message | ✓ | string | Min 5 characters |

---

## 🛡️ Error Handling

The API uses consistent error responses:

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": {
    "firstname": "First name is required and must be at least 2 characters"
  },
  "timestamp": "2024-01-17T10:30:00.000Z"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Contact not found",
  "timestamp": "2024-01-17T10:30:00.000Z"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "An unexpected error occurred",
  "timestamp": "2024-01-17T10:30:00.000Z"
}
```

---

## 📱 UI Routes

- **Home Page (Contact Form)**: `http://localhost:8050/`
- **API Docs**: Available on the home page (left panel)
- **404 Page**: Automatically shown for non-existent routes

---

## 🔄 Development

To run in development mode with auto-reload:

```bash
npm run dev
```

This uses `nodemon` to restart the server on file changes.

---

## 🌐 CORS Configuration

CORS is enabled for all origins. To restrict specific origins, modify the server.js:

```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or the connection string is correct
- Check internet connection if using MongoDB Atlas
- Verify credentials in .env file

### Port Already in Use
Change the PORT in `.env`:
```env
PORT=8051
```

### CORS Errors
The backend already has CORS enabled. If still getting errors:
1. Check the frontend URL in the request
2. Verify CORS headers in browser DevTools

---

## 📞 Support

For issues or questions, check the console logs for detailed error messages. All errors are logged with timestamps.

---

## 📄 License

This project is open source and available under the MIT License.
