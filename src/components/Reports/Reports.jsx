import React, { useState } from 'react'
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import { FiDownload, FiFilter, FiTrendingUp, FiDollarSign } from 'react-icons/fi'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const Reports = () => {
  const [reportType, setReportType] = useState('sales')
  const [dateRange, setDateRange] = useState('6months')

  // Sales Report Data
  const salesData = [
    { month: 'Jan', sales: 24.2, orders: 45 },
    { month: 'Feb', sales: 26.8, orders: 52 },
    { month: 'Mar', sales: 28.5, orders: 48 },
    { month: 'Apr', sales: 25.9, orders: 41 },
    { month: 'May', sales: 30.4, orders: 58 },
    { month: 'Jun', sales: 32.8, orders: 62 },
  ]

  // Purchase Report Data
  const purchaseData = [
    { month: 'Jan', purchase: 18.5, orders: 32 },
    { month: 'Feb', purchase: 20.1, orders: 38 },
    { month: 'Mar', purchase: 22.3, orders: 35 },
    { month: 'Apr', purchase: 19.8, orders: 30 },
    { month: 'May', purchase: 23.7, orders: 42 },
    { month: 'Jun', purchase: 24.5, orders: 45 },
  ]

  // Profit & Loss Data
  const profitLossData = [
    { month: 'Jan', revenue: 24.2, cost: 18.5, profit: 5.7 },
    { month: 'Feb', revenue: 26.8, cost: 20.1, profit: 6.7 },
    { month: 'Mar', revenue: 28.5, cost: 22.3, profit: 6.2 },
    { month: 'Apr', revenue: 25.9, cost: 19.8, profit: 6.1 },
    { month: 'May', revenue: 30.4, cost: 23.7, profit: 6.7 },
    { month: 'Jun', revenue: 32.8, cost: 24.5, profit: 8.3 },
  ]

  // Country-wise Export Data
  const countryExports = [
    { country: 'USA', value: 45.2, percentage: 28 },
    { country: 'UK', value: 38.5, percentage: 24 },
    { country: 'Germany', value: 32.8, percentage: 20 },
    { country: 'France', value: 28.4, percentage: 18 },
    { country: 'Japan', value: 16.1, percentage: 10 },
  ]

  // Product Category Performance
  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3b82f6' },
    { name: 'Textiles', value: 25, color: '#10b981' },
    { name: 'Machinery', value: 20, color: '#8b5cf6' },
    { name: 'Chemicals', value: 15, color: '#f59e0b' },
    { name: 'Others', value: 5, color: '#6b7280' },
  ]

  // Top Customers
  const topCustomers = [
    { name: 'ABC Corporation', country: 'USA', orders: 28, revenue: '₹45.2M' },
    { name: 'XYZ Limited', country: 'UK', orders: 24, revenue: '₹38.5M' },
    { name: 'Global Traders Inc', country: 'Germany', orders: 22, revenue: '₹32.8M' },
    { name: 'Euro Exports', country: 'France', orders: 18, revenue: '₹28.4M' },
    { name: 'Pacific Trade Co', country: 'Japan', orders: 12, revenue: '₹16.1M' },
  ]

  // Top Vendors
  const topVendors = [
    { name: 'Asia Import Co', country: 'China', orders: 32, spending: '₹38.5M' },
    { name: 'Euro Suppliers Ltd', country: 'France', orders: 28, spending: '₹32.4M' },
    { name: 'Japan Trading Corp', country: 'Japan', orders: 24, spending: '₹28.6M' },
    { name: 'Global Sources', country: 'Germany', orders: 20, spending: '₹24.8M' },
    { name: 'Pacific Vendors', country: 'Singapore', orders: 16, spending: '₹18.2M' },
  ]

  // Export Report Function
  const exportReport = () => {
    const doc = new jsPDF()
    
    // Header
    doc.setFillColor(59, 130, 246)
    doc.rect(0, 0, 210, 35, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.text('BUSINESS REPORT', 105, 20, { align: 'center' })
    doc.setFontSize(11)
    doc.text(`Report Type: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} | Date Range: ${dateRange}`, 105, 28, { align: 'center' })
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    
    let startY = 50
    
    // Sales Report
    if (reportType === 'sales') {
      doc.setFontSize(14)
      doc.setFont(undefined, 'bold')
      doc.text('Sales Report', 20, startY)
      doc.setFont(undefined, 'normal')
      
      doc.autoTable({
        startY: startY + 5,
        head: [['Month', 'Sales (₹M)', 'Orders']],
        body: salesData.map(item => [item.month, item.sales, item.orders]),
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] }
      })
      
      startY = doc.lastAutoTable.finalY + 15
      doc.setFontSize(14)
      doc.setFont(undefined, 'bold')
      doc.text('Top Customers', 20, startY)
      
      doc.autoTable({
        startY: startY + 5,
        head: [['Customer', 'Country', 'Orders', 'Revenue']],
        body: topCustomers.map(c => [c.name, c.country, c.orders, c.revenue]),
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] }
      })
    }
    
    // Purchase Report
    else if (reportType === 'purchase') {
      doc.setFontSize(14)
      doc.setFont(undefined, 'bold')
      doc.text('Purchase Report', 20, startY)
      doc.setFont(undefined, 'normal')
      
      doc.autoTable({
        startY: startY + 5,
        head: [['Month', 'Purchase (₹M)', 'Orders']],
        body: purchaseData.map(item => [item.month, item.purchase, item.orders]),
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] }
      })
      
      startY = doc.lastAutoTable.finalY + 15
      doc.setFontSize(14)
      doc.setFont(undefined, 'bold')
      doc.text('Top Vendors', 20, startY)
      
      doc.autoTable({
        startY: startY + 5,
        head: [['Vendor', 'Country', 'Orders', 'Spending']],
        body: topVendors.map(v => [v.name, v.country, v.orders, v.spending]),
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] }
      })
    }
    
    // Profit & Loss Report
    else if (reportType === 'profit') {
      doc.setFontSize(14)
      doc.setFont(undefined, 'bold')
      doc.text('Profit & Loss Statement', 20, startY)
      doc.setFont(undefined, 'normal')
      
      doc.autoTable({
        startY: startY + 5,
        head: [['Month', 'Revenue (₹M)', 'Cost (₹M)', 'Profit (₹M)']],
        body: profitLossData.map(item => [item.month, item.revenue, item.cost, item.profit]),
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] }
      })
      
      const totalRevenue = profitLossData.reduce((sum, item) => sum + item.revenue, 0).toFixed(1)
      const totalCost = profitLossData.reduce((sum, item) => sum + item.cost, 0).toFixed(1)
      const totalProfit = profitLossData.reduce((sum, item) => sum + item.profit, 0).toFixed(1)
      
      startY = doc.lastAutoTable.finalY + 10
      doc.setFont(undefined, 'bold')
      doc.text(`Total Revenue: ₹${totalRevenue}M | Total Cost: ₹${totalCost}M | Net Profit: ₹${totalProfit}M`, 20, startY)
    }
    
    // Country-wise Export Report
    else if (reportType === 'country') {
      doc.setFontSize(14)
      doc.setFont(undefined, 'bold')
      doc.text('Country-wise Export Report', 20, startY)
      doc.setFont(undefined, 'normal')
      
      doc.autoTable({
        startY: startY + 5,
        head: [['Country', 'Export Value (₹M)', 'Percentage']],
        body: countryExports.map(item => [item.country, item.value, `${item.percentage}%`]),
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] }
      })
    }
    
    // Footer
    doc.setFontSize(9)
    doc.setTextColor(128, 128, 128)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 285, { align: 'center' })
    doc.text('Confidential Business Report', 105, 290, { align: 'center' })
    
    doc.save(`Business_Report_${reportType}_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  const renderSalesReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} name="Sales (₹M)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Customers</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Rank</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Country</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Orders</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((customer, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span className="text-sm font-bold text-primary-600">#{index + 1}</span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">{customer.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{customer.country}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{customer.orders}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-800">{customer.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderPurchaseReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Purchase Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={purchaseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Line type="monotone" dataKey="purchase" stroke="#f59e0b" strokeWidth={3} name="Purchase (₹M)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Purchase Orders per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={purchaseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="orders" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Vendors</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Rank</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Vendor</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Country</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Orders</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Total Spending</th>
              </tr>
            </thead>
            <tbody>
              {topVendors.map((vendor, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span className="text-sm font-bold text-primary-600">#{index + 1}</span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">{vendor.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{vendor.country}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{vendor.orders}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-800">{vendor.spending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderProfitLossReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <FiTrendingUp className="text-green-500 text-xl" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">₹168.6M</h3>
          <p className="text-sm text-green-600 mt-2">+18.5% from last period</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Cost</p>
            <FiDollarSign className="text-orange-500 text-xl" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">₹128.9M</h3>
          <p className="text-sm text-orange-600 mt-2">+15.2% from last period</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Net Profit</p>
            <FiTrendingUp className="text-blue-500 text-xl" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">₹39.7M</h3>
          <p className="text-sm text-blue-600 mt-2">23.5% profit margin</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Profit & Loss Trend</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={profitLossData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            <Legend />
            <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} name="Revenue (₹M)" />
            <Bar dataKey="cost" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Cost (₹M)" />
            <Bar dataKey="profit" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Profit (₹M)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )

  const renderCountryReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Export by Country</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={countryExports} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis dataKey="country" type="category" stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} name="Export Value (₹M)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((item, index) => (
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Country-wise Export Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Rank</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Country</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Export Value</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Percentage</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Progress</th>
              </tr>
            </thead>
            <tbody>
              {countryExports.map((country, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span className="text-sm font-bold text-primary-600">#{index + 1}</span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">{country.country}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-800">₹{country.value}M</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{country.percentage}%</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive business insights</p>
        </div>
        <button 
          onClick={exportReport}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          <FiDownload />
          <span>Export Report</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Report Type:</span>
          </div>
          <div className="flex gap-2">
            {[
              { id: 'sales', label: 'Sales Report' },
              { id: 'purchase', label: 'Purchase Report' },
              { id: 'profit', label: 'Profit & Loss' },
              { id: 'country', label: 'Country-wise Export' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setReportType(type.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  reportType === type.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="1month">Last 1 Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last 1 Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Content */}
      {reportType === 'sales' && renderSalesReport()}
      {reportType === 'purchase' && renderPurchaseReport()}
      {reportType === 'profit' && renderProfitLossReport()}
      {reportType === 'country' && renderCountryReport()}
    </div>
  )
}

export default Reports
