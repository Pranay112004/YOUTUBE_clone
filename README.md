# YouTube Clone

A modern YouTube clone built with React, Vite, and Tailwind CSS. This project replicates the core features of YouTube including video browsing, search functionality, and responsive design.

## Features

- 🎥 Video browsing and playback
- 🔍 Search functionality
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast development with Vite
- 📡 YouTube API integration

## Tech Stack

- **Frontend:** React 19, Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** React Icons
- **API:** YouTube Data API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- YouTube API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd YOUTUBE-CLONE
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Deployment

This project is configured for deployment on Render:

1. Connect your GitHub repository to Render
2. Set the build command: `npm run build`
3. Set the start command: `npm start`
4. Add your `VITE_YOUTUBE_API_KEY` as an environment variable

## Environment Variables

- `VITE_YOUTUBE_API_KEY` - Your YouTube Data API key

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
