import React, { useState } from 'react'
import { FiPackage, FiAlertCircle, FiTrendingDown, FiSearch, FiPlus, FiMinus } from 'react-icons/fi'

const MobileInventory = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  const inventory = [
    { id: 1, sku: 'PRD-001', name: 'Electronic Components', category: 'Electronics', stock: 850, minStock: 500, unit: 'pcs', price: '₹1,250' },
    { id: 2, sku: 'PRD-002', name: 'Cotton Fabric', category: 'Textiles', stock: 320, minStock: 500, unit: 'meters', price: '₹450', lowStock: true },
    { id: 3, sku: 'PRD-003', name: 'Machinery Parts', category: 'Machinery', stock: 150, minStock: 100, unit: 'pcs', price: '₹8,500' },
    { id: 4, sku: 'PRD-004', name: 'Chemical Compounds', category: 'Chemicals', stock: 680, minStock: 300, unit: 'kg', price: '₹3,200' },
    { id: 5, sku: 'PRD-005', name: 'Steel Sheets', category: 'Raw Materials', stock: 90, minStock: 200, unit: 'sheets', price: '₹5,400', lowStock: true },
  ]

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const lowStockCount = inventory.filter(item => item.stock < item.minStock).length

  if (selectedItem) {
    return (
      <div className="h-full bg-white">
        <div className="p-4 space-y-4">
          <button
            onClick={() => setSelectedItem(null)}
            className="text-sm text-primary-600 font-medium"
          >
            ← Back to Inventory
          </button>

          {/* Product Header */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-4 text-white">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold mb-1">{selectedItem.name}</h2>
                <p className="text-sm text-primary-100">{selectedItem.sku}</p>
              </div>
              {selectedItem.lowStock && (
                <FiAlertCircle className="text-2xl text-orange-300" />
              )}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-primary-500">
              <span className="text-sm">Current Stock</span>
              <span className="text-2xl font-bold">{selectedItem.stock} {selectedItem.unit}</span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Category</p>
              <p className="text-sm font-semibold text-gray-800">{selectedItem.category}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Unit Price</p>
              <p className="text-sm font-semibold text-gray-800">{selectedItem.price}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Min Stock</p>
              <p className="text-sm font-semibold text-gray-800">{selectedItem.minStock} {selectedItem.unit}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Unit</p>
              <p className="text-sm font-semibold text-gray-800">{selectedItem.unit}</p>
            </div>
          </div>

          {/* Stock Level */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-800 mb-2">Stock Level</p>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${
                    selectedItem.stock >= selectedItem.minStock ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((selectedItem.stock / selectedItem.minStock) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {selectedItem.stock >= selectedItem.minStock 
                  ? 'Stock level is healthy' 
                  : `${selectedItem.minStock - selectedItem.stock} ${selectedItem.unit} below minimum`}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center space-x-2 py-3 bg-green-500 text-white font-medium rounded-xl active:bg-green-600 shadow-sm">
                <FiPlus />
                <span>Stock In</span>
              </button>
              <button className="flex items-center justify-center space-x-2 py-3 bg-orange-500 text-white font-medium rounded-xl active:bg-orange-600 shadow-sm">
                <FiMinus />
                <span>Stock Out</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-3">Recent Activity</p>
            <div className="space-y-2">
              {[
                { type: 'in', quantity: '+100', date: 'Jan 20, 2026', reason: 'New Purchase' },
                { type: 'out', quantity: '-50', date: 'Jan 18, 2026', reason: 'Sales Order SO-1234' },
                { type: 'in', quantity: '+200', date: 'Jan 15, 2026', reason: 'Stock Adjustment' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.reason}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.date}</p>
                  </div>
                  <span className={`text-sm font-bold ${
                    activity.type === 'in' ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {activity.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Padding */}
          <div className="h-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 text-center">
          <FiPackage className="text-2xl text-blue-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-gray-800">{inventory.length}</p>
          <p className="text-xs text-gray-600">Products</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 text-center">
          <FiTrendingDown className="text-2xl text-green-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-gray-800">₹42.5M</p>
          <p className="text-xs text-gray-600">Stock Value</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 text-center">
          <FiAlertCircle className="text-2xl text-red-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-red-600">{lowStockCount}</p>
          <p className="text-xs text-gray-600">Low Stock</p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-3">
          <div className="flex items-start">
            <FiAlertCircle className="text-red-500 text-lg mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800">Low Stock Alert</p>
              <p className="text-xs text-red-600 mt-1">
                {lowStockCount} item(s) below minimum stock level
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        />
      </div>

      {/* Inventory List */}
      <div className="space-y-3">
        {filteredInventory.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 active:bg-gray-50"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.sku} • {item.category}</p>
              </div>
              {item.lowStock && (
                <FiAlertCircle className="text-red-500 text-lg flex-shrink-0 ml-2" />
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Current Stock</p>
                <p className={`text-lg font-bold ${item.lowStock ? 'text-red-600' : 'text-gray-800'}`}>
                  {item.stock} {item.unit}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Unit Price</p>
                <p className="text-sm font-semibold text-gray-800">{item.price}</p>
              </div>
            </div>

            {item.lowStock && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-red-600">
                  ⚠ {item.minStock - item.stock} {item.unit} below minimum
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Padding */}
      <div className="h-4"></div>
    </div>
  )
}

export default MobileInventory
