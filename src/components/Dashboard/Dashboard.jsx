import React, { useState } from 'react'
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import { 
  FiTrendingUp, FiTrendingDown, FiPackage, FiShoppingCart, 
  FiTruck, FiDollarSign, FiArrowUp, FiArrowDown 
} from 'react-icons/fi'

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('2026-01')

  // KPI Data
  const kpiData = [
    {
      title: 'Total Imports',
      value: '₹24.5M',
      change: '+12.5%',
      trend: 'up',
      icon: FiShoppingCart,
      color: 'blue'
    },
    {
      title: 'Total Exports',
      value: '₹32.8M',
      change: '+18.3%',
      trend: 'up',
      icon: FiPackage,
      color: 'green'
    },
    {
      title: 'Active Shipments',
      value: '156',
      change: '-5.2%',
      trend: 'down',
      icon: FiTruck,
      color: 'purple'
    },
    {
      title: 'Pending Payments',
      value: '₹8.2M',
      change: '-3.1%',
      trend: 'down',
      icon: FiDollarSign,
      color: 'orange'
    },
    {
      title: 'Monthly Revenue',
      value: '₹15.6M',
      change: '+22.8%',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'teal'
    }
  ]

  // Import vs Export Data
  const importExportData = [
    { month: 'Jan', import: 18.5, export: 24.2 },
    { month: 'Feb', import: 20.1, export: 26.8 },
    { month: 'Mar', import: 22.3, export: 28.5 },
    { month: 'Apr', import: 19.8, export: 25.9 },
    { month: 'May', import: 23.7, export: 30.4 },
    { month: 'Jun', import: 24.5, export: 32.8 },
  ]

  // Revenue by Country
  const revenueByCountry = [
    { country: 'USA', revenue: 45.2 },
    { country: 'China', revenue: 38.5 },
    { country: 'Germany', revenue: 32.8 },
    { country: 'UK', revenue: 28.4 },
    { country: 'Japan', revenue: 25.6 },
    { country: 'France', revenue: 22.3 },
  ]

  // Shipment Volume Trend
  const shipmentVolume = [
    { month: 'Jan', volume: 120 },
    { month: 'Feb', volume: 135 },
    { month: 'Mar', volume: 145 },
    { month: 'Apr', volume: 138 },
    { month: 'May', volume: 155 },
    { month: 'Jun', volume: 156 },
  ]

  // Order Status Distribution
  const orderStatus = [
    { name: 'Confirmed', value: 45, color: '#10b981' },
    { name: 'Shipped', value: 30, color: '#3b82f6' },
    { name: 'Delivered', value: 15, color: '#8b5cf6' },
    { name: 'Pending', value: 10, color: '#f59e0b' },
  ]

  // Recent Orders
  const recentOrders = [
    { id: 'SO-1234', customer: 'ABC Corp', country: 'USA', amount: '₹12,50,000', status: 'Shipped', date: '2026-01-15' },
    { id: 'SO-1235', customer: 'XYZ Ltd', country: 'UK', amount: '₹8,75,000', status: 'Confirmed', date: '2026-01-16' },
    { id: 'SO-1236', customer: 'Global Traders', country: 'Germany', amount: '₹15,20,000', status: 'Invoiced', date: '2026-01-17' },
    { id: 'SO-1237', customer: 'Asia Import Co', country: 'China', amount: '₹9,80,000', status: 'Shipped', date: '2026-01-18' },
  ]

  // Latest Shipments
  const latestShipments = [
    { id: 'SH-5678', destination: 'New York, USA', mode: 'Air', status: 'In Transit', eta: '2026-01-22' },
    { id: 'SH-5679', destination: 'London, UK', mode: 'Sea', status: 'Departed', eta: '2026-01-25' },
    { id: 'SH-5680', destination: 'Shanghai, China', mode: 'Sea', status: 'In Transit', eta: '2026-01-28' },
    { id: 'SH-5681', destination: 'Berlin, Germany', mode: 'Air', status: 'Delivered', eta: '2026-01-20' },
  ]

  // Upcoming Events
  const upcomingEvents = [
    { date: '2026-01-22', title: 'Shipment SH-5678 Arrival', type: 'shipment' },
    { date: '2026-01-23', title: 'Payment Due - INV-1234', type: 'payment' },
    { date: '2026-01-25', title: 'Shipment SH-5679 Arrival', type: 'shipment' },
    { date: '2026-01-27', title: 'Delivery Schedule - SO-1235', type: 'delivery' },
  ]

  const getStatusColor = (status) => {
    const colors = {
      'Shipped': 'bg-blue-100 text-blue-700',
      'Confirmed': 'bg-green-100 text-green-700',
      'Invoiced': 'bg-purple-100 text-purple-700',
      'In Transit': 'bg-yellow-100 text-yellow-700',
      'Departed': 'bg-orange-100 text-orange-700',
      'Delivered': 'bg-green-100 text-green-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      teal: 'from-teal-500 to-teal-600',
    }
    return colors[color] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your business overview</p>
        </div>
        <div>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">{kpi.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{kpi.value}</h3>
                  <div className={`flex items-center text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend === 'up' ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />}
                    <span className="font-medium">{kpi.change}</span>
                    <span className="text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getColorClasses(kpi.color)} flex items-center justify-center`}>
                  <Icon className="text-white text-xl" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Import vs Export Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Import vs Export Trend</h3>
            <p className="text-sm text-gray-500">Monthly comparison (in millions)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={importExportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="import" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                name="Import (₹M)"
              />
              <Line 
                type="monotone" 
                dataKey="export" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
                name="Export (₹M)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Country */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Revenue by Country</h3>
            <p className="text-sm text-gray-500">Top 6 countries (in millions)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByCountry}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="country" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Revenue (₹M)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipment Volume Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Shipment Volume Trend</h3>
            <p className="text-sm text-gray-500">Total shipments per month</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={shipmentVolume}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Area 
                type="monotone" 
                dataKey="volume" 
                stroke="#14b8a6" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVolume)"
                name="Shipments"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Order Status</h3>
            <p className="text-sm text-gray-500">Distribution breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {orderStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {orderStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar & Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
            <p className="text-sm text-gray-500">Schedule & reminders</p>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-xs text-primary-600 font-medium">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-lg font-bold text-primary-700">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{event.title}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      event.type === 'shipment' ? 'bg-blue-100 text-blue-700' :
                      event.type === 'payment' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
              <p className="text-sm text-gray-500">Latest sales orders</p>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Customer</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Country</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-primary-600">{order.id}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">{order.customer}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{order.country}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-800">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Latest Shipments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Latest Shipments</h3>
            <p className="text-sm text-gray-500">Current shipment tracking</p>
          </div>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestShipments.map((shipment) => (
            <div key={shipment.id} className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-semibold text-primary-600">{shipment.id}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(shipment.status)}`}>
                  {shipment.status}
                </span>
              </div>
              <p className="text-sm text-gray-800 font-medium mb-2">{shipment.destination}</p>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span className="bg-white px-2 py-1 rounded">{shipment.mode}</span>
                <span>ETA: {shipment.eta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
