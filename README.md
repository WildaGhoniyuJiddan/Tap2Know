# ⚡ Tap2Know — Premium Brutalist NFC Digital Profile Builder

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Cloud_Firestore-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

**Tap2Know** adalah platform pembuat portofolio dan kartu nama digital interaktif berskala produksi yang terintegrasi langsung dengan teknologi fisik **NFC (Near Field Communication)**. Mengusung estetika desain *Modern Brutalist*, platform ini memungkinkan pengguna mengaktifkan token fisik mereka secara mandiri, mengonfigurasi tata letak secara *real-time*, dan langsung memublikasikan halaman portofolio premium mereka ke internet dalam hitungan milidetik.

---

## ✨ Fitur Utama

* 🔑 **NFC Self-Activation Loop:** Alur registrasi aman dan terikat secara unik yang divalidasi menggunakan token enkripsi fisik (contoh rute: `/activate?code=DEAMRY58`).
* 🎨 **Real-Time Brutalist Customizer:** Panel editor canggih untuk memodifikasi tipografi, warna dasar, intensitas blur, transparansi efek *liquid-glass*, hingga tata letak grid karier secara instan.
* 🚀 **Server-Side Rendered (SSR) Profiles:** Halaman publik (`/u/[username]`) yang ditenagai oleh Next.js Server Components demi kecepatan muat data yang instan dan optimisasi SEO tanpa *client-side flickering*.
* 🔐 **Secure Firebase Architecture:** Sinkronisasi database yang dilindungi oleh *Firebase Security Rules* berlapis dan inisialisasi *Firebase Admin SDK* yang aman dari kebocoran sisi klien.
* 📱 **Responsive Canvas & Success Modal:** Transisi tata letak yang mulus untuk perangkat seluler lengkap dengan modul *one-click clipboard copy* setelah portofolio berhasil dirilis.

---

## 🛠️ Arsitektur Teknologi

Aplikasi ini dibangun menggunakan kombinasi teknologi modern berperforma tinggi:

| Teknologi | Komponen | Fungsi |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router + Turbopack) | Server-Side Rendering (SSR) & Routing |
| **Styling** | Tailwind CSS & Lucide Icons | Desain Antarmuka Modern Brutalist |
| **Database** | Google Cloud Firestore | Penyimpanan Data Profil & Sinkronisasi Real-time |
| **Autentikasi** | Firebase Auth & Admin SDK | Manajemen Sesi & Registrasi Akun Sintetis |
| **State Mgt.** | React Context API | Manajemen State Sinkronisasi Editor Canvas |

---

## 📦 Panduan Instalasi Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda:

1. **Kloning Repositori**
   ```bash
   git clone [https://github.com/username_kamu/tap2know.git](https://github.com/username_kamu/tap2know.git)
   cd tap2know/web

```

2. **Instal Dependensi**
```bash
npm install

```


3. **Konfigurasi Environment Variables**
Buat file bernama `.env.local` di *root* folder proyek Anda dan isi dengan kredensial Firebase Anda:
```text
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
FIREBASE_PRIVATE_KEY="your_firebase_admin_private_key_here"
FIREBASE_CLIENT_EMAIL=your_firebase_admin_client_email

```


4. **Jalankan Server Development**
```bash
npm run dev

```


Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di browser Anda untuk melihat hasilnya.

---

## 🔒 Aturan Keamanan Firestore (Security Rules)

Pastikan untuk menerapkan aturan keamanan berikut pada Firebase Console Proyek Anda untuk melindungi integritas data pengguna:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /profiles/{username} {
      // Siapa saja di internet dapat membaca profil yang sudah dipublikasikan
      allow read: if true;
      
      // Hanya pemilik akun yang terautentikasi dan memiliki UID yang sama dengan username yang dapat memodifikasi data
      allow write: if request.auth != null && request.auth.uid == username;
    }
  }
}

Developed with ⚡ by [Wilda Ghoniyu Jiddan](https://github.com/WildaGhoniyuJiddan)

```

```
