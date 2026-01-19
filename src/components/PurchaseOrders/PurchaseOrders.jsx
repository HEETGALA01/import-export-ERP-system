import React, { useState } from 'react'
import { FiPlus, FiEye, FiFilter } from 'react-icons/fi'

const PurchaseOrders = () => {
  const [showModal, setShowModal] = useState(false)
  const [viewModal, setViewModal] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const [orders, setOrders] = useState([
    { id: 'PO-5001', vendor: 'Asia Import Co', country: 'China', products: 'Raw Materials', quantity: 1000, amount: '₹9,80,000', incoterm: 'FOB', status: 'Approved', date: '2026-01-10', expectedDate: '2026-02-10' },
    { id: 'PO-5002', vendor: 'Euro Exports Ltd', country: 'France', products: 'Components', quantity: 750, amount: '₹7,45,000', incoterm: 'CIF', status: 'Received', date: '2026-01-12', expectedDate: '2026-02-12' },
    { id: 'PO-5003', vendor: 'Japan Trading Corp', country: 'Japan', products: 'Electronics', quantity: 500, amount: '₹11,20,000', incoterm: 'EXW', status: 'Created', date: '2026-01-15', expectedDate: '2026-02-15' },
    { id: 'PO-5004', vendor: 'Global Suppliers', country: 'Germany', products: 'Machinery Parts', quantity: 300, amount: '₹8,90,000', incoterm: 'DAP', status: 'Closed', date: '2026-01-08', expectedDate: '2026-02-08' },
  ])

  const [formData, setFormData] = useState({
    vendor: '',
    country: '',
    products: '',
    quantity: '',
    amount: '',
    incoterm: 'FOB',
    expectedDate: ''
  })

  const statusColors = {
    'Created': 'bg-gray-100 text-gray-700',
    'Approved': 'bg-green-100 text-green-700',
    'Received': 'bg-blue-100 text-blue-700',
    'Closed': 'bg-purple-100 text-purple-700',
  }

  const incoterms = ['FOB', 'CIF', 'EXW', 'DAP', 'DDP', 'FCA', 'CFR']

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newOrder = {
      id: `PO-${5000 + orders.length + 1}`,
      ...formData,
      status: 'Created',
      date: new Date().toISOString().split('T')[0]
    }
    setOrders([newOrder, ...orders])
    setFormData({
      vendor: '',
      country: '',
      products: '',
      quantity: '',
      amount: '',
      incoterm: 'FOB',
      expectedDate: ''
    })
    setShowModal(false)
  }

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ))
  }

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status === filterStatus)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Purchase Orders (Import)</h1>
          <p className="text-gray-600 mt-1">Manage import purchase orders</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          <FiPlus />
          <span>Create Order</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Orders', value: orders.length, color: 'blue' },
          { label: 'Created', value: orders.filter(o => o.status === 'Created').length, color: 'gray' },
          { label: 'Approved', value: orders.filter(o => o.status === 'Approved').length, color: 'green' },
          { label: 'Received', value: orders.filter(o => o.status === 'Received').length, color: 'purple' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <FiFilter className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter by Status:</span>
          {['all', 'Created', 'Approved', 'Received', 'Closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">PO Number</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Vendor</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Country</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Products</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Quantity</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Incoterm</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-primary-600">{order.id}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-800">{order.vendor}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.country}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.products}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.quantity}</td>
                  <td className="py-4 px-6 text-sm font-semibold text-gray-800">{order.amount}</td>
                  <td className="py-4 px-6">
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                      {order.incoterm}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`text-xs px-3 py-1 rounded-full ${statusColors[order.status]} border-0 cursor-pointer`}
                    >
                      <option value="Created">Created</option>
                      <option value="Approved">Approved</option>
                      <option value="Received">Received</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => setViewModal(order)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Create Purchase Order</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vendor *</label>
                  <input
                    type="text"
                    name="vendor"
                    value={formData.vendor}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Products *</label>
                  <input
                    type="text"
                    name="products"
                    value={formData.products}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    placeholder="₹"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Incoterm *</label>
                  <select
                    name="incoterm"
                    value={formData.incoterm}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {incoterms.map(term => (
                      <option key={term} value={term}>{term}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Delivery Date *</label>
                  <input
                    type="date"
                    name="expectedDate"
                    value={formData.expectedDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Order Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Order Details - {viewModal.id}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Vendor</p>
                  <p className="text-base font-medium text-gray-800">{viewModal.vendor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Country</p>
                  <p className="text-base font-medium text-gray-800">{viewModal.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Products</p>
                  <p className="text-base font-medium text-gray-800">{viewModal.products}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="text-base font-medium text-gray-800">{viewModal.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-base font-medium text-gray-800">{viewModal.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Incoterm</p>
                  <p className="text-base font-medium text-gray-800">{viewModal.incoterm}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block text-xs px-3 py-1 rounded-full ${statusColors[viewModal.status]}`}>
                    {viewModal.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expected Date</p>
                  <p className="text-base font-medium text-gray-800">{viewModal.expectedDate}</p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setViewModal(null)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PurchaseOrders
