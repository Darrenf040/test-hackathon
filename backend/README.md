# Python Backend Boilerplate

A simple REST API backend built with Flask, SQLAlchemy, and SQLite.

## Features

- User management (CRUD operations)
- Product management (CRUD operations)
- One-to-Many relationship (User has many Products)
- SQLite database
- RESTful API endpoints

## Database Schema

### User Model

- `id` (Integer, Primary Key)
- `name` (String, Required)
- `email` (String, Unique, Required)
- `created_at` (DateTime)
- `products` (Relationship to Product model)

### Product Model

- `id` (Integer, Primary Key)
- `name` (String, Required)
- `price` (Float, Required)
- `user_id` (Integer, Foreign Key to User)
- `created_at` (DateTime)

## Setup Instructions

1. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

2. **Run the application:**

   ```bash
   python app.py
   ```

   The server will start on `http://localhost:5000`

3. **Database will be created automatically** as `database.db` in the project root.

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/<id>` - Get a specific user
- `POST /api/users` - Create a new user
- `PUT /api/users/<id>` - Update a user
- `DELETE /api/users/<id>` - Delete a user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/<id>` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/<id>` - Update a product
- `DELETE /api/products/<id>` - Delete a product

### Relationships

- `GET /api/users/<id>/products` - Get all products for a specific user

## Testing APIs Locally

### Option 1: REST Client Extension (Recommended)

1. Install the "REST Client" extension by Huachao Mao in VS Code
2. Open the `test.http` file
3. Click "Send Request" above any request to test the API

### Option 2: Python requests

```python
import requests

# Create a user
response = requests.post('http://localhost:5000/api/users', json={
    'name': 'John Doe',
    'email': 'john@example.com'
})
print(response.json())
```

### Option 3: cURL

```bash
curl -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\"}"
```

## Project Structure

```
backend/
├── app.py              # Main application entry point
├── database.py         # Database configuration
├── models.py           # Database models (User, Product)
├── routes.py           # API routes/endpoints
├── requirements.txt    # Python dependencies
├── test.http          # API test requests (for REST Client)
└── README.md          # This file
```

## Example Usage

1. Create a user:

   ```json
   POST /api/users
   {
     "name": "John Doe",
     "email": "john@example.com"
   }
   ```

2. Create a product for that user:

   ```json
   POST /api/products
   {
     "name": "Laptop",
     "price": 999.99,
     "user_id": 1
   }
   ```

3. Get user with their products:
   ```json
   GET /api/users/1
   ```

## Notes

- The database file (`database.db`) is created automatically on first run
- All timestamps are in UTC
- Foreign key constraints are enforced (deleting a user will delete their products)
- Email addresses must be unique
