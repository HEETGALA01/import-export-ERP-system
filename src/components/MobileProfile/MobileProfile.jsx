import React from 'react'
import { FiUser, FiSettings, FiFileText, FiBarChart2, FiPackage, FiShoppingCart, FiTruck, FiDollarSign, FiLogOut, FiChevronRight, FiBell, FiMoon, FiGlobe } from 'react-icons/fi'

const MobileProfile = () => {
  const quickAccessModules = [
    { icon: FiShoppingCart, label: 'Sales Orders', count: '24', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: FiPackage, label: 'Purchase Orders', count: '18', color: 'text-green-600', bg: 'bg-green-50' },
    { icon: FiTruck, label: 'Shipments', count: '12', color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: FiDollarSign, label: 'Invoices', count: '31', color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  const settingsOptions = [
    { icon: FiBell, label: 'Notifications', subtitle: 'Manage alerts and notifications' },
    { icon: FiMoon, label: 'Appearance', subtitle: 'Light mode' },
    { icon: FiGlobe, label: 'Language', subtitle: 'English' },
    { icon: FiSettings, label: 'Preferences', subtitle: 'App settings' },
  ]

  const documentTypes = [
    { icon: FiFileText, label: 'Commercial Invoice', count: '45' },
    { icon: FiFileText, label: 'Packing List', count: '38' },
    { icon: FiFileText, label: 'Bill of Lading', count: '32' },
    { icon: FiFileText, label: 'Certificate of Origin', count: '28' },
  ]

  return (
    <div className="h-full bg-gray-50">
      <div className="p-4 space-y-4">
        {/* User Profile Card */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <FiUser className="text-3xl text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Rajesh Kumar</h2>
              <p className="text-primary-100 text-sm">rajesh.kumar@importexport.com</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-primary-500">
            <div className="text-center">
              <p className="text-2xl font-bold">156</p>
              <p className="text-xs text-primary-100 mt-1">Active Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">89</p>
              <p className="text-xs text-primary-100 mt-1">Shipments</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">₹42M</p>
              <p className="text-xs text-primary-100 mt-1">Total Value</p>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Access</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickAccessModules.map((module, index) => (
              <div
                key={index}
                className={`${module.bg} rounded-xl p-4 active:opacity-70 transition-opacity`}
              >
                <module.icon className={`text-2xl ${module.color} mb-2`} />
                <p className="text-xs text-gray-600 mb-1">{module.label}</p>
                <p className={`text-xl font-bold ${module.color}`}>{module.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">My Documents</h3>
            <button className="text-xs text-primary-600 font-medium">View All</button>
          </div>
          <div className="space-y-2">
            {documentTypes.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg active:bg-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <doc.icon className="text-primary-600" />
                  </div>
                  <span className="text-sm text-gray-800">{doc.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{doc.count}</span>
                  <FiChevronRight className="text-gray-400 text-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reports */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Reports & Analytics</h3>
            <FiBarChart2 className="text-primary-600" />
          </div>
          <div className="space-y-2">
            {['Sales Report', 'Purchase Report', 'Profit & Loss', 'Country-wise Export'].map((report, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg active:bg-gray-100"
              >
                <span className="text-sm text-gray-800">{report}</span>
                <FiChevronRight className="text-gray-400 text-sm" />
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Settings</h3>
          <div className="space-y-2">
            {settingsOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg active:bg-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    <option.icon className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 font-medium">{option.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{option.subtitle}</p>
                  </div>
                </div>
                <FiChevronRight className="text-gray-400 text-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500 text-white font-medium rounded-xl shadow-sm active:bg-red-600">
          <FiLogOut />
          <span>Logout</span>
        </button>

        {/* App Info */}
        <div className="text-center pb-4">
          <p className="text-xs text-gray-500">Import-Export ERP Mobile v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">© 2026 All Rights Reserved</p>
        </div>

        {/* Bottom Padding */}
        <div className="h-4"></div>
      </div>
    </div>
  )
}

export default MobileProfile
