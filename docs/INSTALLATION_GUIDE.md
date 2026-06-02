# Panduan Instalasi dan Menjalankan Sistem SPJ Verification

## Persyaratan Sistem

- Node.js v18 atau lebih tinggi
- PostgreSQL 12 atau lebih tinggi
- Git
- Docker (opsional, untuk menjalankan dengan container)

## Instalasi Lokal

### 1. Clone Repository

```bash
git clone https://github.com/kunto1978/spj-verification-system.git
cd spj-verification-system
```

### 2. Setup Backend

#### Install Dependencies

```bash
cd backend
npm install
```

#### Konfigurasi Environment

```bash
cp .env.example .env
```

Edit file `.env` dan sesuaikan dengan konfigurasi database Anda:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=spj_verification
DB_USER=postgres
DB_PASSWORD=your_password_here
JWT_SECRET=your_jwt_secret_key_here
```

#### Jalankan Migration Database

```bash
npm run migrate
npm run seed
```

#### Start Backend Server

```bash
npm run dev
```

Backend akan berjalan di: **http://localhost:5000**

### 3. Setup Frontend

#### Install Dependencies

```bash
cd ../frontend
npm install
```

#### Konfigurasi Environment

```bash
cp .env.example .env
```

Edit file `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

#### Start Frontend Development Server

```bash
npm start
```

Frontend akan berjalan di: **http://localhost:3000**

---

## Instalasi dengan Docker Compose

### 1. Pastikan Docker Installed

```bash
docker --version
docker-compose --version
```

### 2. Build dan Run dengan Docker Compose

```bash
docker-compose up -d
```

Ini akan menjalankan:
- PostgreSQL Database: `localhost:5432`
- Backend API: `localhost:5000`
- Frontend: `localhost:3000`

### 3. Stop Services

```bash
docker-compose down
```

---

## Mengakses Aplikasi

### Akun Default untuk Testing

**Admin Account:**
- Email: `admin@pariwisata-palembang.go.id`
- Password: `password123`
- Role: Admin

**Verifikator Account:**
- Email: `verifikator@pariwisata-palembang.go.id`
- Password: `password123`
- Role: Verifikator

**Pengaju Account:**
- Email: `pengaju@pariwisata-palembang.go.id`
- Password: `password123`
- Role: Pengaju

### URL Akses

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

---

## Testing API dengan Postman

### 1. Import Collection

Gunakan file `/docs/postman-collection.json` untuk import ke Postman.

### 2. Set Environment Variables

```json
{
  "api_url": "http://localhost:5000/api",
  "access_token": "your_jwt_token_here"
}
```

### 3. Test Endpoints

Contoh request Login:

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@pariwisata-palembang.go.id",
  "password": "password123"
}
```

---

## Troubleshooting

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solusi:**
- Pastikan PostgreSQL sudah running
- Check konfigurasi database di `.env`
- Jalankan: `sudo service postgresql start` (Linux)

### Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solusi:**
```bash
# Kill process pada port 5000
sudo lsof -i :5000
sudo kill -9 <PID>
```

### Module Not Found Error

```
Error: Cannot find module 'express'
```

**Solusi:**
```bash
npm install
npm ci
```

---

## Development Commands

### Backend

```bash
npm run dev              # Run dengan nodemon
npm run start            # Run production
npm test                 # Run tests
npm run lint             # Check code quality
npm run migrate          # Database migration
npm run seed             # Seed database
```

### Frontend

```bash
npm start                # Start development server
npm run build            # Build for production
npm test                 # Run tests
npm run lint             # Check code quality
```

---

## Struktur Project

```
spj-verification-system/
├── backend/
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── spj.routes.js
│   │   ├── verification.routes.js
│   │   ├── user.routes.js
│   │   ├── report.routes.js
│   │   └── attachment.routes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── Dashboard.js
│   │   │   ├── SPJForm.js
│   │   │   └── SPJList.js
│   │   ├── hooks/
│   │   │   └── useApi.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .env.example
│
├── database/
│   └── init.sql
│
├── docs/
│   └── API_DOCUMENTATION.md
│
├── docker-compose.yml
└── README.md
```

---

## Kontribusi & Support

- Buat issue untuk bug reports
- Kirim pull request untuk improvements
- Email: support@pariwisata-palembang.go.id

---

**Dibuat dengan ❤️ untuk Dinas Pariwisata Kota Palembang**
