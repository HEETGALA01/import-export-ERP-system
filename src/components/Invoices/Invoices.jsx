import React, { useState } from 'react'
import { FiPlus, FiEye, FiDownload, FiFilter, FiX } from 'react-icons/fi'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const Invoices = () => {
  const [showModal, setShowModal] = useState(false)
  const [viewModal, setViewModal] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const downloadInvoicePDF = (invoice) => {
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(20)
    doc.setTextColor(59, 130, 246)
    doc.text('TAX INVOICE', 105, 20, { align: 'center' })
    
    // Company Details
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text('Your Company Name', 20, 35)
    doc.text('Address Line 1, City, State - 000000', 20, 40)
    doc.text('GSTIN: 00XXXXX0000X0X0', 20, 45)
    doc.text('Email: info@yourcompany.com', 20, 50)
    
    // Invoice Details
    doc.setFontSize(10)
    doc.text(`Invoice No: ${invoice.id}`, 140, 35)
    doc.text(`Date: ${invoice.issueDate}`, 140, 40)
    doc.text(`Due Date: ${invoice.dueDate}`, 140, 45)
    doc.text(`Order ID: ${invoice.orderId}`, 140, 50)
    
    // Bill To
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text('Bill To:', 20, 65)
    doc.setFont(undefined, 'normal')
    doc.setFontSize(10)
    doc.text(invoice.customer, 20, 72)
    
    // Line
    doc.setDrawColor(200, 200, 200)
    doc.line(20, 80, 190, 80)
    
    // Table
    doc.autoTable({
      startY: 85,
      head: [['Description', 'Amount', 'Tax', 'Total']],
      body: [
        ['Invoice Amount', invoice.amount, invoice.tax, invoice.total],
      ],
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      styles: { fontSize: 10 }
    })
    
    // Payment Status
    let finalY = doc.lastAutoTable.finalY + 15
    doc.setFontSize(11)
    doc.setFont(undefined, 'bold')
    doc.text(`Status: ${invoice.status}`, 20, finalY)
    
    if (invoice.paidDate) {
      doc.text(`Paid Date: ${invoice.paidDate}`, 20, finalY + 7)
    }
    
    if (invoice.paidAmount) {
      doc.text(`Paid Amount: ${invoice.paidAmount}`, 20, finalY + 14)
      const remaining = parseFloat(invoice.total.replace(/[₹,]/g, '')) - parseFloat(invoice.paidAmount.replace(/[₹,]/g, ''))
      doc.text(`Balance Due: ₹${remaining.toLocaleString('en-IN')}`, 20, finalY + 21)
    }
    
    // Footer
    doc.setFontSize(9)
    doc.setFont(undefined, 'normal')
    doc.setTextColor(128, 128, 128)
    doc.text('Thank you for your business!', 105, 280, { align: 'center' })
    doc.text('This is a computer generated invoice', 105, 285, { align: 'center' })
    
    // Save
    doc.save(`Invoice_${invoice.id}.pdf`)
  }

  const [invoices, setInvoices] = useState([
    { id: 'INV-1234', orderId: 'SO-1234', customer: 'ABC Corporation', amount: '₹12,50,000', tax: '₹2,25,000', total: '₹14,75,000', status: 'Paid', dueDate: '2026-01-25', paidDate: '2026-01-24', issueDate: '2026-01-15' },
    { id: 'INV-1235', orderId: 'SO-1235', customer: 'XYZ Limited', amount: '₹8,75,000', tax: '₹1,57,500', total: '₹10,32,500', status: 'Partial', dueDate: '2026-01-28', paidDate: null, issueDate: '2026-01-16', paidAmount: '₹5,00,000' },
    { id: 'INV-1236', orderId: 'SO-1236', customer: 'Global Traders Inc', amount: '₹15,20,000', tax: '₹2,73,600', total: '₹17,93,600', status: 'Overdue', dueDate: '2026-01-20', paidDate: null, issueDate: '2026-01-10' },
    { id: 'INV-1237', orderId: 'SO-1237', customer: 'Euro Exports', amount: '₹6,40,000', tax: '₹1,15,200', total: '₹7,55,200', status: 'Pending', dueDate: '2026-01-30', paidDate: null, issueDate: '2026-01-18' },
    { id: 'INV-1238', orderId: 'SO-1238', customer: 'Pacific Imports LLC', amount: '₹18,90,000', tax: '₹3,40,200', total: '₹22,30,200', status: 'Paid', dueDate: '2026-01-22', paidDate: '2026-01-21', issueDate: '2026-01-12' },
    { id: 'INV-1239', orderId: 'SO-1239', customer: 'Nordic Trading AS', amount: '₹9,25,000', tax: '₹1,66,500', total: '₹10,91,500', status: 'Pending', dueDate: '2026-01-29', paidDate: null, issueDate: '2026-01-14' },
    { id: 'INV-1240', orderId: 'SO-1240', customer: 'Asian Commerce Group', amount: '₹22,30,000', tax: '₹4,01,400', total: '₹26,31,400', status: 'Paid', dueDate: '2026-01-20', paidDate: '2026-01-19', issueDate: '2026-01-10' },
    { id: 'INV-1241', orderId: 'SO-1241', customer: 'Middle East Imports', amount: '₹26,40,000', tax: '₹4,75,200', total: '₹31,15,200', status: 'Partial', dueDate: '2026-01-23', paidDate: null, issueDate: '2026-01-11', paidAmount: '₹15,00,000' },
    { id: 'INV-1242', orderId: 'SO-1242', customer: 'Alpine Industries', amount: '₹19,50,000', tax: '₹3,51,000', total: '₹23,01,000', status: 'Pending', dueDate: '2026-01-27', paidDate: null, issueDate: '2026-01-13' },
    { id: 'INV-1243', orderId: 'SO-1243', customer: 'Dutch Import Corporation', amount: '₹21,40,000', tax: '₹3,85,200', total: '₹25,25,200', status: 'Paid', dueDate: '2026-01-19', paidDate: '2026-01-18', issueDate: '2026-01-09' },
    { id: 'INV-1244', orderId: 'SO-1244', customer: 'Italian Fashion Group', amount: '₹17,30,000', tax: '₹3,11,400', total: '₹20,41,400', status: 'Partial', dueDate: '2026-01-21', paidDate: null, issueDate: '2026-01-11', paidAmount: '₹10,00,000' },
    { id: 'INV-1245', orderId: 'SO-1245', customer: 'Swedish Industrial AB', amount: '₹19,80,000', tax: '₹3,56,400', total: '₹23,36,400', status: 'Pending', dueDate: '2026-01-24', paidDate: null, issueDate: '2026-01-14' },
    { id: 'INV-1246', orderId: 'SO-1246', customer: 'New Zealand Imports Ltd', amount: '₹15,70,000', tax: '₹2,82,600', total: '₹18,52,600', status: 'Paid', dueDate: '2026-01-18', paidDate: '2026-01-17', issueDate: '2026-01-08' },
    { id: 'INV-1247', orderId: 'SO-1247', customer: 'Irish Business Solutions', amount: '₹16,20,000', tax: '₹2,91,600', total: '₹19,11,600', status: 'Pending', dueDate: '2026-01-26', paidDate: null, issueDate: '2026-01-16' },
    { id: 'INV-1248', orderId: 'SO-1248', customer: 'Danish Trading Company', amount: '₹18,50,000', tax: '₹3,33,000', total: '₹21,83,000', status: 'Partial', dueDate: '2026-01-22', paidDate: null, issueDate: '2026-01-12', paidAmount: '₹12,00,000' },
    { id: 'INV-1249', orderId: 'SO-1249', customer: 'Chilean Export Corp', amount: '₹13,60,000', tax: '₹2,44,800', total: '₹16,04,800', status: 'Pending', dueDate: '2026-01-27', paidDate: null, issueDate: '2026-01-17' },
    { id: 'INV-1250', orderId: 'SO-1250', customer: 'Egyptian Commerce Group', amount: '₹15,40,000', tax: '₹2,77,200', total: '₹18,17,200', status: 'Paid', dueDate: '2026-01-20', paidDate: '2026-01-19', issueDate: '2026-01-10' },
    { id: 'INV-1251', orderId: 'SO-1251', customer: 'Saudi Trading House', amount: '₹28,70,000', tax: '₹5,16,600', total: '₹33,86,600', status: 'Paid', dueDate: '2026-01-17', paidDate: '2026-01-16', issueDate: '2026-01-07' },
    { id: 'INV-1252', orderId: 'SO-1252', customer: 'Qatari Business Group', amount: '₹31,50,000', tax: '₹5,67,000', total: '₹37,17,000', status: 'Partial', dueDate: '2026-01-18', paidDate: null, issueDate: '2026-01-08', paidAmount: '₹20,00,000' },
    { id: 'INV-1253', orderId: 'SO-1253', customer: 'Belgian Distributors NV', amount: '₹12,60,000', tax: '₹2,26,800', total: '₹14,86,800', status: 'Pending', dueDate: '2026-01-25', paidDate: null, issueDate: '2026-01-15' },
    { id: 'INV-1254', orderId: 'SO-1254', customer: 'Finnish Import Services', amount: '₹14,90,000', tax: '₹2,68,200', total: '₹17,58,200', status: 'Paid', dueDate: '2026-01-19', paidDate: '2026-01-18', issueDate: '2026-01-09' },
    { id: 'INV-1255', orderId: 'SO-1255', customer: 'Portuguese Export Group', amount: '₹11,30,000', tax: '₹2,03,400', total: '₹13,33,400', status: 'Pending', dueDate: '2026-01-28', paidDate: null, issueDate: '2026-01-18' },
    { id: 'INV-1256', orderId: 'SO-1256', customer: 'Mexican Trading House', amount: '₹14,50,000', tax: '₹2,61,000', total: '₹17,11,000', status: 'Pending', dueDate: '2026-01-23', paidDate: null, issueDate: '2026-01-13' },
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
                        onClick={() => downloadInvoicePDF(invoice)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download PDF"
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

      {/* View Invoice Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-800">Invoice Details</h2>
              <button
                onClick={() => setViewModal(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Invoice Header */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-3xl font-bold text-blue-600">{viewModal.id}</h3>
                    <p className="text-gray-600 mt-1">Order: {viewModal.orderId}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${statusColors[viewModal.status]}`}>
                      {viewModal.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Customer Information</h4>
                <p className="text-xl font-semibold text-gray-900">{viewModal.customer}</p>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Issue Date</p>
                  <p className="text-lg font-semibold text-gray-800">{viewModal.issueDate}</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Due Date</p>
                  <p className="text-lg font-semibold text-gray-800">{viewModal.dueDate}</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Paid Date</p>
                  <p className="text-lg font-semibold text-gray-800">{viewModal.paidDate || 'Not Paid'}</p>
                </div>
              </div>

              {/* Amount Breakdown */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Amount Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-800">{viewModal.amount}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Tax (GST 18%)</span>
                    <span className="font-semibold text-gray-800">{viewModal.tax}</span>
                  </div>
                  <div className="border-t-2 border-gray-300 pt-3 flex justify-between text-xl">
                    <span className="font-bold text-gray-800">Total Amount</span>
                    <span className="font-bold text-blue-600">{viewModal.total}</span>
                  </div>
                  
                  {viewModal.paidAmount && (
                    <>
                      <div className="flex justify-between text-lg text-green-600">
                        <span className="font-medium">Paid Amount</span>
                        <span className="font-semibold">{viewModal.paidAmount}</span>
                      </div>
                      <div className="flex justify-between text-lg text-red-600">
                        <span className="font-medium">Balance Due</span>
                        <span className="font-semibold">
                          ₹{(parseFloat(viewModal.total.replace(/[₹,]/g, '')) - parseFloat(viewModal.paidAmount.replace(/[₹,]/g, ''))).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setViewModal(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    downloadInvoicePDF(viewModal)
                    setViewModal(null)
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <FiDownload />
                  <span>Download PDF</span>
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
