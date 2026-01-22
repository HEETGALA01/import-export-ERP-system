import React, { useState } from 'react'
import { FiTruck, FiAnchor, FiSend, FiMapPin, FiClock, FiPackage, FiFilter } from 'react-icons/fi'

const MobileShipments = () => {
  const [filterMode, setFilterMode] = useState('all')
  const [selectedShipment, setSelectedShipment] = useState(null)

  const shipments = [
    { 
      id: 'SH-5678', 
      orderId: 'SO-1234',
      origin: 'Mumbai, India',
      destination: 'New York, USA', 
      mode: 'Air', 
      carrier: 'FedEx',
      trackingNo: 'FDX123456789',
      status: 'In Transit', 
      progress: 75,
      weight: '250 kg',
      eta: 'Jan 22, 2026',
      timeline: [
        { date: 'Jan 18, 10:00 AM', event: 'Shipment Created', completed: true },
        { date: 'Jan 18, 2:30 PM', event: 'Picked Up', completed: true },
        { date: 'Jan 19, 8:00 AM', event: 'Departed Origin', completed: true },
        { date: 'Jan 22, 5:00 PM', event: 'Arrive at Destination', completed: false },
        { date: 'Jan 22, 8:00 PM', event: 'Delivered', completed: false },
      ]
    },
    { 
      id: 'SH-5679', 
      orderId: 'SO-1235',
      origin: 'Chennai, India',
      destination: 'London, UK', 
      mode: 'Sea', 
      carrier: 'Maersk',
      trackingNo: 'MLK987654321',
      status: 'Departed', 
      progress: 45,
      weight: '1200 kg',
      eta: 'Jan 25, 2026',
      timeline: [
        { date: 'Jan 10, 9:00 AM', event: 'Shipment Created', completed: true },
        { date: 'Jan 10, 3:00 PM', event: 'Loaded on Vessel', completed: true },
        { date: 'Jan 12, 6:00 AM', event: 'Departed Port', completed: true },
        { date: 'Jan 25, 2:00 PM', event: 'Arrive at Port', completed: false },
        { date: 'Jan 27, 10:00 AM', event: 'Delivered', completed: false },
      ]
    },
    { 
      id: 'SH-5680', 
      orderId: 'PO-5001',
      origin: 'Shanghai, China',
      destination: 'Mumbai, India', 
      mode: 'Sea', 
      carrier: 'CMA CGM',
      trackingNo: 'CMA456789123',
      status: 'In Transit', 
      progress: 60,
      weight: '3500 kg',
      eta: 'Jan 28, 2026',
      timeline: [
        { date: 'Jan 15, 8:00 AM', event: 'Shipment Created', completed: true },
        { date: 'Jan 15, 4:00 PM', event: 'Loaded on Vessel', completed: true },
        { date: 'Jan 17, 6:00 AM', event: 'Departed Port', completed: true },
        { date: 'Jan 28, 1:00 PM', event: 'Arrive at Port', completed: false },
        { date: 'Jan 30, 11:00 AM', event: 'Delivered', completed: false },
      ]
    },
  ]

  const filteredShipments = filterMode === 'all'
    ? shipments
    : shipments.filter(s => s.status.toLowerCase().includes(filterMode.toLowerCase()))

  const getModeIcon = (mode) => {
    switch(mode) {
      case 'Air': return <FiSend className="text-blue-600" />
      case 'Sea': return <FiAnchor className="text-teal-600" />
      case 'Land': return <FiTruck className="text-green-600" />
      default: return <FiTruck />
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'In Transit': 'bg-blue-100 text-blue-700',
      'Departed': 'bg-orange-100 text-orange-700',
      'Delivered': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  if (selectedShipment) {
    return (
      <div className="h-full bg-white">
        {/* Tracking Header */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-4 text-white">
          <button
            onClick={() => setSelectedShipment(null)}
            className="mb-3 text-sm flex items-center text-primary-100"
          >
            ← Back to Shipments
          </button>
          <h2 className="text-xl font-bold mb-1">{selectedShipment.id}</h2>
          <p className="text-sm text-primary-100">{selectedShipment.trackingNo}</p>
        </div>

        {/* Shipment Info */}
        <div className="p-4 space-y-4">
          {/* Route */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Origin</p>
                <p className="text-sm font-semibold text-gray-800">{selectedShipment.origin}</p>
              </div>
              <div className="px-3">
                {getModeIcon(selectedShipment.mode)}
              </div>
              <div className="flex-1 text-right">
                <p className="text-xs text-gray-500 mb-1">Destination</p>
                <p className="text-sm font-semibold text-gray-800">{selectedShipment.destination}</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all" 
                  style={{ width: `${selectedShipment.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1 text-center">{selectedShipment.progress}% Complete</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <span className={`inline-block text-xs px-2 py-1 rounded-full ${getStatusColor(selectedShipment.status)}`}>
                {selectedShipment.status}
              </span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">ETA</p>
              <p className="text-sm font-semibold text-gray-800">{selectedShipment.eta}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Carrier</p>
              <p className="text-sm font-semibold text-gray-800">{selectedShipment.carrier}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Weight</p>
              <p className="text-sm font-semibold text-gray-800">{selectedShipment.weight}</p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Tracking Timeline</h3>
            <div className="space-y-4">
              {selectedShipment.timeline.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex flex-col items-center mr-3">
                    <div className={`w-3 h-3 rounded-full ${event.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    {index < selectedShipment.timeline.length - 1 && (
                      <div className={`w-0.5 h-12 ${event.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`text-sm font-medium ${event.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                      {event.event}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                  </div>
                  {event.completed && (
                    <span className="text-xs text-green-600 font-medium">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button className="py-3 bg-primary-600 text-white text-sm font-medium rounded-xl active:bg-primary-700 shadow-sm">
              Share Tracking
            </button>
            <button className="py-3 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-xl active:bg-gray-50 shadow-sm">
              Contact Carrier
            </button>
          </div>

          {/* Bottom Padding */}
          <div className="h-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 text-center">
          <p className="text-2xl font-bold text-gray-800">{shipments.length}</p>
          <p className="text-xs text-gray-600 mt-1">Total</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {shipments.filter(s => s.status === 'In Transit').length}
          </p>
          <p className="text-xs text-gray-600 mt-1">In Transit</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 text-center">
          <p className="text-2xl font-bold text-orange-600">
            {shipments.filter(s => s.status === 'Departed').length}
          </p>
          <p className="text-xs text-gray-600 mt-1">Departed</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <FiFilter className="text-gray-600 flex-shrink-0" />
        {['all', 'In Transit', 'Departed', 'Delivered'].map((mode) => (
          <button
            key={mode}
            onClick={() => setFilterMode(mode)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              filterMode === mode
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 active:bg-gray-200'
            }`}
          >
            {mode === 'all' ? 'All' : mode}
          </button>
        ))}
      </div>

      {/* Shipments List */}
      <div className="space-y-3">
        {filteredShipments.map((shipment) => (
          <div
            key={shipment.id}
            onClick={() => setSelectedShipment(shipment)}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 active:bg-gray-50"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{shipment.id}</h3>
                <p className="text-xs text-gray-500">{shipment.orderId}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(shipment.status)}`}>
                {shipment.status}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <p className="text-xs text-gray-500">From</p>
                  <p className="text-sm font-medium text-gray-800">{shipment.origin}</p>
                </div>
                <div className="px-2">
                  {getModeIcon(shipment.mode)}
                </div>
                <div className="flex-1 text-right">
                  <p className="text-xs text-gray-500">To</p>
                  <p className="text-sm font-medium text-gray-800">{shipment.destination}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center text-gray-600">
                <FiClock className="mr-1" />
                <span>ETA: {shipment.eta}</span>
              </div>
              <div className="flex items-center text-primary-600 font-medium">
                <span>{shipment.progress}% Complete</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div 
                className="bg-primary-600 h-1.5 rounded-full transition-all" 
                style={{ width: `${shipment.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Padding */}
      <div className="h-4"></div>
    </div>
  )
}

export default MobileShipments
