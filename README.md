# Import-Export ERP System

A complete, professional ERP system frontend for Import-Export businesses with a premium, chart-driven dashboard.

## 🚀 Features

### 📊 Premium Dashboard
- **5 KPI Cards**: Total Imports, Total Exports, Active Shipments, Pending Payments, Monthly Revenue
- **Analytics Charts**: 
  - Line Chart (Import vs Export trend)
  - Bar Chart (Revenue by Country)
  - Area Chart (Shipment Volume)
  - Donut Chart (Order Status Distribution)
- **Calendar Widget**: Upcoming shipments, payments, and deliveries
- **Recent Activity Tables**: Latest orders and shipments

### 📦 Complete ERP Modules

1. **Customers & Vendors Management**
   - CRUD operations for customers and vendors
   - Country, GST/VAT, contact information
   - Search and filter functionality

2. **Sales Orders (Export)**
   - Full workflow: Draft → Confirmed → Shipped → Invoiced
   - Order creation and status tracking
   - Detailed order views

3. **Purchase Orders (Import)**
   - Full workflow: Created → Approved → Received → Closed
   - Vendor selection and Incoterms
   - Purchase tracking

4. **Shipment & Logistics**
   - Create shipments with transport modes (Air/Sea/Land)
   - Real-time tracking timeline
   - ETA and status updates

5. **Inventory Management**
   - Product CRUD operations
   - Stock in/out adjustments
   - Low stock indicators and alerts
   - Multi-warehouse support

6. **Invoices & Payments**
   - Invoice generation
   - Payment status tracking (Paid/Partial/Overdue)
   - Tax calculations

7. **Documents Management**
   - Commercial Invoice
   - Packing List
   - Bill of Lading
   - Certificate of Origin

8. **Reports & Analytics**
   - Sales reports
   - Purchase reports
   - Profit & Loss analysis
   - Country-wise export reports
   - Top customers and vendors

## 🛠️ Tech Stack

- **React 18** (JavaScript only)
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Router DOM** for navigation
- **React Icons** for UI icons
- **Vite** for build tooling

## 📁 Project Structure

```
import-export-erp/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Header.jsx
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── Customers/
│   │   │   └── Customers.jsx
│   │   ├── SalesOrders/
│   │   │   └── SalesOrders.jsx
│   │   ├── PurchaseOrders/
│   │   │   └── PurchaseOrders.jsx
│   │   ├── Shipments/
│   │   │   └── Shipments.jsx
│   │   ├── Inventory/
│   │   │   └── Inventory.jsx
│   │   ├── Invoices/
│   │   │   └── Invoices.jsx
│   │   ├── Documents/
│   │   │   └── Documents.jsx
│   │   └── Reports/
│   │       └── Reports.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🎨 UI/UX Features

- **Professional Color Theme**: Navy blue primary, light backgrounds, soft gray borders
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Hover effects, transitions, and card animations
- **Interactive Charts**: Tooltips, legends, and clean visualizations
- **Modern Components**: Rounded cards, subtle shadows, consistent spacing
- **Intuitive Navigation**: Fixed sidebar with icons and module names

## 📊 Data Management

All data is managed using React `useState` hooks with dummy/static data. No backend or API connections required.

## 🎯 Key Functionalities

- ✅ Full CRUD operations across all modules
- ✅ Status workflow management
- ✅ Search and filter capabilities
- ✅ Modal-based forms
- ✅ Data validation
- ✅ Real-time updates
- ✅ Export/download functionality (UI ready)
- ✅ Print-ready reports

## 🌟 Highlights

- **Executive-Grade Dashboard**: Data-heavy, analytical, investor-ready
- **Complete A-Z Flow**: All modules fully functional
- **No "Coming Soon"**: Every feature works out of the box
- **Professional ERP UI**: Inspired by Dribbble and modern SaaS dashboards
- **Clean Code**: Well-organized, readable, and maintainable

## 📝 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Author

Built with ❤️ for Import-Export businesses

---

**Note**: This is a frontend-only application with static data. For production use, integrate with your backend API and database.
