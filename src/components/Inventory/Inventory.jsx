import React, { useState } from 'react'
import { FiPlus, FiEdit2, FiAlertCircle, FiPackage } from 'react-icons/fi'

const Inventory = () => {
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [showStockModal, setShowStockModal] = useState(null)

  const [inventory, setInventory] = useState([
    { id: 1, sku: 'PRD-001', name: 'Electronic Components', category: 'Electronics', stock: 850, minStock: 500, unit: 'pcs', location: 'Warehouse A', price: '₹1,250' },
    { id: 2, sku: 'PRD-002', name: 'Cotton Fabric', category: 'Textiles', stock: 320, minStock: 500, unit: 'meters', location: 'Warehouse B', price: '₹450' },
    { id: 3, sku: 'PRD-003', name: 'Machinery Parts', category: 'Machinery', stock: 150, minStock: 100, unit: 'pcs', location: 'Warehouse A', price: '₹8,500' },
    { id: 4, sku: 'PRD-004', name: 'Chemical Compounds', category: 'Chemicals', stock: 680, minStock: 300, unit: 'kg', location: 'Warehouse C', price: '₹3,200' },
    { id: 5, sku: 'PRD-005', name: 'Steel Sheets', category: 'Raw Materials', stock: 90, minStock: 200, unit: 'sheets', location: 'Warehouse A', price: '₹5,400' },
    { id: 6, sku: 'PRD-006', name: 'Laptop Computers', category: 'Electronics', stock: 450, minStock: 300, unit: 'pcs', location: 'Warehouse A', price: '₹45,000' },
    { id: 7, sku: 'PRD-007', name: 'Silk Fabric', category: 'Textiles', stock: 280, minStock: 200, unit: 'meters', location: 'Warehouse B', price: '₹850' },
    { id: 8, sku: 'PRD-008', name: 'Hydraulic Pumps', category: 'Machinery', stock: 75, minStock: 100, unit: 'pcs', location: 'Warehouse A', price: '₹12,500' },
    { id: 9, sku: 'PRD-009', name: 'Industrial Adhesives', category: 'Chemicals', stock: 520, minStock: 300, unit: 'liters', location: 'Warehouse C', price: '₹1,800' },
    { id: 10, sku: 'PRD-010', name: 'Aluminum Bars', category: 'Raw Materials', stock: 640, minStock: 400, unit: 'pcs', location: 'Warehouse A', price: '₹3,600' },
    { id: 11, sku: 'PRD-011', name: 'LED Displays', category: 'Electronics', stock: 310, minStock: 250, unit: 'pcs', location: 'Warehouse A', price: '₹6,200' },
    { id: 12, sku: 'PRD-012', name: 'Polyester Yarn', category: 'Textiles', stock: 890, minStock: 600, unit: 'kg', location: 'Warehouse B', price: '₹320' },
    { id: 13, sku: 'PRD-013', name: 'CNC Machine Tools', category: 'Machinery', stock: 42, minStock: 50, unit: 'pcs', location: 'Warehouse A', price: '₹85,000' },
    { id: 14, sku: 'PRD-014', name: 'Paint Solvents', category: 'Chemicals', stock: 760, minStock: 500, unit: 'liters', location: 'Warehouse C', price: '₹950' },
    { id: 15, sku: 'PRD-015', name: 'Copper Wire', category: 'Raw Materials', stock: 1250, minStock: 800, unit: 'kg', location: 'Warehouse A', price: '₹780' },
    { id: 16, sku: 'PRD-016', name: 'Smartphone Displays', category: 'Electronics', stock: 420, minStock: 300, unit: 'pcs', location: 'Warehouse A', price: '₹8,900' },
    { id: 17, sku: 'PRD-017', name: 'Denim Fabric', category: 'Textiles', stock: 680, minStock: 500, unit: 'meters', location: 'Warehouse B', price: '₹620' },
    { id: 18, sku: 'PRD-018', name: 'Electric Motors', category: 'Machinery', stock: 185, minStock: 150, unit: 'pcs', location: 'Warehouse A', price: '₹15,600' },
    { id: 19, sku: 'PRD-019', name: 'Polymer Resins', category: 'Chemicals', stock: 940, minStock: 700, unit: 'kg', location: 'Warehouse C', price: '₹2,400' },
    { id: 20, sku: 'PRD-020', name: 'Stainless Steel Rods', category: 'Raw Materials', stock: 520, minStock: 400, unit: 'pcs', location: 'Warehouse A', price: '₹4,800' },
    { id: 21, sku: 'PRD-021', name: 'Tablet Computers', category: 'Electronics', stock: 280, minStock: 200, unit: 'pcs', location: 'Warehouse A', price: '₹28,000' },
    { id: 22, sku: 'PRD-022', name: 'Linen Fabric', category: 'Textiles', stock: 145, minStock: 300, unit: 'meters', location: 'Warehouse B', price: '₹980' },
    { id: 23, sku: 'PRD-023', name: 'Conveyor Belts', category: 'Machinery', stock: 95, minStock: 100, unit: 'pcs', location: 'Warehouse A', price: '₹22,500' },
    { id: 24, sku: 'PRD-024', name: 'Lubricating Oils', category: 'Chemicals', stock: 1120, minStock: 800, unit: 'liters', location: 'Warehouse C', price: '₹1,350' },
    { id: 25, sku: 'PRD-025', name: 'Titanium Sheets', category: 'Raw Materials', stock: 78, minStock: 100, unit: 'sheets', location: 'Warehouse A', price: '₹18,900' },
    { id: 26, sku: 'PRD-026', name: 'CCTV Cameras', category: 'Electronics', stock: 640, minStock: 400, unit: 'pcs', location: 'Warehouse A', price: '₹5,600' },
    { id: 27, sku: 'PRD-027', name: 'Leather Material', category: 'Textiles', stock: 380, minStock: 300, unit: 'sq meters', location: 'Warehouse B', price: '₹1,450' },
    { id: 28, sku: 'PRD-028', name: 'Welding Machines', category: 'Machinery', stock: 62, minStock: 80, unit: 'pcs', location: 'Warehouse A', price: '₹35,000' },
    { id: 29, sku: 'PRD-029', name: 'Acid Solutions', category: 'Chemicals', stock: 890, minStock: 600, unit: 'liters', location: 'Warehouse C', price: '₹2,800' },
    { id: 30, sku: 'PRD-030', name: 'Brass Fittings', category: 'Raw Materials', stock: 1450, minStock: 1000, unit: 'pcs', location: 'Warehouse A', price: '₹680' },
    { id: 31, sku: 'PRD-031', name: 'Memory Chips', category: 'Electronics', stock: 720, minStock: 500, unit: 'pcs', location: 'Warehouse A', price: '₹3,200' },
    { id: 32, sku: 'PRD-032', name: 'Nylon Thread', category: 'Textiles', stock: 1580, minStock: 1200, unit: 'kg', location: 'Warehouse B', price: '₹540' },
    { id: 33, sku: 'PRD-033', name: 'Industrial Drills', category: 'Machinery', stock: 118, minStock: 100, unit: 'pcs', location: 'Warehouse A', price: '₹28,500' },
    { id: 34, sku: 'PRD-034', name: 'Cleaning Solvents', category: 'Chemicals', stock: 980, minStock: 700, unit: 'liters', location: 'Warehouse C', price: '₹1,150' },
    { id: 35, sku: 'PRD-035', name: 'Zinc Ingots', category: 'Raw Materials', stock: 560, minStock: 400, unit: 'kg', location: 'Warehouse A', price: '₹420' },
  ])

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: '',
    stock: '',
    minStock: '',
    unit: '',
    location: '',
    price: ''
  })

  const [stockAdjustment, setStockAdjustment] = useState({
    type: 'in',
    quantity: '',
    reason: ''
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingItem) {
      setInventory(inventory.map(item =>
        item.id === editingItem.id ? { ...formData, id: item.id } : item
      ))
    } else {
      const newItem = { ...formData, id: Date.now() }
      setInventory([...inventory, newItem])
    }
    resetForm()
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData(item)
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      sku: '',
      name: '',
      category: '',
      stock: '',
      minStock: '',
      unit: '',
      location: '',
      price: ''
    })
    setEditingItem(null)
    setShowModal(false)
  }

  const handleStockAdjustment = (e) => {
    e.preventDefault()
    setInventory(inventory.map(item => {
      if (item.id === showStockModal.id) {
        const adjustment = parseInt(stockAdjustment.quantity)
        const newStock = stockAdjustment.type === 'in'
          ? item.stock + adjustment
          : item.stock - adjustment
        return { ...item, stock: newStock }
      }
      return item
    }))
    setStockAdjustment({ type: 'in', quantity: '', reason: '' })
    setShowStockModal(null)
  }

  const getLowStockCount = () => inventory.filter(item => item.stock < item.minStock).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Manage product stock and warehouse</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          <FiPlus />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Products</p>
            <FiPackage className="text-xl text-gray-400" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{inventory.length}</h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Stock Value</p>
            <FiPackage className="text-xl text-gray-400" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">₹42.5M</h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Low Stock Items</p>
            <FiAlertCircle className="text-xl text-red-500" />
          </div>
          <h3 className="text-3xl font-bold text-red-600">{getLowStockCount()}</h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Categories</p>
            <FiPackage className="text-xl text-gray-400" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">
            {new Set(inventory.map(i => i.category)).size}
          </h3>
        </div>
      </div>

      {/* Low Stock Alert */}
      {getLowStockCount() > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start">
            <FiAlertCircle className="text-red-500 text-xl mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-red-800">Low Stock Alert</h3>
              <p className="text-sm text-red-600 mt-1">
                {getLowStockCount()} product(s) are below minimum stock level. Please reorder soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">SKU</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Product Name</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Stock</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Min Stock</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Unit</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Location</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Unit Price</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${item.stock < item.minStock ? 'bg-red-50' : ''}`}>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-primary-600">{item.sku}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-800">{item.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.category}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className={`text-sm font-semibold ${item.stock < item.minStock ? 'text-red-600' : 'text-gray-800'}`}>
                        {item.stock}
                      </span>
                      {item.stock < item.minStock && (
                        <FiAlertCircle className="text-red-500 ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.minStock}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.unit}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.location}</td>
                  <td className="py-4 px-6 text-sm font-semibold text-gray-800">{item.price}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => setShowStockModal(item)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Adjust Stock"
                      >
                        <FiPackage />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingItem ? 'Edit Product' : 'Add Product'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Stock *</label>
                  <input
                    type="number"
                    name="minStock"
                    value={formData.minStock}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    required
                    placeholder="pcs, kg, meters, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price *</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="₹"
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
                  {editingItem ? 'Update' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {showStockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Adjust Stock</h2>
              <p className="text-sm text-gray-600 mt-1">{showStockModal.name} ({showStockModal.sku})</p>
              <p className="text-sm text-gray-600">Current Stock: <span className="font-semibold">{showStockModal.stock} {showStockModal.unit}</span></p>
            </div>
            <form onSubmit={handleStockAdjustment} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adjustment Type *</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="in"
                        checked={stockAdjustment.type === 'in'}
                        onChange={(e) => setStockAdjustment({ ...stockAdjustment, type: e.target.value })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Stock In</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="out"
                        checked={stockAdjustment.type === 'out'}
                        onChange={(e) => setStockAdjustment({ ...stockAdjustment, type: e.target.value })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Stock Out</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                  <input
                    type="number"
                    value={stockAdjustment.quantity}
                    onChange={(e) => setStockAdjustment({ ...stockAdjustment, quantity: e.target.value })}
                    required
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason *</label>
                  <textarea
                    value={stockAdjustment.reason}
                    onChange={(e) => setStockAdjustment({ ...stockAdjustment, reason: e.target.value })}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowStockModal(null)
                    setStockAdjustment({ type: 'in', quantity: '', reason: '' })
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Adjust Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inventory
