import React, { useState } from 'react'
import { FiTrendingUp, FiTrendingDown, FiPackage, FiShoppingCart, FiTruck, FiDollarSign, FiAlertCircle, FiChevronRight } from 'react-icons/fi'

const MobileDashboard = ({ notifications, setNotifications }) => {
  const kpiData = [
    { title: 'Total Exports', value: '₹32.8M', change: '+18.3%', trend: 'up', icon: FiPackage, color: 'green' },
    { title: 'Total Imports', value: '₹24.5M', change: '+12.5%', trend: 'up', icon: FiShoppingCart, color: 'blue' },
    { title: 'Active Shipments', value: '156', change: '-5.2%', trend: 'down', icon: FiTruck, color: 'purple' },
    { title: 'Pending Payments', value: '₹8.2M', change: '-3.1%', trend: 'down', icon: FiDollarSign, color: 'orange' },
  ]

  const recentOrders = [
    { id: 'SO-1234', customer: 'ABC Corp', amount: '₹12.5L', status: 'Shipped', type: 'export' },
    { id: 'SO-1235', customer: 'XYZ Ltd', amount: '₹8.7L', status: 'Confirmed', type: 'export' },
    { id: 'PO-5001', vendor: 'Asia Import', amount: '₹9.8L', status: 'Approved', type: 'import' },
  ]

  const activeShipments = [
    { id: 'SH-5678', destination: 'New York, USA', status: 'In Transit', eta: 'Jan 22', progress: 75 },
    { id: 'SH-5679', destination: 'London, UK', status: 'Departed', eta: 'Jan 25', progress: 45 },
    { id: 'SH-5680', destination: 'Shanghai, CN', status: 'In Transit', eta: 'Jan 28', progress: 60 },
  ]

  const alerts = [
    { type: 'warning', title: 'Shipment SH-5678 delayed', action: 'View Details' },
    { type: 'approval', title: 'PO-5004 needs approval', action: 'Approve Now' },
    { type: 'stock', title: 'Low stock on 2 items', action: 'Reorder' },
  ]

  const getStatusColor = (status) => {
    const colors = {
      'Shipped': 'bg-blue-100 text-blue-700',
      'Confirmed': 'bg-green-100 text-green-700',
      'Approved': 'bg-purple-100 text-purple-700',
      'In Transit': 'bg-yellow-100 text-yellow-700',
      'Departed': 'bg-orange-100 text-orange-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="p-4 space-y-4">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-4 text-white shadow-lg">
        <h2 className="text-lg font-bold mb-1">Welcome back, John!</h2>
        <p className="text-sm text-primary-100">Here's your business overview</p>
        <div className="mt-3 pt-3 border-t border-primary-500 flex items-center justify-between text-sm">
          <span>January 22, 2026</span>
          <span className="font-semibold">12:45 PM</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`text-2xl ${
                  kpi.color === 'green' ? 'text-green-500' :
                  kpi.color === 'blue' ? 'text-blue-500' :
                  kpi.color === 'purple' ? 'text-purple-500' :
                  'text-orange-500'
                }`} />
              </div>
              <p className="text-xs text-gray-600 mb-1">{kpi.title}</p>
              <p className="text-xl font-bold text-gray-800 mb-1">{kpi.value}</p>
              <div className={`flex items-center text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.trend === 'up' ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
                <span className="font-medium">{kpi.change}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center">
            <FiAlertCircle className="mr-2 text-orange-500" />
            Quick Actions
          </h3>
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl border-l-4 ${
                alert.type === 'warning' ? 'border-orange-500 bg-orange-50' :
                alert.type === 'approval' ? 'border-blue-500 bg-blue-50' :
                'border-red-500 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{alert.title}</p>
                </div>
                <button className="ml-2 px-3 py-1 bg-white text-xs font-medium rounded-lg shadow-sm active:bg-gray-100">
                  {alert.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Recent Orders</h3>
          <button className="text-xs text-primary-600 font-medium flex items-center">
            View All <FiChevronRight className="ml-1" />
          </button>
        </div>
        <div className="space-y-2">
          {recentOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 active:bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-primary-600">{order.id}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">
                {order.customer || order.vendor}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="uppercase">{order.type}</span>
                <span className="font-semibold text-gray-800">{order.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Shipments */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Active Shipments</h3>
          <button className="text-xs text-primary-600 font-medium flex items-center">
            Track All <FiChevronRight className="ml-1" />
          </button>
        </div>
        <div className="space-y-2">
          {activeShipments.map((shipment) => (
            <div key={shipment.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">{shipment.id}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(shipment.status)}`}>
                  {shipment.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{shipment.destination}</p>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>ETA: {shipment.eta}</span>
                <span className="font-medium text-primary-600">{shipment.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-primary-600 h-1.5 rounded-full transition-all" 
                  style={{ width: `${shipment.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Padding for Nav */}
      <div className="h-4"></div>
    </div>
  )
}

export default MobileDashboard
