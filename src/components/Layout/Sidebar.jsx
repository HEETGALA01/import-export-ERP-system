import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  FiHome, 
  FiUsers, 
  FiShoppingCart, 
  FiShoppingBag,
  FiTruck,
  FiPackage,
  FiFileText,
  FiFile,
  FiBarChart2,
  FiSmartphone
} from 'react-icons/fi'

const Sidebar = ({ isOpen, onMobileMode }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: FiHome },
    { path: '/customers', name: 'Customers & Vendors', icon: FiUsers },
    { path: '/sales-orders', name: 'Sales Orders', icon: FiShoppingCart },
    { path: '/purchase-orders', name: 'Purchase Orders', icon: FiShoppingBag },
    { path: '/shipments', name: 'Shipments', icon: FiTruck },
    { path: '/inventory', name: 'Inventory', icon: FiPackage },
    { path: '/invoices', name: 'Invoices & Payments', icon: FiFileText },
    { path: '/documents', name: 'Documents', icon: FiFile },
    { path: '/reports', name: 'Reports & Analytics', icon: FiBarChart2 },
  ]

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-navy-900 text-white transition-all duration-300 flex-shrink-0`}>
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-navy-800 px-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">IE</span>
            </div>
            {isOpen && (
              <div>
                <h1 className="text-sm font-bold">Import-Export</h1>
                <p className="text-xs text-gray-400">ERP System</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <Icon className={`${isOpen ? 'mr-3' : 'mx-auto'} text-xl flex-shrink-0`} />
                {isOpen && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            )
          })}

          {/* Mobile View Button */}
          <div className="mx-2 mt-4 pt-4 border-t border-navy-800">
            <button
              onClick={onMobileMode}
              className="w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 bg-gradient-to-r from-primary-500 to-primary-700 text-white hover:from-primary-600 hover:to-primary-800 shadow-lg hover:shadow-xl"
            >
              <FiSmartphone className={`${isOpen ? 'mr-3' : 'mx-auto'} text-xl flex-shrink-0`} />
              {isOpen && <span className="text-sm font-medium">Mobile View</span>}
            </button>
          </div>
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 border-t border-navy-800">
            <div className="text-xs text-gray-400 text-center">
              <p>© 2026 Import-Export ERP</p>
              <p className="mt-1">Version 1.0.0</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
