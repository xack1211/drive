# Cloud Drive Manager

A modern, full-stack file management system built with Next.js that provides unified access to multiple storage providers including Google Drive, Dropbox, and local storage.

## Features

- 🔐 Secure user authentication
- 🌓 Dark/Light mode support
- 💨 Smooth animations and transitions
- 📱 Responsive design for all devices
- 🔄 Multi-storage provider support:
  - Local Storage
  - Google Drive
  - Dropbox
- 📂 Unified file browser interface
- ⬇️ File download capabilities
- 🖼️ File preview support
- 📊 Storage usage dashboard

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   NEXTAUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   DROPBOX_APP_KEY=your-dropbox-app-key
   DROPBOX_APP_SECRET=your-dropbox-app-secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Guide

### Authentication

1. Click "Sign In" on the top right
2. Choose to register a new account or login
3. Provide your credentials

### Connecting Storage Providers

1. Go to Dashboard
2. Click "Connect" under the desired storage provider
3. Follow OAuth flow to authorize access

### File Management

#### Browsing Files
- Use the left sidebar to switch between storage providers
- Navigate through folders by clicking on them
- Use breadcrumbs for quick navigation
- Toggle between list and grid views

#### File Operations
- Download: Click the download icon next to any file
- Preview: Click on supported file types to preview
- Search: Use the search bar to find files
- Sort: Click column headers to sort files

#### Dark Mode
- Toggle dark/light mode using the moon/sun icon in the header

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, Framer Motion
- **Authentication**: NextAuth.js
- **Storage Integrations**: Google Drive API, Dropbox API
- **Styling**: TailwindCSS + Custom UI Components
- **Deployment**: Vercel

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)