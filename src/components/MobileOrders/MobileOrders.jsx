import React, { useState } from 'react'
import { FiShoppingCart, FiShoppingBag, FiFilter, FiChevronRight } from 'react-icons/fi'

const MobileOrders = () => {
  const [activeTab, setActiveTab] = useState('sales')
  const [filterStatus, setFilterStatus] = useState('all')

  const salesOrders = [
    { id: 'SO-1234', customer: 'ABC Corporation', country: 'USA', amount: '₹12,50,000', status: 'Shipped', date: '2026-01-15' },
    { id: 'SO-1235', customer: 'XYZ Limited', country: 'UK', amount: '₹8,75,000', status: 'Confirmed', date: '2026-01-16' },
    { id: 'SO-1236', customer: 'Global Traders', country: 'Germany', amount: '₹15,20,000', status: 'Invoiced', date: '2026-01-17' },
    { id: 'SO-1237', customer: 'Euro Exports', country: 'France', amount: '₹6,40,000', status: 'Draft', date: '2026-01-18' },
  ]

  const purchaseOrders = [
    { id: 'PO-5001', vendor: 'Asia Import Co', country: 'China', amount: '₹9,80,000', status: 'Approved', date: '2026-01-10' },
    { id: 'PO-5002', vendor: 'Euro Suppliers', country: 'France', amount: '₹7,45,000', status: 'Received', date: '2026-01-12' },
    { id: 'PO-5003', vendor: 'Japan Trading', country: 'Japan', amount: '₹11,20,000', status: 'Created', date: '2026-01-15' },
    { id: 'PO-5004', vendor: 'Global Sources', country: 'Germany', amount: '₹8,90,000', status: 'Closed', date: '2026-01-08' },
  ]

  const statusColors = {
    'Draft': 'bg-gray-100 text-gray-700',
    'Created': 'bg-gray-100 text-gray-700',
    'Confirmed': 'bg-green-100 text-green-700',
    'Approved': 'bg-green-100 text-green-700',
    'Shipped': 'bg-blue-100 text-blue-700',
    'Received': 'bg-blue-100 text-blue-700',
    'Invoiced': 'bg-purple-100 text-purple-700',
    'Closed': 'bg-purple-100 text-purple-700',
  }

  const currentOrders = activeTab === 'sales' ? salesOrders : purchaseOrders
  const filteredOrders = filterStatus === 'all'
    ? currentOrders
    : currentOrders.filter(o => o.status === filterStatus)

  return (
    <div className="h-full bg-gray-50">
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('sales')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'sales'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 active:bg-gray-200'
            }`}
          >
            <FiShoppingCart />
            <span>Sales Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('purchase')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'purchase'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 active:bg-gray-200'
            }`}
          >
            <FiShoppingBag />
            <span>Purchase Orders</span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 text-center">
            <p className="text-lg font-bold text-gray-800">{currentOrders.length}</p>
            <p className="text-xs text-gray-600 mt-0.5">Total</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 text-center">
            <p className="text-lg font-bold text-green-600">
              {currentOrders.filter(o => o.status === 'Confirmed' || o.status === 'Approved').length}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">Active</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 text-center">
            <p className="text-lg font-bold text-blue-600">
              {currentOrders.filter(o => o.status === 'Shipped' || o.status === 'Received').length}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">Process</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 text-center">
            <p className="text-lg font-bold text-purple-600">
              {currentOrders.filter(o => o.status === 'Invoiced' || o.status === 'Closed').length}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">Done</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <FiFilter className="text-gray-600 flex-shrink-0 text-sm" />
          {['all', activeTab === 'sales' ? 'Draft' : 'Created', 
            activeTab === 'sales' ? 'Confirmed' : 'Approved',
            activeTab === 'sales' ? 'Shipped' : 'Received'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 active:bg-gray-100 border border-gray-200'
              }`}
            >
              {status === 'all' ? 'All' : status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 active:bg-gray-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-primary-600">{order.id}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    {activeTab === 'sales' ? 'Customer' : 'Vendor'}
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {order.customer || order.vendor}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Country</span>
                  <span className="text-sm font-medium text-gray-800">{order.country}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Amount</span>
                  <span className="text-sm font-bold text-gray-800">{order.amount}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 bg-primary-50 text-primary-600 text-xs font-medium rounded-lg active:bg-primary-100 flex items-center justify-center">
                  View Details
                  <FiChevronRight className="ml-1" />
                </button>
                <button className="py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg active:bg-gray-200">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Order Button */}
        <button className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-xl shadow-lg active:shadow-md">
          + Create New {activeTab === 'sales' ? 'Sales' : 'Purchase'} Order
        </button>

        {/* Bottom Padding */}
        <div className="h-4"></div>
      </div>
    </div>
  )
}

export default MobileOrders
