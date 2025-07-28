# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a mobile web banking prototype app built with Next.js, TypeScript, and Firebase. The app demonstrates advanced digital banking solutions for business customers and partners.

## Key Features
- **Payment Simulation**: NFC, QR code, and Tap-to-Pay simulation
- **Authentication**: Firebase Auth for user registration and login
- **QR Code Scanning**: Camera-based QR code scanning for payments
- **Mobile-First Design**: Responsive design optimized for mobile devices
- **Firebase Backend**: Complete Firebase integration for authentication and database

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **QR Code**: react-qr-code, @zxing/library
- **Camera**: react-webcam
- **Icons**: lucide-react

## Development Guidelines
- Use TypeScript for all components and utilities
- Follow mobile-first responsive design principles
- Implement proper error handling for Firebase operations
- Use Tailwind CSS for styling with consistent design system
- Create reusable components for payment methods and UI elements
- Ensure proper security practices for authentication flows
- Implement loading states and user feedback for all interactions

## Firebase Configuration
- Set up proper environment variables for Firebase config
- Use Firebase Auth for user management
- Store payment simulation data in Firestore
- Implement proper error handling for Firebase operations

## Payment Simulation Features
- NFC payment simulation with visual feedback
- QR code generation and scanning
- Multiple payment method selection
- Amount input with validation
- Transaction history and confirmation screens
