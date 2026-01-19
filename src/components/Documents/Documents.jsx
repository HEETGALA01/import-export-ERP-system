import React, { useState } from 'react'
import { FiPlus, FiDownload, FiEye, FiFile } from 'react-icons/fi'

const Documents = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [viewModal, setViewModal] = useState(null)

  const [documents, setDocuments] = useState([
    { id: 1, type: 'Commercial Invoice', docNumber: 'CI-2026-001', orderId: 'SO-1234', customer: 'ABC Corporation', country: 'USA', date: '2026-01-15', status: 'Approved' },
    { id: 2, type: 'Packing List', docNumber: 'PL-2026-001', orderId: 'SO-1234', customer: 'ABC Corporation', country: 'USA', date: '2026-01-15', status: 'Approved' },
    { id: 3, type: 'Bill of Lading', docNumber: 'BOL-2026-001', orderId: 'SO-1234', shipmentId: 'SH-5678', carrier: 'FedEx', date: '2026-01-18', status: 'Issued' },
    { id: 4, type: 'Certificate of Origin', docNumber: 'COO-2026-001', orderId: 'SO-1235', country: 'India', date: '2026-01-16', status: 'Pending' },
    { id: 5, type: 'Commercial Invoice', docNumber: 'CI-2026-002', orderId: 'PO-5001', vendor: 'Asia Import Co', country: 'China', date: '2026-01-10', status: 'Approved' },
    { id: 6, type: 'Packing List', docNumber: 'PL-2026-002', orderId: 'PO-5001', vendor: 'Asia Import Co', country: 'China', date: '2026-01-10', status: 'Approved' },
  ])

  const [formData, setFormData] = useState({
    type: 'Commercial Invoice',
    orderId: '',
    party: '',
    country: '',
    notes: ''
  })

  const documentTypes = [
    'Commercial Invoice',
    'Packing List',
    'Bill of Lading',
    'Certificate of Origin'
  ]

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Approved': 'bg-green-100 text-green-700',
    'Issued': 'bg-blue-100 text-blue-700',
    'Rejected': 'bg-red-100 text-red-700',
  }

  const getIconColor = (type) => {
    const colors = {
      'Commercial Invoice': 'text-blue-600',
      'Packing List': 'text-green-600',
      'Bill of Lading': 'text-purple-600',
      'Certificate of Origin': 'text-orange-600',
    }
    return colors[type] || 'text-gray-600'
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const prefix = {
      'Commercial Invoice': 'CI',
      'Packing List': 'PL',
      'Bill of Lading': 'BOL',
      'Certificate of Origin': 'COO'
    }
    const newDoc = {
      id: documents.length + 1,
      ...formData,
      docNumber: `${prefix[formData.type]}-2026-${String(documents.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    }
    setDocuments([newDoc, ...documents])
    setFormData({
      type: 'Commercial Invoice',
      orderId: '',
      party: '',
      country: '',
      notes: ''
    })
    setShowModal(false)
  }

  const filteredDocuments = activeTab === 'all'
    ? documents
    : documents.filter(doc => doc.type === activeTab)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Documents Management</h1>
          <p className="text-gray-600 mt-1">Manage import-export documents</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          <FiPlus />
          <span>Generate Document</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {documentTypes.map((type, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">{type}</p>
              <FiFile className={`text-xl ${getIconColor(type)}`} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">
              {documents.filter(d => d.type === type).length}
            </h3>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex overflow-x-auto border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'all'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            All Documents ({documents.length})
          </button>
          {documentTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === type
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {type} ({documents.filter(d => d.type === type).length})
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FiFile className={`text-2xl ${getIconColor(doc.type)}`} />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">{doc.type}</h3>
                      <p className="text-xs text-gray-600">{doc.docNumber}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[doc.status]}`}>
                    {doc.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order:</span>
                    <span className="font-medium text-gray-800">{doc.orderId}</span>
                  </div>
                  {doc.customer && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Customer:</span>
                      <span className="font-medium text-gray-800">{doc.customer}</span>
                    </div>
                  )}
                  {doc.vendor && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Vendor:</span>
                      <span className="font-medium text-gray-800">{doc.vendor}</span>
                    </div>
                  )}
                  {doc.country && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Country:</span>
                      <span className="font-medium text-gray-800">{doc.country}</span>
                    </div>
                  )}
                  {doc.shipmentId && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipment:</span>
                      <span className="font-medium text-gray-800">{doc.shipmentId}</span>
                    </div>
                  )}
                  {doc.carrier && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Carrier:</span>
                      <span className="font-medium text-gray-800">{doc.carrier}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-800">{doc.date}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewModal(doc)}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                  >
                    <FiEye />
                    <span>View</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-1 py-2 text-sm bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors">
                    <FiDownload />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Document Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Generate Document</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {documentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order ID *</label>
                  <input
                    type="text"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleInputChange}
                    required
                    placeholder="SO-1234 or PO-5001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer/Vendor *</label>
                  <input
                    type="text"
                    name="party"
                    value={formData.party}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
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
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <FiFile className={`text-2xl ${getIconColor(viewModal.type)}`} />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{viewModal.type}</h2>
                  <p className="text-sm text-gray-600">{viewModal.docNumber}</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="text-base font-medium text-gray-800">{viewModal.orderId}</p>
                  </div>
                  {viewModal.customer && (
                    <div>
                      <p className="text-sm text-gray-600">Customer</p>
                      <p className="text-base font-medium text-gray-800">{viewModal.customer}</p>
                    </div>
                  )}
                  {viewModal.vendor && (
                    <div>
                      <p className="text-sm text-gray-600">Vendor</p>
                      <p className="text-base font-medium text-gray-800">{viewModal.vendor}</p>
                    </div>
                  )}
                  {viewModal.country && (
                    <div>
                      <p className="text-sm text-gray-600">Country</p>
                      <p className="text-base font-medium text-gray-800">{viewModal.country}</p>
                    </div>
                  )}
                  {viewModal.shipmentId && (
                    <div>
                      <p className="text-sm text-gray-600">Shipment ID</p>
                      <p className="text-base font-medium text-gray-800">{viewModal.shipmentId}</p>
                    </div>
                  )}
                  {viewModal.carrier && (
                    <div>
                      <p className="text-sm text-gray-600">Carrier</p>
                      <p className="text-base font-medium text-gray-800">{viewModal.carrier}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="text-base font-medium text-gray-800">{viewModal.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-block text-xs px-3 py-1 rounded-full ${statusColors[viewModal.status]}`}>
                      {viewModal.status}
                    </span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Document Preview</p>
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FiFile className="text-6xl text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">PDF Preview would appear here</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setViewModal(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
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

export default Documents
