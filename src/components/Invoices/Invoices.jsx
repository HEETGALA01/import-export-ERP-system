import React, { useState } from 'react'
import { FiPlus, FiEye, FiDownload, FiFilter } from 'react-icons/fi'

const Invoices = () => {
  const [showModal, setShowModal] = useState(false)
  const [viewModal, setViewModal] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const [invoices, setInvoices] = useState([
    { id: 'INV-1234', orderId: 'SO-1234', customer: 'ABC Corporation', amount: '₹12,50,000', tax: '₹2,25,000', total: '₹14,75,000', status: 'Paid', dueDate: '2026-01-25', paidDate: '2026-01-24', issueDate: '2026-01-15' },
    { id: 'INV-1235', orderId: 'SO-1235', customer: 'XYZ Limited', amount: '₹8,75,000', tax: '₹1,57,500', total: '₹10,32,500', status: 'Partial', dueDate: '2026-01-28', paidDate: null, issueDate: '2026-01-16', paidAmount: '₹5,00,000' },
    { id: 'INV-1236', orderId: 'SO-1236', customer: 'Global Traders Inc', amount: '₹15,20,000', tax: '₹2,73,600', total: '₹17,93,600', status: 'Overdue', dueDate: '2026-01-20', paidDate: null, issueDate: '2026-01-10' },
    { id: 'INV-1237', orderId: 'SO-1237', customer: 'Euro Exports', amount: '₹6,40,000', tax: '₹1,15,200', total: '₹7,55,200', status: 'Pending', dueDate: '2026-01-30', paidDate: null, issueDate: '2026-01-18' },
  ])

  const [formData, setFormData] = useState({
    orderId: '',
    customer: '',
    amount: '',
    tax: '',
    dueDate: ''
  })

  const statusColors = {
    'Paid': 'bg-green-100 text-green-700',
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Partial': 'bg-blue-100 text-blue-700',
    'Overdue': 'bg-red-100 text-red-700',
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const amount = parseFloat(formData.amount.replace(/[₹,]/g, ''))
    const tax = parseFloat(formData.tax.replace(/[₹,]/g, ''))
    const total = amount + tax

    const newInvoice = {
      id: `INV-${1234 + invoices.length}`,
      ...formData,
      total: `₹${total.toLocaleString('en-IN')}`,
      status: 'Pending',
      issueDate: new Date().toISOString().split('T')[0],
      paidDate: null
    }
    setInvoices([newInvoice, ...invoices])
    setFormData({
      orderId: '',
      customer: '',
      amount: '',
      tax: '',
      dueDate: ''
    })
    setShowModal(false)
  }

  const updateStatus = (id, newStatus) => {
    setInvoices(invoices.map(invoice => {
      if (invoice.id === id) {
        return {
          ...invoice,
          status: newStatus,
          paidDate: newStatus === 'Paid' ? new Date().toISOString().split('T')[0] : invoice.paidDate
        }
      }
      return invoice
    }))
  }

  const filteredInvoices = filterStatus === 'all'
    ? invoices
    : invoices.filter(inv => inv.status === filterStatus)

  const getTotalAmount = (status) => {
    return invoices
      .filter(inv => status === 'all' || inv.status === status)
      .reduce((sum, inv) => sum + parseFloat(inv.total.replace(/[₹,]/g, '')), 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Invoices & Payments</h1>
          <p className="text-gray-600 mt-1">Manage invoices and track payments</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          <FiPlus />
          <span>Create Invoice</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Invoices', value: invoices.length, color: 'blue' },
          { label: 'Total Amount', value: `₹${(getTotalAmount('all') / 100000).toFixed(1)}L`, color: 'purple' },
          { label: 'Paid', value: invoices.filter(i => i.status === 'Paid').length, color: 'green' },
          { label: 'Overdue', value: invoices.filter(i => i.status === 'Overdue').length, color: 'red' },
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
          {['all', 'Pending', 'Partial', 'Paid', 'Overdue'].map((status) => (
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

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Invoice ID</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Tax</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Total</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Due Date</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-primary-600">{invoice.id}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{invoice.orderId}</td>
                  <td className="py-4 px-6 text-sm text-gray-800">{invoice.customer}</td>
                  <td className="py-4 px-6 text-sm text-gray-800">{invoice.amount}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{invoice.tax}</td>
                  <td className="py-4 px-6 text-sm font-semibold text-gray-800">{invoice.total}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{invoice.dueDate}</td>
                  <td className="py-4 px-6">
                    <select
                      value={invoice.status}
                      onChange={(e) => updateStatus(invoice.id, e.target.value)}
                      className={`text-xs px-3 py-1 rounded-full ${statusColors[invoice.status]} border-0 cursor-pointer`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Partial">Partial</option>
                      <option value="Paid">Paid</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setViewModal(invoice)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                      >
                        <FiEye />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <FiDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Create Invoice</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order ID *</label>
                  <input
                    type="text"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleInputChange}
                    required
                    placeholder="SO-1234"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer *</label>
                  <input
                    type="text"
                    name="customer"
                    value={formData.customer}
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
                    placeholder="₹10,00,000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax (18% GST) *</label>
                  <input
                    type="text"
                    name="tax"
                    value={formData.tax}
                    onChange={handleInputChange}
                    required
                    placeholder="₹1,80,000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
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
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Invoice Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Invoice Details - {viewModal.id}</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="text-base font-medium text-gray-800">{viewModal.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="text-base font-medium text-gray-800">{viewModal.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Issue Date</p>
                  <p className="text-base font-medium text-gray-800">{viewModal.issueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="text-base font-medium text-gray-800">{viewModal.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-base font-medium text-gray-800">{viewModal.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tax</p>
                  <p className="text-base font-medium text-gray-800">{viewModal.tax}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-lg font-bold text-gray-800">{viewModal.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block text-xs px-3 py-1 rounded-full ${statusColors[viewModal.status]}`}>
                    {viewModal.status}
                  </span>
                </div>
                {viewModal.paidDate && (
                  <div>
                    <p className="text-sm text-gray-600">Paid Date</p>
                    <p className="text-base font-medium text-gray-800">{viewModal.paidDate}</p>
                  </div>
                )}
                {viewModal.paidAmount && (
                  <div>
                    <p className="text-sm text-gray-600">Paid Amount</p>
                    <p className="text-base font-medium text-gray-800">{viewModal.paidAmount}</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setViewModal(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Invoices
