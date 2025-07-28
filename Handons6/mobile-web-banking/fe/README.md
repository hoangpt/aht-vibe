# Mobile Banking Prototype App

A modern mobile web banking prototype built with Next.js, TypeScript, and Firebase. This app demonstrates advanced digital banking solutions including NFC payments, QR code scanning, and secure authentication.

## 🚀 Features

### 🔐 Authentication
- User registration and login with Firebase Auth
- Secure email/password authentication
- Auto-login state management

### 💳 Payment Simulation
- **NFC Payment**: Simulated tap-to-pay functionality
- **QR Code Payments**: Generate and scan QR codes for payments
- **Card Payments**: Traditional card payment simulation
- **Amount Input**: Easy monetary amount entry
- **Payment Methods**: Multiple payment method selection

### 📱 Mobile-First Design
- Responsive design optimized for mobile devices
- Touch-friendly interfaces
- Smooth animations and transitions
- Modern gradient UI

### 📊 Transaction Management
- Real-time transaction history
- Payment categorization
- Search and filter functionality
- Transaction status tracking

### 📷 QR Code Features
- QR code generation for payment requests
- Camera-based QR code scanning
- Payment data encoding/decoding
- Share and download QR codes

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **QR Codes**: react-qr-code, @zxing/library
- **Camera**: react-webcam
- **Icons**: Lucide React
- **State Management**: React Context API

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mobile-web-banking/fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing one
   - Enable Authentication with Email/Password provider
   - Create a Firestore database
   - Get your web app configuration

4. **Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your Firebase configuration values.

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### User Registration/Login
1. Open the app in your browser
2. Click "Sign up" to create a new account
3. Enter email and password
4. Or login with existing credentials

### Payment Simulation
1. After login, you'll see the payment dashboard
2. **Make a Payment**:
   - Enter amount in the payment tab
   - Select payment method (NFC, Tap, Card)
   - Simulate the payment process
3. **QR Codes**:
   - Generate QR codes for payment requests
   - Scan QR codes using camera
   - Process scanned payment data
4. **View History**:
   - Check transaction history
   - Filter by payment type
   - Search transactions

### Demo Features
- The app includes mock transaction data for demonstration
- Payment simulations show realistic processing flows
- All features are fully functional for prototyping purposes

## 🔧 Configuration

### Firebase Setup
1. **Authentication**:
   - Enable Email/Password sign-in method
   - Configure authorized domains for production

2. **Firestore Database**:
   - Create database in production mode
   - Set up security rules as needed

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── auth/             # Authentication components
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── payment/          # Payment-related components
│   │   ├── PaymentDashboard.tsx
│   │   ├── PaymentSimulator.tsx
│   │   ├── QRScanner.tsx
│   │   └── TransactionHistory.tsx
│   └── AuthPage.tsx      # Main auth wrapper
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
└── lib/                  # Utilities and config
    ├── firebase.ts       # Firebase initialization
    ├── firebase-config.ts # Firebase configuration
    └── utils.ts          # Utility functions
```

## 🎯 Use Cases

This prototype is perfect for:
- **Sales Demonstrations**: Show advanced banking capabilities to clients
- **Solution Engineering**: Demonstrate technical possibilities
- **Proof of Concepts**: Test banking app concepts
- **Training**: Onboard new team members
- **Client Presentations**: Showcase digital banking innovations

---

Built with ❤️ using Next.js, TypeScript, and Firebase

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
