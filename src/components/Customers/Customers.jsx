import React, { useState } from 'react'
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiUser, FiBriefcase } from 'react-icons/fi'

const Customers = () => {
  const [activeTab, setActiveTab] = useState('customers')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const [customers, setCustomers] = useState([
    { id: 1, name: 'ABC Corporation', type: 'customer', country: 'USA', contact: 'John Smith', email: 'john@abc.com', phone: '+1-555-0123', gst: 'GST123456', balance: '₹12,50,000' },
    { id: 2, name: 'XYZ Limited', type: 'customer', country: 'UK', contact: 'Sarah Johnson', email: 'sarah@xyz.com', phone: '+44-20-1234', gst: 'VAT789012', balance: '₹8,75,000' },
    { id: 3, name: 'Global Traders Inc', type: 'customer', country: 'Germany', contact: 'Michael Weber', email: 'michael@global.com', phone: '+49-30-5678', gst: 'DE345678', balance: '₹15,20,000' },
  ])

  const [vendors, setVendors] = useState([
    { id: 1, name: 'Asia Import Co', type: 'vendor', country: 'China', contact: 'Li Wei', email: 'liwei@asiaimport.com', phone: '+86-10-9876', gst: 'CN987654', balance: '₹9,80,000' },
    { id: 2, name: 'Euro Exports Ltd', type: 'vendor', country: 'France', contact: 'Pierre Dubois', email: 'pierre@euroexports.com', phone: '+33-1-4567', gst: 'FR654321', balance: '₹7,45,000' },
    { id: 3, name: 'Japan Trading Corp', type: 'vendor', country: 'Japan', contact: 'Yuki Tanaka', email: 'yuki@japan.com', phone: '+81-3-2345', gst: 'JP123789', balance: '₹11,20,000' },
  ])

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    contact: '',
    email: '',
    phone: '',
    gst: '',
    balance: ''
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingItem) {
      if (activeTab === 'customers') {
        setCustomers(customers.map(c => 
          c.id === editingItem.id ? { ...formData, id: c.id, type: 'customer' } : c
        ))
      } else {
        setVendors(vendors.map(v => 
          v.id === editingItem.id ? { ...formData, id: v.id, type: 'vendor' } : v
        ))
      }
    } else {
      const newItem = {
        ...formData,
        id: Date.now(),
        type: activeTab === 'customers' ? 'customer' : 'vendor'
      }
      
      if (activeTab === 'customers') {
        setCustomers([...customers, newItem])
      } else {
        setVendors([...vendors, newItem])
      }
    }
    
    resetForm()
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData(item)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      if (activeTab === 'customers') {
        setCustomers(customers.filter(c => c.id !== id))
      } else {
        setVendors(vendors.filter(v => v.id !== id))
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      country: '',
      contact: '',
      email: '',
      phone: '',
      gst: '',
      balance: ''
    })
    setEditingItem(null)
    setShowModal(false)
  }

  const currentData = activeTab === 'customers' ? customers : vendors
  const filteredData = currentData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contact.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Customers & Vendors</h1>
          <p className="text-gray-600 mt-1">Manage your business contacts</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          <FiPlus />
          <span>Add {activeTab === 'customers' ? 'Customer' : 'Vendor'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('customers')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'customers'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <FiUser />
              <span>Customers ({customers.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('vendors')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'vendors'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <FiBriefcase />
              <span>Vendors ({vendors.length})</span>
            </div>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Country</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Contact Person</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Phone</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">GST/VAT</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Balance</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{item.country}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{item.contact}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{item.email}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{item.phone}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{item.gst}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-semibold text-gray-800">{item.balance}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingItem ? 'Edit' : 'Add'} {activeTab === 'customers' ? 'Customer' : 'Vendor'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST/VAT Number *
                  </label>
                  <input
                    type="text"
                    name="gst"
                    value={formData.gst}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outstanding Balance
                  </label>
                  <input
                    type="text"
                    name="balance"
                    value={formData.balance}
                    onChange={handleInputChange}
                    placeholder="₹0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Customers
