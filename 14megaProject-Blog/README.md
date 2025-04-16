# 📝 BlogSpace - Modern Blogging Platform

A feature-rich blogging platform built with React, Vite, and Appwrite, featuring a clean UI and modern development practices.

![BlogSpace Preview](https://via.placeholder.com/800x400?text=BlogSpace+Preview)

## ✨ Features

- 🔐 **Secure Authentication** - Email/password authentication using Appwrite
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🖼️ **Rich Text Editor** - TinyMCE integration for content creation
- 📊 **State Management** - Redux Toolkit for efficient state handling
- 🎯 **Form Validation** - React Hook Form for robust form handling
- 🚀 **Fast Performance** - Built with Vite for optimal speed
- 🎨 **Modern Styling** - Tailwind CSS for responsive and clean design

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Backend as a Service:** Appwrite
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **Form Handling:** React Hook Form
- **Editor:** TinyMCE React
- **Type Checking:** ESLint

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/blogspace.git
cd blogspace
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
VITE_APPWRITE_URL="your-appwrite-url"
VITE_APPWRITE_PROJECT_ID="your-project-id"
VITE_APPWRITE_DATABASE_ID="your-database-id"
VITE_APPWRITE_COLLECTION_ID="your-collection-id"
VITE_APPWRITE_BUCKET_ID="your-bucket-id"
```

4. **Run the development server**
```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── appwrite/        # Appwrite service configurations
├── components/      # Reusable UI components
├── pages/          # Page components
├── store/          # Redux store and slices
├── config/         # App configuration
└── main.jsx        # App entry point
```

## 🔑 Key Features

### User Authentication
- Secure signup and login
- Protected routes
- Session management

### Blog Management
- Create, edit, and delete posts
- Rich text editing
- Image upload support
- Post status management

### User Experience
- Responsive design
- Loading states
- Error handling
- Form validation
- Clean and intuitive UI

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/) for the backend services
- [TinyMCE](https://www.tiny.cloud/) for the rich text editor
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
