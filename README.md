# SmartTraffic Frontend 🚦

A React-based web application for automated traffic violation analysis and appeal assessment. This system uses OCR technology and AI analysis to help users understand their traffic violations and determine the viability of appeals.

## 🌟 Features

### Core Functionality
- **📄 Document Upload**: Drag & drop or click to upload traffic violation documents
- **🔍 OCR Processing**: Automatic text extraction from uploaded documents
- **✏️ Field Editing**: Manual correction of OCR-extracted data with confidence indicators
- **🤖 AI Analysis**: Intelligent assessment of appeal probability and legal recommendations
- **📊 Results Dashboard**: Comprehensive violation analysis with actionable insights

### User Experience
- **🎯 Multi-step Wizard**: Guided 5-step process for complete analysis
- **🌐 RTL Support**: Full Hebrew language support with right-to-left layout
- **📱 Responsive Design**: Mobile-friendly interface with modern UI components
- **⚡ Real-time Validation**: Instant feedback and form validation
- **🔄 State Management**: Persistent data across steps with Redux

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management with modern Redux patterns

### Styling & UI
- **SCSS** - Advanced CSS with variables, mixins, and modular architecture
- **CSS Grid & Flexbox** - Modern layout techniques
- **Custom Design System** - Consistent colors, spacing, and typography

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **Git** - Version control with GitHub integration
- **Nodemon** - Development server with hot reload

## 🏗️ Project Structure

```
front/
├── src/
│   ├── cmps/                   # React Components
│   │   ├── steps/             # Step-specific components
│   │   │   ├── UploadStep.jsx        # File upload & validation
│   │   │   ├── OCREditStep.jsx       # OCR results editing
│   │   │   ├── AIAnalysisStep.jsx    # AI processing display
│   │   │   └── ResultsStep.jsx       # Final results & actions
│   │   └── POCFlow.jsx        # Main flow orchestrator
│   ├── services/              # API & Business Logic
│   │   ├── http.service.js    # HTTP client configuration
│   │   └── uploadService.js   # Upload & analysis APIs
│   ├── store/                 # Redux State Management
│   │   └── slices/
│   │       └── pocFlowSlice.js # Main application state
│   ├── assets/                # Styles & Static Assets
│   │   ├── base/              # Base styles & variables
│   │   │   ├── vars.scss      # SCSS variables
│   │   │   ├── mixinis.scss   # Reusable mixins
│   │   │   └── base.scss      # Base styles
│   │   └── pages/             # Page-specific styles
│   └── main.jsx               # Application entry point
├── public/                    # Static assets
└── package.json              # Dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **SmartTraffic Backend** running on `localhost:5000`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gilad-Sterman/smart-traffic-front.git
   cd smart-traffic-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
```

## 🔧 Configuration

### Environment Setup
The application connects to the backend API at `http://localhost:5000/api` by default. This can be configured in:
- `src/services/http.service.js` - Base API URL
- Backend must be running for full functionality

### SCSS Variables
Customize the design system in `src/assets/base/vars.scss`:
```scss
// Colors
$primary-color: #2563eb;
$success-color: #22c55e;
$danger-color: #ef4444;

// Spacing
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
```

## 🔄 Application Flow

### Step-by-Step Process

1. **📤 Upload Step**
   - File selection (drag & drop or click)
   - File validation (type, size)
   - Upload to backend with session management

2. **✏️ OCR Edit Step**
   - Display extracted text fields
   - Show confidence scores for each field
   - Allow manual corrections
   - Real-time validation

3. **🤖 AI Analysis Step**
   - Process violation data
   - Analyze legal implications
   - Calculate appeal probability
   - Generate recommendations

4. **📊 Results Step**
   - Display comprehensive analysis
   - Show appeal recommendations
   - Provide actionable next steps
   - Option to start new analysis

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) - Main actions and branding
- **Success**: Green (#22c55e) - Positive states and confirmations
- **Warning**: Orange (#f59e0b) - Caution and attention
- **Danger**: Red (#ef4444) - Errors and critical actions

### Typography
- **Headers**: Large, bold text for section titles
- **Body**: Regular text for content and descriptions
- **Labels**: Medium weight for form labels and UI elements

### Components
- **Cards**: Elevated containers with shadows
- **Buttons**: Multiple variants (primary, secondary, danger)
- **Forms**: Consistent styling with validation states
- **Progress**: Visual indicators for multi-step processes

## 🔌 API Integration

### Backend Communication
- **Upload Endpoint**: `POST /api/upload/document` - File upload and OCR processing
- **Analysis Endpoint**: `POST /api/upload/analyze/:sessionId` - AI analysis
- **Results Endpoint**: `GET /api/upload/results/:sessionId` - Retrieve analysis results

### Data Flow
1. File upload → OCR processing → Field extraction
2. User edits → Validation → Data preparation
3. AI analysis → Legal assessment → Recommendations
4. Results display → User actions → New analysis option

## 🧪 Development Features

### State Management
- **Redux Toolkit** for predictable state updates
- **Persistent sessions** across page refreshes
- **Step validation** and navigation control

### Error Handling
- **Graceful degradation** when backend is unavailable
- **User-friendly error messages** in Hebrew
- **Retry mechanisms** for failed operations

### Performance
- **Lazy loading** for optimal bundle size
- **Efficient re-renders** with React optimization
- **Fast development** with Vite hot reload

## 📝 Contributing

### Code Style
- Use functional components with hooks
- Follow ESLint configuration
- Write descriptive commit messages
- Maintain SCSS organization

### Adding New Features
1. Create feature branch from `main`
2. Implement with tests and documentation
3. Update README if needed
4. Submit pull request for review

## 🚀 Deployment

### Production Build
```bash
npm run build
```
Generates optimized static files in `dist/` directory.

### Deployment Options
- **Netlify**: Drag & drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **Static Hosting**: Upload `dist/` contents to web server

## 📞 Support

For questions, issues, or contributions:
- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check inline code comments
- **Backend Repository**: Ensure backend compatibility

---

**Built with ❤️ for traffic violation analysis and legal assistance**