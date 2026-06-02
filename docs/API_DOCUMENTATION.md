/* =====================================================
   SPJ VERIFICATION API DOCUMENTATION
   Version: 1.0.0
   ===================================================== */

## API Documentation - SPJ Verification System

### Base URL
```
http://localhost:5000/api
```

---

## 1. AUTHENTICATION ENDPOINTS

### 1.1 Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "full_name": "Full Name",
  "role": "pengaju"
}

Response 201:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "full_name": "Full Name",
    "role": "pengaju"
  }
}
```

### 1.2 Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response 200:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "pengaju",
      "full_name": "Full Name"
    }
  }
}
```

### 1.3 Logout
```http
POST /auth/logout
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "message": "Logout successful"
}
```

### 1.4 Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refresh_token": "refresh_token"
}

Response 200:
{
  "success": true,
  "data": {
    "access_token": "new_jwt_token"
  }
}
```

---

## 2. SPJ DOCUMENTS ENDPOINTS

### 2.1 Get All SPJ Documents
```http
GET /spj?page=1&limit=20&status=submitted&sort=-created_at
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "reference_number": "SPJ-2024-001",
      "title": "SPJ Event Pariwisata",
      "amount": 5000000,
      "status": "submitted",
      "created_at": "2024-01-15T10:30:00Z",
      "user": {
        "id": "uuid",
        "full_name": "User Name"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

### 2.2 Get SPJ Detail
```http
GET /spj/{id}
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": {
    "id": "uuid",
    "reference_number": "SPJ-2024-001",
    "title": "SPJ Event Pariwisata",
    "description": "Laporan pertanggungjawaban event",
    "amount": 5000000,
    "category": "Event",
    "status": "submitted",
    "user": {
      "id": "uuid",
      "full_name": "User Name",
      "email": "user@example.com"
    },
    "attachments": [
      {
        "id": "uuid",
        "file_name": "receipt.pdf",
        "file_size": 2048
      }
    ],
    "verification_history": [
      {
        "id": "uuid",
        "status": "submitted",
        "comment": "Document submitted",
        "verified_by": "Verifikator Name",
        "verification_date": "2024-01-15T10:30:00Z"
      }
    ],
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### 2.3 Create SPJ Document
```http
POST /spj
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "title": "SPJ Event Pariwisata",
  "description": "Laporan pertanggungjawaban event",
  "amount": 5000000,
  "category": "Event"
}

Response 201:
{
  "success": true,
  "message": "SPJ document created successfully",
  "data": {
    "id": "uuid",
    "reference_number": "SPJ-2024-001",
    "title": "SPJ Event Pariwisata",
    "status": "draft"
  }
}
```

### 2.4 Update SPJ Document
```http
PUT /spj/{id}
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "title": "SPJ Event Pariwisata (Updated)",
  "amount": 6000000
}

Response 200:
{
  "success": true,
  "message": "SPJ document updated successfully",
  "data": {
    "id": "uuid",
    "title": "SPJ Event Pariwisata (Updated)",
    "amount": 6000000
  }
}
```

### 2.5 Submit SPJ Document
```http
POST /spj/{id}/submit
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "message": "SPJ document submitted successfully",
  "data": {
    "id": "uuid",
    "status": "submitted",
    "submitted_at": "2024-01-15T10:30:00Z"
  }
}
```

### 2.6 Delete SPJ Document
```http
DELETE /spj/{id}
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "message": "SPJ document deleted successfully"
}
```

---

## 3. VERIFICATION ENDPOINTS

### 3.1 Get Verification Tasks (For Verifikator)
```http
GET /verification?page=1&limit=20&status=under_review
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "reference_number": "SPJ-2024-001",
      "title": "SPJ Event Pariwisata",
      "submitter": "User Name",
      "status": "under_review",
      "submitted_at": "2024-01-15T10:30:00Z",
      "amount": 5000000
    }
  ]
}
```

### 3.2 Get Verification Detail
```http
GET /verification/{id}
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": {
    "id": "uuid",
    "spj_document": {
      "id": "uuid",
      "reference_number": "SPJ-2024-001",
      "title": "SPJ Event Pariwisata",
      "amount": 5000000,
      "attachments": [...]
    },
    "checklist": [
      {
        "id": "uuid",
        "item_name": "Kuitansi lengkap",
        "is_checked": true,
        "notes": "Semua kuitansi terlampir"
      }
    ]
  }
}
```

### 3.3 Verify/Approve SPJ
```http
POST /verification/{id}/approve
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "comment": "Document approved, all requirements met"
}

