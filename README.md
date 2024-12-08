# API Integration Documentation

## Overview

The API provides RESTful endpoints for managing employees, BOCs (Base Operation Certificates), and VRFs (Vessel Registration Forms). All endpoints return standardized responses in JSON format.

## Authentication

All API requests require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Base URL

```
/api/v1
```

## Endpoints

### Employees

- `GET /employees` - List all employees
  - Query parameters:
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
    - `query`: Search query
    - `filters`: JSON object of filters

- `GET /employees/:id` - Get employee by ID

- `POST /employees` - Create new employee
  - Required fields: firstName, lastName, nationality, passportNumber, position

- `PUT /employees/:id` - Update employee

- `DELETE /employees/:id` - Delete employee

- `POST /employees/:id/documents/:type` - Upload employee document
  - Document types: passport, boc, vrf
  - Accepts multipart/form-data

- `GET /employees/:id/documents/:type` - Get employee documents

### BOCs

- `GET /bocs` - List all BOCs
  - Supports same query parameters as /employees

- `GET /bocs/:id` - Get BOC by ID

- `POST /bocs` - Create new BOC

- `PUT /bocs/:id` - Update BOC

- `DELETE /bocs/:id` - Delete BOC

- `GET /bocs/expiring` - Get expiring BOCs
  - Query parameters:
    - `days`: Days threshold (default: 7)

### VRFs

- `GET /vrfs` - List all VRFs
  - Supports same query parameters as /employees

- `GET /vrfs/:id` - Get VRF by ID

- `POST /vrfs` - Create new VRF

- `PUT /vrfs/:id` - Update VRF

- `DELETE /vrfs/:id` - Delete VRF

- `GET /vrfs/expiring` - Get expiring VRFs
  - Query parameters:
    - `days`: Days threshold (default: 7)

## Response Format

All responses follow this format:

```json
{
  "success": boolean,
  "data": any | null,
  "error": string | null
}
```

## Error Codes

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

API requests are limited to 100 requests per minute per IP address.

## Examples

### Create Employee

```bash
curl -X POST /api/v1/employees \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "nationality": "US",
    "passportNumber": "123456789",
    "position": "Engineer"
  }'
```

### Upload Document

```bash
curl -X POST /api/v1/employees/123/documents/passport \
  -H "Authorization: Bearer <token>" \
  -F "file=@passport.pdf"
```

### Get Expiring BOCs

```bash
curl /api/v1/bocs/expiring?days=7 \
  -H "Authorization: Bearer <token>"
```
