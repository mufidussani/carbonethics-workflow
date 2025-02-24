# Workflow Automation Tool Documentation

## 1. Installation and Environment Setup

### 1.1 Prerequisites
- Python 3.9+
- PostgreSQL
- Node.js 16+
- npm or yarn
- Zapier account

### 1.2 Clone Repository
```sh
git clone https://github.com/mufidussani/carbonethics-workflow
cd carbonethics-workflow
```

## 2. Backend API Configuration (Django + PostgreSQL)

### 2.1 Set Up Virtual Environment
```sh
python -m venv venv
source venv/bin/activate  # UNIX
venv\Scripts\activate  # WINDOWS
```

### 2.2 Install Dependencies
```sh
pip install django djangorestframework psycopg2-binary django-cors-headers djangorestframework-simplejwt requests
```

### 2.3 Configure PostgreSQL in `backend/backend/settings.py`
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'carbonethics_db',  # should add new db named carbonethics_db
        'USER': 'postgres',  # or user that been used
        'PASSWORD': 'yourpassword',
        'HOST': 'localhost',  # or another host
        'PORT': '5432',
    }
}
```

### 2.4 Migrate Database
```sh
python manage.py makemigrations
python manage.py migrate
```

### 2.5 Run Backend Server
```sh
python manage.py runserver
```

### 2.6 Backend App
Runs at [http://localhost:8000](http://localhost:8000)

## 3. Frontend Setup (Next.js)

### 3.1 Navigate to Frontend Directory
```sh
cd frontend
```

### 3.2 Install Dependencies
```sh
npm install
```

### 3.3 Start Development Server
```sh
npm run dev
```

### 3.4 Open Frontend App
[http://localhost:3000](http://localhost:3000)

## 4. API Endpoints in Django

### 4.1 Clients API
- `GET /api/clients/` - List all clients
- `POST /api/clients/` - Create a new client

### 4.2 Requests API
- `GET /api/requests/` - List all requests (Paginated)
- `POST /api/requests/` - Create a new request

## 5. Workflow Automation (Zapier + Trello Integration)

### 5.1 Zapier Setup
1. Add New ZAP
2. **Trigger:** Webhook by Zapier -> Select Event **Catch Hook** -> Get URL Webhook and paste to `backend/workflow/views.py` in `ZAPIER_WEBHOOK_URL`
3. **Action 1:** Trello -> Select Event **Create Card** -> Set the Field
4. **Action 2:** Gmail -> Select Event **Send Email** -> Set the Field

## Run the App

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Click **Add Client**
3. Fill in the Client Information, then **Save Client**
4. Select the Client that has been added
5. Fill in the **Client Request**, **Description Request**, and **email of PIC in team**
6. Click **Submit Request**
7. The Request will appear on the **Request List Table**
8. Zap automatically adds a new **Card on Trello**, accessible here: [Trello Board](https://trello.com/b/043vrEaM/carbonethics)
9. Zap automatically sends an **Email to PIC** of the Task based on the input
10. On Trello, emails can be sent using the **Sendboard Add-On**

