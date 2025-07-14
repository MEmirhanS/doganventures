# 🚀 DOGANVENTURES - Turkish Lead Generation Website

Modern, responsive Turkish lead generation website built with React + Vite. Features real-time form submissions with Supabase database integration and Telegram notifications.

## ✨ Features

- **Modern Turkish UI**: Beautiful, responsive design optimized for Turkish audience
- **Lead Generation Form**: Comprehensive form capturing business details
- **Real-time Notifications**: Instant Telegram alerts for new leads
- **Database Integration**: Secure data storage with Supabase
- **Performance Optimized**: Fast loading with optimized assets
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite 7
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Notifications**: Telegram Bot API
- **Carousel**: React Slick
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd doganventures

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase and Telegram credentials

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_TELEGRAM_BOT_TOKEN=your_telegram_bot_token
VITE_TELEGRAM_CHAT_ID=your_telegram_chat_id
```

### Database Setup

1. Create a Supabase project
2. Run the SQL schema from `supabase-schema.sql`
3. Get your project URL and anon key
4. Update the `.env` file

### Telegram Setup

1. Create a Telegram bot via @BotFather
2. Get the bot token
3. Create a group/channel and add the bot
4. Get the chat ID
5. Update the `.env` file

## 📁 Project Structure

```
doganventures/
├── public/
│   ├── assets/
│   │   ├── videos/          # Hero videos
│   │   ├── proofs/          # Proof images/GIFs
│   │   └── company-logos/   # Client logos
│   └── testimonials/        # Customer photos
├── src/
│   ├── components/          # React components
│   ├── lib/                # Utilities (Supabase, Telegram)
│   ├── App.jsx             # Main application
│   └── main.jsx            # Entry point
├── supabase-schema.sql     # Database schema
├── DEPLOYMENT_GUIDE.md     # Deployment instructions
└── form-test.js           # Form testing script
```

## 🧪 Testing

### Form Submission Test

1. Open browser console
2. Load the `form-test.js` script:
   ```javascript
   // Copy and paste the contents of form-test.js into console
   ```
3. Follow the console instructions to test form submission

### Manual Testing

1. Fill out the lead form
2. Check Supabase dashboard for new entries
3. Verify Telegram notifications

## 🌐 Deployment

See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

### Quick Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Don't forget to set environment variables in your deployment platform!

## 📊 Performance

- **Bundle Size**: 428.10 kB (125.82 kB gzipped)
- **Load Time**: ~2-3 seconds on fast connections
- **Core Web Vitals**: Optimized for good performance scores

## 🔄 Development Workflow

```bash
# Start development
npm run dev

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for DOGANVENTURES.

## 📞 Support

For support and questions, contact the development team.

---

**Made with ❤️ for DOGANVENTURES** 🇹🇷