Response 200:
{
  "success": true,
  "message": "SPJ document approved successfully",
  "data": {
    "id": "uuid",
    "status": "approved",
    "verified_at": "2024-01-15T10:30:00Z"
  }
}
```

### 3.4 Reject SPJ
```http
POST /verification/{id}/reject
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "reason": "Dokumen tidak lengkap, mohon perbaiki dan resubmit",
  "comment": "Kuitansi untuk item nomor 3 belum terlampir"
}

Response 200:
{
  "success": true,
  "message": "SPJ document rejected",
  "data": {
    "id": "uuid",
    "status": "rejected",
    "rejection_reason": "Dokumen tidak lengkap, mohon perbaiki dan resubmit",
    "verified_at": "2024-01-15T10:30:00Z"
  }
}
```

### 3.5 Update Verification Checklist
```http
PUT /verification/{id}/checklist/{item_id}
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "is_checked": true,
  "notes": "Item sudah diverifikasi"
}

Response 200:
{
  "success": true,
  "message": "Checklist item updated"
}
```

---

## 4. FILE UPLOAD ENDPOINTS

### 4.1 Upload Attachment
```http
POST /spj/{id}/attachments
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

file: <binary>

Response 201:
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "id": "uuid",
    "file_name": "receipt.pdf",
    "file_size": 2048,
    "file_type": "application/pdf"
  }
}
```

### 4.2 Download Attachment
```http
GET /attachments/{id}/download
Authorization: Bearer {access_token}

Response 200:
<Binary file content>
```

### 4.3 Delete Attachment
```http
DELETE /attachments/{id}
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "message": "Attachment deleted successfully"
}
```

---

## 5. USER MANAGEMENT ENDPOINTS (Admin Only)

### 5.1 Get All Users
```http
GET /users?page=1&limit=20&role=pengaju
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "full_name": "User Name",
      "role": "pengaju",
      "department": "Event",
      "is_active": true
    }
  ]
}
```

### 5.2 Get User Detail
```http
GET /users/{id}
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "full_name": "User Name",
    "role": "pengaju",
    "department": "Event",
    "is_active": true,
    "last_login": "2024-01-15T10:30:00Z"
  }
}
```

### 5.3 Create User
```http
POST /users
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "email": "newuser@example.com",
  "username": "newuser",
  "password": "securepass123",
  "full_name": "New User",
  "role": "pengaju",
  "department": "Event"
}

Response 201:
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "uuid",
    "email": "newuser@example.com",
    "full_name": "New User",
    "role": "pengaju"
  }
}
```

### 5.4 Update User
```http
PUT /users/{id}
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "full_name": "Updated Name",
  "department": "Finance"
}

Response 200:
{
  "success": true,
  "message": "User updated successfully"
}
```

### 5.5 Deactivate User
```http
PUT /users/{id}/deactivate
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "message": "User deactivated successfully"
}
```

---

## 6. REPORTS ENDPOINTS

### 6.1 Get Summary Statistics
```http
GET /reports/summary
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": {
    "total_spj": 150,
    "approved_count": 120,
    "rejected_count": 10,
    "pending_count": 15,
    "draft_count": 5,
    "total_approved_amount": 500000000
  }
}
```

### 6.2 Get Monthly Report
```http
GET /reports/monthly?year=2024&month=1
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": {
    "year": 2024,
    "month": 1,
    "total_submitted": 25,
    "total_approved": 20,
    "total_rejected": 3,
    "total_pending": 2,
    "total_amount": 125000000,
    "average_verification_days": 3.5
  }
}
```

### 6.3 Export Report (PDF/Excel)
```http
GET /reports/export?format=pdf&start_date=2024-01-01&end_date=2024-01-31
Authorization: Bearer {access_token}

Response 200:
<Binary PDF/Excel file>
```

---

## ERROR RESPONSES

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized - Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Forbidden - Access denied"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## STATUS CODES

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

**Last Updated**: 2 June 2026
**API Version**: 1.0.0
