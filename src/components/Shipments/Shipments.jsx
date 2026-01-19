import React, { useState } from 'react'
import { FiPlus, FiTruck, FiAnchor, FiSend } from 'react-icons/fi'

const Shipments = () => {
  const [showModal, setShowModal] = useState(false)
  const [viewModal, setViewModal] = useState(null)

  const [shipments, setShipments] = useState([
    { id: 'SH-5678', orderId: 'SO-1234', destination: 'New York, USA', origin: 'Mumbai, India', mode: 'Air', carrier: 'FedEx', trackingNo: 'FDX123456789', status: 'In Transit', weight: '250 kg', shipDate: '2026-01-18', eta: '2026-01-22', timeline: [
      { date: '2026-01-18', event: 'Shipment Created', completed: true },
      { date: '2026-01-18', event: 'Picked Up', completed: true },
      { date: '2026-01-19', event: 'Departed Origin', completed: true },
      { date: '2026-01-22', event: 'Arrive at Destination', completed: false },
      { date: '2026-01-22', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5679', orderId: 'SO-1235', destination: 'London, UK', origin: 'Chennai, India', mode: 'Sea', carrier: 'Maersk Line', trackingNo: 'MLK987654321', status: 'Departed', weight: '1200 kg', shipDate: '2026-01-10', eta: '2026-01-25', timeline: [
      { date: '2026-01-10', event: 'Shipment Created', completed: true },
      { date: '2026-01-10', event: 'Loaded on Vessel', completed: true },
      { date: '2026-01-12', event: 'Departed Port', completed: true },
      { date: '2026-01-25', event: 'Arrive at Port', completed: false },
      { date: '2026-01-26', event: 'Customs Clearance', completed: false },
      { date: '2026-01-27', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5680', orderId: 'PO-5001', destination: 'Mumbai, India', origin: 'Shanghai, China', mode: 'Sea', carrier: 'CMA CGM', trackingNo: 'CMA456789123', status: 'In Transit', weight: '3500 kg', shipDate: '2026-01-15', eta: '2026-01-28', timeline: [
      { date: '2026-01-15', event: 'Shipment Created', completed: true },
      { date: '2026-01-15', event: 'Loaded on Vessel', completed: true },
      { date: '2026-01-17', event: 'Departed Port', completed: true },
      { date: '2026-01-28', event: 'Arrive at Port', completed: false },
      { date: '2026-01-29', event: 'Customs Clearance', completed: false },
      { date: '2026-01-30', event: 'Delivered', completed: false },
    ]},
  ])

  const [formData, setFormData] = useState({
    orderId: '',
    destination: '',
    origin: '',
    mode: 'Air',
    carrier: '',
    trackingNo: '',
    weight: '',
    shipDate: '',
    eta: ''
  })

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'In Transit': 'bg-blue-100 text-blue-700',
    'Departed': 'bg-orange-100 text-orange-700',
    'Delivered': 'bg-green-100 text-green-700',
    'Delayed': 'bg-red-100 text-red-700',
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newShipment = {
      id: `SH-${5678 + shipments.length}`,
      ...formData,
      status: 'Pending',
      timeline: [
        { date: formData.shipDate, event: 'Shipment Created', completed: true },
        { date: formData.shipDate, event: 'Awaiting Pickup', completed: false },
      ]
    }
    setShipments([newShipment, ...shipments])
    setFormData({
      orderId: '',
      destination: '',
      origin: '',
      mode: 'Air',
      carrier: '',
      trackingNo: '',
      weight: '',
      shipDate: '',
      eta: ''
    })
    setShowModal(false)
  }

  const getModeIcon = (mode) => {
    switch(mode) {
      case 'Air': return <FiSend className="text-blue-600" />
      case 'Sea': return <FiAnchor className="text-teal-600" />
      case 'Land': return <FiTruck className="text-green-600" />
      default: return <FiTruck />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Shipment & Logistics</h1>
          <p className="text-gray-600 mt-1">Track and manage shipments</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          <FiPlus />
          <span>Create Shipment</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Shipments', value: shipments.length, icon: FiTruck, color: 'blue' },
          { label: 'In Transit', value: shipments.filter(s => s.status === 'In Transit').length, icon: FiTruck, color: 'orange' },
          { label: 'Delivered', value: shipments.filter(s => s.status === 'Delivered').length, icon: FiTruck, color: 'green' },
          { label: 'Pending', value: shipments.filter(s => s.status === 'Pending').length, icon: FiTruck, color: 'yellow' },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <Icon className="text-xl text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          )
        })}
      </div>

      {/* Shipments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {shipments.map((shipment) => (
          <div key={shipment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{shipment.id}</h3>
                <p className="text-sm text-gray-600">Order: {shipment.orderId}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${statusColors[shipment.status]}`}>
                {shipment.status}
              </span>
            </div>

            {/* Route */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Origin</p>
                  <p className="text-sm font-medium text-gray-800">{shipment.origin}</p>
                </div>
                <div className="px-4">
                  {getModeIcon(shipment.mode)}
                </div>
                <div className="flex-1 text-right">
                  <p className="text-xs text-gray-500">Destination</p>
                  <p className="text-sm font-medium text-gray-800">{shipment.destination}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Transport Mode</p>
                <p className="text-sm font-medium text-gray-800">{shipment.mode}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Carrier</p>
                <p className="text-sm font-medium text-gray-800">{shipment.carrier}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tracking Number</p>
                <p className="text-sm font-medium text-primary-600">{shipment.trackingNo}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Weight</p>
                <p className="text-sm font-medium text-gray-800">{shipment.weight}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Ship Date</p>
                <p className="text-sm font-medium text-gray-800">{shipment.shipDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">ETA</p>
                <p className="text-sm font-medium text-gray-800">{shipment.eta}</p>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => setViewModal(shipment)}
              className="w-full py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
            >
              View Tracking Timeline
            </button>
          </div>
        ))}
      </div>

      {/* Create Shipment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Create Shipment</h2>
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
                    placeholder="SO-1234 or PO-5001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transport Mode *</label>
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Air">Air</option>
                    <option value="Sea">Sea</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Origin *</label>
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination *</label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Carrier *</label>
                  <input
                    type="text"
                    name="carrier"
                    value={formData.carrier}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Number *</label>
                  <input
                    type="text"
                    name="trackingNo"
                    value={formData.trackingNo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight *</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 250 kg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ship Date *</label>
                  <input
                    type="date"
                    name="shipDate"
                    value={formData.shipDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Arrival (ETA) *</label>
                  <input
                    type="date"
                    name="eta"
                    value={formData.eta}
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
                  Create Shipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Timeline Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Tracking Timeline - {viewModal.id}</h2>
              <p className="text-sm text-gray-600 mt-1">Tracking: {viewModal.trackingNo}</p>
            </div>
            <div className="p-6">
              {/* Timeline */}
              <div className="relative">
                {viewModal.timeline.map((event, index) => (
                  <div key={index} className="flex items-start mb-6 last:mb-0">
                    <div className="flex-shrink-0 mr-4">
                      <div className={`w-4 h-4 rounded-full ${event.completed ? 'bg-green-500' : 'bg-gray-300'} relative`}>
                        {index < viewModal.timeline.length - 1 && (
                          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-12 ${event.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${event.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                        {event.event}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                    </div>
                    {event.completed && (
                      <span className="text-xs text-green-600 font-medium">Completed</span>
                    )}
                  </div>
                ))}
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

export default Shipments
