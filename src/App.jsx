import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'
import Dashboard from './components/Dashboard/Dashboard'
import Customers from './components/Customers/Customers'
import SalesOrders from './components/SalesOrders/SalesOrders'
import PurchaseOrders from './components/PurchaseOrders/PurchaseOrders'
import Shipments from './components/Shipments/Shipments'
import Inventory from './components/Inventory/Inventory'
import Invoices from './components/Invoices/Invoices'
import Documents from './components/Documents/Documents'
import Reports from './components/Reports/Reports'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/sales-orders" element={<SalesOrders />} />
              <Route path="/purchase-orders" element={<PurchaseOrders />} />
              <Route path="/shipments" element={<Shipments />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
