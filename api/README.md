# Backend API

Express.js backend with JWT authentication and JSON file upload.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. Start the server:
```bash
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| ADMIN_USERNAME | Admin username | admin |
| ADMIN_PASSWORD | Admin password | - |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRES_IN | Token expiration | 24h |

## API Endpoints

### POST /login

Authenticate and get JWT token.

**Request:**
```json
{
  "username": "admin",
  "password": "your_password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /upload

Upload a JSON file (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Body:**
- `file`: JSON file (max 10MB)

**Response:**
```json
{
  "message": "File uploaded successfully",
  "filename": "1708179600000-data.json",
  "originalName": "data.json",
  "size": 1234
}
```

## Example Usage

```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | jq -r '.token')

# Upload file
curl -X POST http://localhost:3000/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@data.json"
```
