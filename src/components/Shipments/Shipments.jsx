import React, { useState } from 'react'
import { FiPlus, FiTruck, FiAnchor, FiSend, FiDownload, FiEye } from 'react-icons/fi'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

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
    { id: 'SH-5681', orderId: 'SO-1238', destination: 'Sydney, Australia', origin: 'Bangalore, India', mode: 'Air', carrier: 'Qantas Freight', trackingNo: 'QFA789012345', status: 'In Transit', weight: '420 kg', shipDate: '2026-01-16', eta: '2026-01-19', timeline: [
      { date: '2026-01-16', event: 'Shipment Created', completed: true },
      { date: '2026-01-16', event: 'Picked Up', completed: true },
      { date: '2026-01-17', event: 'Departed Origin', completed: true },
      { date: '2026-01-19', event: 'Arrive at Destination', completed: false },
      { date: '2026-01-19', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5682', orderId: 'SO-1240', destination: 'Singapore', origin: 'Delhi, India', mode: 'Sea', carrier: 'MSC Mediterranean', trackingNo: 'MSC234567890', status: 'Delivered', weight: '1850 kg', shipDate: '2026-01-05', eta: '2026-01-17', timeline: [
      { date: '2026-01-05', event: 'Shipment Created', completed: true },
      { date: '2026-01-05', event: 'Loaded on Vessel', completed: true },
      { date: '2026-01-07', event: 'Departed Port', completed: true },
      { date: '2026-01-17', event: 'Arrive at Port', completed: true },
      { date: '2026-01-17', event: 'Customs Clearance', completed: true },
      { date: '2026-01-17', event: 'Delivered', completed: true },
    ]},
    { id: 'SH-5683', orderId: 'PO-5005', destination: 'Chennai, India', origin: 'Seoul, South Korea', mode: 'Air', carrier: 'Korean Air Cargo', trackingNo: 'KAL567890123', status: 'In Transit', weight: '680 kg', shipDate: '2026-01-20', eta: '2026-01-23', timeline: [
      { date: '2026-01-20', event: 'Shipment Created', completed: true },
      { date: '2026-01-20', event: 'Picked Up', completed: true },
      { date: '2026-01-21', event: 'Departed Origin', completed: true },
      { date: '2026-01-23', event: 'Arrive at Destination', completed: false },
      { date: '2026-01-23', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5684', orderId: 'SO-1241', destination: 'Dubai, UAE', origin: 'Mumbai, India', mode: 'Land', carrier: 'Emirates Transport', trackingNo: 'EMT890123456', status: 'Departed', weight: '550 kg', shipDate: '2026-01-14', eta: '2026-01-18', timeline: [
      { date: '2026-01-14', event: 'Shipment Created', completed: true },
      { date: '2026-01-14', event: 'Loaded on Truck', completed: true },
      { date: '2026-01-15', event: 'Departed Warehouse', completed: true },
      { date: '2026-01-18', event: 'Arrive at Destination', completed: false },
      { date: '2026-01-18', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5685', orderId: 'PO-5007', destination: 'Bangalore, India', origin: 'Taipei, Taiwan', mode: 'Air', carrier: 'China Airlines Cargo', trackingNo: 'CAL012345678', status: 'Pending', weight: '390 kg', shipDate: '2026-01-22', eta: '2026-01-25', timeline: [
      { date: '2026-01-22', event: 'Shipment Created', completed: true },
      { date: '2026-01-22', event: 'Awaiting Pickup', completed: false },
    ]},
    { id: 'SH-5686', orderId: 'SO-1243', destination: 'Amsterdam, Netherlands', origin: 'Delhi, India', mode: 'Sea', carrier: 'Hapag-Lloyd', trackingNo: 'HLL789012345', status: 'In Transit', weight: '1640 kg', shipDate: '2026-01-11', eta: '2026-01-25', timeline: [
      { date: '2026-01-11', event: 'Shipment Created', completed: true },
      { date: '2026-01-11', event: 'Loaded on Vessel', completed: true },
      { date: '2026-01-13', event: 'Departed Port', completed: true },
      { date: '2026-01-25', event: 'Arrive at Port', completed: false },
      { date: '2026-01-26', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5687', orderId: 'SO-1244', destination: 'Rome, Italy', origin: 'Mumbai, India', mode: 'Sea', carrier: 'MSC Mediterranean', trackingNo: 'MSC456789012', status: 'Departed', weight: '1980 kg', shipDate: '2026-01-13', eta: '2026-01-27', timeline: [
      { date: '2026-01-13', event: 'Shipment Created', completed: true },
      { date: '2026-01-13', event: 'Loaded on Vessel', completed: true },
      { date: '2026-01-15', event: 'Departed Port', completed: true },
      { date: '2026-01-27', event: 'Arrive at Port', completed: false },
      { date: '2026-01-28', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5688', orderId: 'PO-5010', destination: 'Chennai, India', origin: 'Hong Kong', mode: 'Air', carrier: 'Cathay Pacific Cargo', trackingNo: 'CX123456789', status: 'Delivered', weight: '920 kg', shipDate: '2026-01-08', eta: '2026-01-11', timeline: [
      { date: '2026-01-08', event: 'Shipment Created', completed: true },
      { date: '2026-01-08', event: 'Picked Up', completed: true },
      { date: '2026-01-09', event: 'Departed Origin', completed: true },
      { date: '2026-01-11', event: 'Arrive at Destination', completed: true },
      { date: '2026-01-11', event: 'Delivered', completed: true },
    ]},
    { id: 'SH-5689', orderId: 'SO-1246', destination: 'Auckland, New Zealand', origin: 'Bangalore, India', mode: 'Air', carrier: 'Air New Zealand Cargo', trackingNo: 'ANZ890123456', status: 'In Transit', weight: '710 kg', shipDate: '2026-01-10', eta: '2026-01-14', timeline: [
      { date: '2026-01-10', event: 'Shipment Created', completed: true },
      { date: '2026-01-10', event: 'Picked Up', completed: true },
      { date: '2026-01-11', event: 'Departed Origin', completed: true },
      { date: '2026-01-14', event: 'Arrive at Destination', completed: false },
      { date: '2026-01-14', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5690', orderId: 'SO-1248', destination: 'Copenhagen, Denmark', origin: 'Hyderabad, India', mode: 'Sea', carrier: 'Maersk Line', trackingNo: 'MLK567890123', status: 'Departed', weight: '1420 kg', shipDate: '2026-01-14', eta: '2026-01-28', timeline: [
      { date: '2026-01-14', event: 'Shipment Created', completed: true },
      { date: '2026-01-14', event: 'Loaded on Vessel', completed: true },
      { date: '2026-01-16', event: 'Departed Port', completed: true },
      { date: '2026-01-28', event: 'Arrive at Port', completed: false },
      { date: '2026-01-29', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5691', orderId: 'PO-5013', destination: 'Mumbai, India', origin: 'Hamburg, Germany', mode: 'Sea', carrier: 'Hamburg Sud', trackingNo: 'HBS234567890', status: 'In Transit', weight: '2150 kg', shipDate: '2026-01-12', eta: '2026-01-26', timeline: [
      { date: '2026-01-12', event: 'Shipment Created', completed: true },
      { date: '2026-01-12', event: 'Loaded on Vessel', completed: true },
      { date: '2026-01-14', event: 'Departed Port', completed: true },
      { date: '2026-01-26', event: 'Arrive at Port', completed: false },
      { date: '2026-01-27', event: 'Customs Clearance', completed: false },
      { date: '2026-01-28', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5692', orderId: 'SO-1250', destination: 'Cairo, Egypt', origin: 'Pune, India', mode: 'Sea', carrier: 'CMA CGM', trackingNo: 'CMA678901234', status: 'In Transit', weight: '1580 kg', shipDate: '2026-01-12', eta: '2026-01-24', timeline: [
      { date: '2026-01-12', event: 'Shipment Created', completed: true },
      { date: '2026-01-12', event: 'Loaded on Vessel', completed: true },
      { date: '2026-01-14', event: 'Departed Port', completed: true },
      { date: '2026-01-24', event: 'Arrive at Port', completed: false },
      { date: '2026-01-25', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5693', orderId: 'SO-1251', destination: 'Riyadh, Saudi Arabia', origin: 'Delhi, India', mode: 'Air', carrier: 'Saudia Cargo', trackingNo: 'SVA345678901', status: 'Delivered', weight: '1320 kg', shipDate: '2026-01-09', eta: '2026-01-12', timeline: [
      { date: '2026-01-09', event: 'Shipment Created', completed: true },
      { date: '2026-01-09', event: 'Picked Up', completed: true },
      { date: '2026-01-10', event: 'Departed Origin', completed: true },
      { date: '2026-01-12', event: 'Arrive at Destination', completed: true },
      { date: '2026-01-12', event: 'Delivered', completed: true },
    ]},
    { id: 'SH-5694', orderId: 'SO-1252', destination: 'Doha, Qatar', origin: 'Mumbai, India', mode: 'Air', carrier: 'Qatar Airways Cargo', trackingNo: 'QR901234567', status: 'In Transit', weight: '1680 kg', shipDate: '2026-01-10', eta: '2026-01-13', timeline: [
      { date: '2026-01-10', event: 'Shipment Created', completed: true },
      { date: '2026-01-10', event: 'Picked Up', completed: true },
      { date: '2026-01-11', event: 'Departed Origin', completed: true },
      { date: '2026-01-13', event: 'Arrive at Destination', completed: false },
      { date: '2026-01-13', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5695', orderId: 'PO-5014', destination: 'Bangalore, India', origin: 'London, UK', mode: 'Air', carrier: 'British Airways Cargo', trackingNo: 'BA456789012', status: 'Delivered', weight: '890 kg', shipDate: '2026-01-10', eta: '2026-01-13', timeline: [
      { date: '2026-01-10', event: 'Shipment Created', completed: true },
      { date: '2026-01-10', event: 'Picked Up', completed: true },
      { date: '2026-01-11', event: 'Departed Origin', completed: true },
      { date: '2026-01-13', event: 'Arrive at Destination', completed: true },
      { date: '2026-01-13', event: 'Delivered', completed: true },
    ]},
    { id: 'SH-5696', orderId: 'SO-1254', destination: 'Helsinki, Finland', origin: 'Chennai, India', mode: 'Sea', carrier: 'Evergreen Marine', trackingNo: 'EMC012345678', status: 'Departed', weight: '1290 kg', shipDate: '2026-01-11', eta: '2026-01-25', timeline: [
      { date: '2026-01-11', event: 'Shipment Created', completed: true },
      { date: '2026-01-11', event: 'Loaded on Vessel', completed: true },
      { date: '2026-01-13', event: 'Departed Port', completed: true },
      { date: '2026-01-25', event: 'Arrive at Port', completed: false },
      { date: '2026-01-26', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5697', orderId: 'PO-5017', destination: 'Delhi, India', origin: 'Sao Paulo, Brazil', mode: 'Air', carrier: 'LATAM Cargo', trackingNo: 'LA678901234', status: 'In Transit', weight: '1140 kg', shipDate: '2026-01-07', eta: '2026-01-11', timeline: [
      { date: '2026-01-07', event: 'Shipment Created', completed: true },
      { date: '2026-01-07', event: 'Picked Up', completed: true },
      { date: '2026-01-08', event: 'Departed Origin', completed: true },
      { date: '2026-01-11', event: 'Arrive at Destination', completed: false },
      { date: '2026-01-11', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5698', orderId: 'PO-5018', destination: 'Pune, India', origin: 'Sydney, Australia', mode: 'Sea', carrier: 'ANL Container Line', trackingNo: 'ANL234567890', status: 'In Transit', weight: '1750 kg', shipDate: '2026-01-15', eta: '2026-01-29', timeline: [
      { date: '2026-01-15', event: 'Shipment Created', completed: true },
      { date: '2026-01-15', event: 'Loaded on Vessel', completed: true },
      { date: '2026-01-17', event: 'Departed Port', completed: true },
      { date: '2026-01-29', event: 'Arrive at Port', completed: false },
      { date: '2026-01-30', event: 'Customs Clearance', completed: false },
      { date: '2026-01-31', event: 'Delivered', completed: false },
    ]},
    { id: 'SH-5699', orderId: 'SO-1256', destination: 'Mexico City, Mexico', origin: 'Ahmedabad, India', mode: 'Air', carrier: 'AeroMexico Cargo', trackingNo: 'AM890123456', status: 'Pending', weight: '630 kg', shipDate: '2026-01-15', eta: '2026-01-18', timeline: [
      { date: '2026-01-15', event: 'Shipment Created', completed: true },
      { date: '2026-01-15', event: 'Awaiting Pickup', completed: false },
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

  // PDF Generation Function
  const downloadShipmentPDF = (shipment) => {
    const doc = new jsPDF()
    
    // Header
    doc.setFillColor(16, 185, 129)
    doc.rect(0, 0, 210, 40, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.text('SHIPMENT DOCUMENT', 105, 20, { align: 'center' })
    doc.setFontSize(12)
    doc.text('Tracking & Transit Information', 105, 30, { align: 'center' })
    
    // Reset text color
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    
    // Shipment Info
    doc.text(`Shipment ID: ${shipment.id}`, 20, 55)
    doc.text(`Order ID: ${shipment.orderId}`, 20, 62)
    doc.text(`Status: ${shipment.status}`, 20, 69)
    doc.text(`Tracking No: ${shipment.trackingNo}`, 20, 76)
    
    // Origin & Destination
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text('Shipping Details', 20, 90)
    doc.setFont(undefined, 'normal')
    doc.setFontSize(10)
    doc.text(`Origin: ${shipment.origin}`, 20, 98)
    doc.text(`Destination: ${shipment.destination}`, 20, 105)
    doc.text(`Mode: ${shipment.mode}`, 20, 112)
    doc.text(`Carrier: ${shipment.carrier}`, 20, 119)
    doc.text(`Weight: ${shipment.weight}`, 20, 126)
    
    // Dates
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text('Schedule', 110, 90)
    doc.setFont(undefined, 'normal')
    doc.setFontSize(10)
    doc.text(`Ship Date: ${shipment.shipDate}`, 110, 98)
    doc.text(`ETA: ${shipment.eta}`, 110, 105)
    
    // Timeline Table
    if (shipment.timeline) {
      const timelineData = shipment.timeline.map(event => [
        event.date,
        event.event,
        event.completed ? 'Completed' : 'Pending'
      ])
      
      doc.autoTable({
        startY: 140,
        head: [['Date', 'Event', 'Status']],
        body: timelineData,
        theme: 'grid',
        headStyles: { fillColor: [16, 185, 129] }
      })
    }
    
    // Footer
    doc.setFontSize(9)
    doc.text('Shipment Tracking Document', 105, 280, { align: 'center' })
    
    doc.save(`Shipment_${shipment.id}.pdf`)
  }

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Shipment ID', 'Order ID', 'Origin', 'Destination', 'Mode', 'Carrier', 'Tracking No', 'Weight', 'Status', 'Ship Date', 'ETA']
    const csvData = shipments.map(shipment => [
      shipment.id,
      shipment.orderId,
      shipment.origin,
      shipment.destination,
      shipment.mode,
      shipment.carrier,
      shipment.trackingNo,
      shipment.weight,
      shipment.status,
      shipment.shipDate,
      shipment.eta
    ])
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `shipments_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
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
        <div className="flex space-x-3">
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            <FiDownload />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
          >
            <FiPlus />
            <span>Create Shipment</span>
          </button>
        </div>
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

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => setViewModal(shipment)}
                className="flex-1 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
              >
                <FiEye />
                <span>View Timeline</span>
              </button>
              <button
                onClick={() => downloadShipmentPDF(shipment)}
                className="flex-1 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
              >
                <FiDownload />
                <span>Download PDF</span>
              </button>
            </div>
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
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => downloadShipmentPDF(viewModal)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <FiDownload />
                  <span>Download PDF</span>
                </button>
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
