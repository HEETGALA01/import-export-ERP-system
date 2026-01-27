import React, { useState } from 'react'
import { FiPlus, FiDownload, FiEye, FiFile, FiUpload, FiX, FiAlertTriangle, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const Documents = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [viewModal, setViewModal] = useState(null)
  const [uploadFile, setUploadFile] = useState(null)

  const downloadDocumentPDF = (doc) => {
    const pdf = new jsPDF()
    
    // Header
    pdf.setFontSize(18)
    pdf.setTextColor(37, 99, 235)
    pdf.text(doc.type.toUpperCase(), 105, 20, { align: 'center' })
    
    // Document Info
    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0)
    pdf.text(`Document No: ${doc.docNumber}`, 20, 35)
    pdf.text(`Order ID: ${doc.orderId}`, 20, 40)
    pdf.text(`Issue Date: ${doc.issueDate}`, 20, 45)
    pdf.text(`Valid Until: ${doc.validityDate}`, 20, 50)
    pdf.text(`Status: ${doc.status}`, 140, 35)
    
    // Line
    pdf.setDrawColor(200, 200, 200)
    pdf.line(20, 55, 190, 55)
    
    // Exporter & Importer
    pdf.setFontSize(11)
    pdf.setFont(undefined, 'bold')
    pdf.text('EXPORTER', 20, 65)
    pdf.setFont(undefined, 'normal')
    pdf.setFontSize(9)
    pdf.text(doc.exporter, 20, 71)
    pdf.text(doc.exporterAddress, 20, 76, { maxWidth: 80 })
    
    pdf.setFontSize(11)
    pdf.setFont(undefined, 'bold')
    pdf.text('IMPORTER', 110, 65)
    pdf.setFont(undefined, 'normal')
    pdf.setFontSize(9)
    pdf.text(doc.importer, 110, 71)
    pdf.text(doc.importerAddress, 110, 76, { maxWidth: 80 })
    
    // Product Details Table
    pdf.autoTable({
      startY: 90,
      head: [['Description', 'HS Code', 'Quantity', 'Unit', 'Value']],
      body: [[
        doc.productDescription,
        doc.hsCode,
        doc.quantity,
        doc.unit,
        `${doc.currency} ${doc.invoiceValue.toLocaleString()}`
      ]],
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] }
    })
    
    // Shipping Details
    let currentY = pdf.lastAutoTable.finalY + 10
    pdf.setFontSize(11)
    pdf.setFont(undefined, 'bold')
    pdf.text('SHIPPING DETAILS', 20, currentY)
    
    pdf.autoTable({
      startY: currentY + 5,
      body: [
        ['Incoterm:', doc.incoterm],
        ['Shipping Mode:', doc.shippingMode],
        ['Port of Loading:', doc.portLoading],
        ['Port of Discharge:', doc.portDischarge],
        ['Origin Country:', doc.originCountry],
        ['Destination Country:', doc.destinationCountry],
        ['Gross Weight:', `${doc.grossWeight} kg`],
        ['Net Weight:', `${doc.netWeight} kg`]
      ],
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 2 }
    })
    
    // Footer
    pdf.setFontSize(8)
    pdf.setTextColor(128, 128, 128)
    pdf.text('This is a computer generated document', 105, 280, { align: 'center' })
    
    pdf.save(`${doc.docNumber}.pdf`)
  }

  const [documents, setDocuments] = useState([
    { 
      id: 1, 
      type: 'Commercial Invoice', 
      docNumber: 'CI-2026-001', 
      orderId: 'SO-1234', 
      exporter: 'Global Exports Ltd', 
      importer: 'ABC Corporation',
      exporterAddress: '123 Export Plaza, Mumbai 400001, India',
      importerAddress: '456 Business Ave, New York, NY 10001, USA',
      hsCode: '8471.30.00',
      productDescription: 'Laptop Computer - Intel Core i7',
      quantity: 500,
      unit: 'Units',
      invoiceValue: 450000,
      currency: 'USD',
      incoterm: 'FOB',
      originCountry: 'India',
      destinationCountry: 'USA',
      portLoading: 'INNSA - Nhava Sheva',
      portDischarge: 'USNYC - New York',
      shippingMode: 'Sea',
      grossWeight: 2500,
      netWeight: 2300,
      issueDate: '2026-01-15',
      validityDate: '2026-02-15',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 2, 
      type: 'Bill of Lading', 
      docNumber: 'BOL-2026-001', 
      orderId: 'SO-1234', 
      exporter: 'Global Exports Ltd',
      importer: 'ABC Corporation',
      exporterAddress: '123 Export Plaza, Mumbai 400001, India',
      importerAddress: '456 Business Ave, New York, NY 10001, USA',
      hsCode: '8471.30.00',
      productDescription: 'Laptop Computer - Intel Core i7',
      quantity: 500,
      unit: 'Units',
      invoiceValue: 450000,
      currency: 'USD',
      incoterm: 'FOB',
      originCountry: 'India',
      destinationCountry: 'USA',
      portLoading: 'INNSA - Nhava Sheva',
      portDischarge: 'USNYC - New York',
      shippingMode: 'Sea',
      grossWeight: 2500,
      netWeight: 2300,
      carrier: 'Maersk Line',
      vesselName: 'MAERSK EDINBURGH',
      voyageNumber: 'VOY-2026-45',
      issueDate: '2026-01-18',
      validityDate: '2026-03-18',
      status: 'Issued',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 3, 
      type: 'Certificate of Origin', 
      docNumber: 'COO-2026-001', 
      orderId: 'SO-1235', 
      exporter: 'Tech Manufacturing Inc',
      importer: 'European Distributors GmbH',
      exporterAddress: '789 Tech Park, Bangalore 560001, India',
      importerAddress: '321 Europa Str, Berlin 10115, Germany',
      hsCode: '', // Missing - for validation demo
      productDescription: 'Electronic Components - Capacitors',
      quantity: 10000,
      unit: 'Pieces',
      invoiceValue: 75000,
      currency: 'EUR',
      incoterm: 'CIF',
      originCountry: 'India',
      destinationCountry: 'Germany',
      portLoading: 'INBLR - Bangalore Airport',
      portDischarge: 'DEBER - Berlin Airport',
      shippingMode: 'Air',
      grossWeight: 850,
      netWeight: 800,
      issueDate: '2026-01-16',
      validityDate: '2026-02-16',
      status: 'Pending',
      validation: { hsCode: 'missing', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 4, 
      type: 'Commercial Invoice', 
      docNumber: 'CI-2026-002', 
      orderId: 'PO-5001', 
      exporter: 'Asia Import Co',
      importer: 'American Retailers LLC',
      exporterAddress: '555 Trade Center, Shanghai 200000, China',
      importerAddress: '888 Retail Blvd, Los Angeles, CA 90001, USA',
      hsCode: '6204.62.40',
      productDescription: 'Women Cotton Trousers',
      quantity: 5000,
      unit: 'Pieces',
      invoiceValue: 125000,
      currency: 'CNY', // Currency mismatch for demo
      incoterm: 'EXW',
      originCountry: 'China',
      destinationCountry: 'USA',
      portLoading: 'CNSHA - Shanghai',
      portDischarge: 'USLAX - Los Angeles',
      shippingMode: 'Sea',
      grossWeight: 1500,
      netWeight: 1400,
      issueDate: '2026-01-10',
      validityDate: '2026-02-10',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'mismatch', currency: 'inconsistent' }
    },
    { 
      id: 5, 
      type: 'Packing List', 
      docNumber: 'PL-2026-001', 
      orderId: 'SO-1238', 
      exporter: 'Pacific Electronics Ltd',
      importer: 'Australian Tech Imports',
      exporterAddress: '88 Tech Hub, Hyderabad 500032, India',
      importerAddress: '99 Commerce St, Sydney 2000, Australia',
      hsCode: '8471.50.00',
      productDescription: 'Desktop Computers - AMD Ryzen',
      quantity: 650,
      unit: 'Units',
      invoiceValue: 520000,
      currency: 'AUD',
      incoterm: 'CIF',
      originCountry: 'India',
      destinationCountry: 'Australia',
      portLoading: 'INBLR - Bangalore Airport',
      portDischarge: 'AUSYD - Sydney Airport',
      shippingMode: 'Air',
      grossWeight: 3200,
      netWeight: 3000,
      issueDate: '2026-01-12',
      validityDate: '2026-02-12',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 6, 
      type: 'Commercial Invoice', 
      docNumber: 'CI-2026-003', 
      orderId: 'SO-1240', 
      exporter: 'India Manufacturing Hub',
      importer: 'Singapore Industrial Co',
      exporterAddress: '45 Industrial Area, Delhi 110001, India',
      importerAddress: '12 Marina Bay, Singapore 018982',
      hsCode: '8483.40.90',
      productDescription: 'Gears and Gearing - Industrial',
      quantity: 280,
      unit: 'Units',
      invoiceValue: 840000,
      currency: 'SGD',
      incoterm: 'FOB',
      originCountry: 'India',
      destinationCountry: 'Singapore',
      portLoading: 'INDEL - Delhi Airport',
      portDischarge: 'SGSIN - Singapore Port',
      shippingMode: 'Sea',
      grossWeight: 1850,
      netWeight: 1700,
      issueDate: '2026-01-10',
      validityDate: '2026-02-10',
      status: 'Issued',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 7, 
      type: 'Certificate of Origin', 
      docNumber: 'COO-2026-002', 
      orderId: 'SO-1241', 
      exporter: 'Arabian Exports India',
      importer: 'UAE Distribution Networks',
      exporterAddress: '77 Export Zone, Mumbai 400050, India',
      importerAddress: '33 Sheikh Zayed Rd, Dubai 00000, UAE',
      hsCode: '6109.10.00',
      productDescription: 'T-Shirts - Cotton Knitted',
      quantity: 8200,
      unit: 'Pieces',
      invoiceValue: 164000,
      currency: 'AED',
      incoterm: 'DAP',
      originCountry: 'India',
      destinationCountry: 'UAE',
      portLoading: 'INBOM - Mumbai Port',
      portDischarge: 'AEDXB - Dubai Port',
      shippingMode: 'Land',
      grossWeight: 550,
      netWeight: 500,
      issueDate: '2026-01-14',
      validityDate: '2026-02-14',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 8, 
      type: 'Bill of Lading', 
      docNumber: 'BOL-2026-002', 
      orderId: 'PO-5005', 
      exporter: 'Korea Industrial Corp',
      importer: 'Chennai Electronics Ltd',
      exporterAddress: '123 Seoul Industrial Park, Seoul 04524, South Korea',
      importerAddress: '56 IT Highway, Chennai 600032, India',
      hsCode: '8542.32.00',
      productDescription: 'Electronic Integrated Circuits',
      quantity: 850,
      unit: 'Units',
      invoiceValue: 510000,
      currency: 'KRW',
      incoterm: 'CIF',
      originCountry: 'South Korea',
      destinationCountry: 'India',
      portLoading: 'KRINC - Incheon Port',
      portDischarge: 'INMAA - Chennai Port',
      shippingMode: 'Air',
      grossWeight: 680,
      netWeight: 620,
      carrier: 'Korean Air Cargo',
      vesselName: 'KAL FLIGHT 567',
      voyageNumber: 'VOY-2026-78',
      issueDate: '2026-01-20',
      validityDate: '2026-03-20',
      status: 'Issued',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 9, 
      type: 'Packing List', 
      docNumber: 'PL-2026-002', 
      orderId: 'PO-5007', 
      exporter: 'Taiwan Semiconductor',
      importer: 'Bangalore Tech Industries',
      exporterAddress: '88 Hsinchu Science Park, Hsinchu 300, Taiwan',
      importerAddress: '22 Electronics City, Bangalore 560100, India',
      hsCode: '8541.40.00',
      productDescription: 'LED Semiconductor Devices',
      quantity: 600,
      unit: 'Units',
      invoiceValue: 720000,
      currency: 'TWD',
      incoterm: 'EXW',
      originCountry: 'Taiwan',
      destinationCountry: 'India',
      portLoading: 'TWTPE - Taipei Airport',
      portDischarge: 'INBLR - Bangalore Airport',
      shippingMode: 'Air',
      grossWeight: 390,
      netWeight: 360,
      issueDate: '2026-01-13',
      validityDate: '2026-02-13',
      status: 'Pending',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 10, 
      type: 'Commercial Invoice', 
      docNumber: 'CI-2026-004', 
      orderId: 'SO-1239', 
      exporter: 'Nordic Exports India',
      importer: 'Norwegian Industrial Supplies',
      exporterAddress: '44 Trade Complex, Pune 411001, India',
      importerAddress: '66 Oslo Business Park, Oslo 0150, Norway',
      hsCode: '7326.90.90',
      productDescription: 'Iron and Steel Articles',
      quantity: 400,
      unit: 'Units',
      invoiceValue: 280000,
      currency: 'NOK',
      incoterm: 'FOB',
      originCountry: 'India',
      destinationCountry: 'Norway',
      portLoading: 'INPNQ - Pune Airport',
      portDischarge: 'NOOSL - Oslo Airport',
      shippingMode: 'Sea',
      grossWeight: 2400,
      netWeight: 2200,
      issueDate: '2026-01-14',
      validityDate: '2026-02-14',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 11, 
      type: 'Certificate of Origin', 
      docNumber: 'COO-2026-003', 
      orderId: 'PO-5006', 
      exporter: 'Vietnam Textiles Co',
      importer: 'Indian Fashion Imports',
      exporterAddress: '99 Hanoi Industrial Zone, Hanoi 10000, Vietnam',
      importerAddress: '77 Garment District, Mumbai 400001, India',
      hsCode: '5407.52.00',
      productDescription: 'Polyester Woven Fabric',
      quantity: 1200,
      unit: 'Meters',
      invoiceValue: 96000,
      currency: 'VND',
      incoterm: 'CIF',
      originCountry: 'Vietnam',
      destinationCountry: 'India',
      portLoading: 'VNHAN - Hanoi Port',
      portDischarge: 'INBOM - Mumbai Port',
      shippingMode: 'Sea',
      grossWeight: 1800,
      netWeight: 1650,
      issueDate: '2026-01-09',
      validityDate: '2026-02-09',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 12, 
      type: 'Bill of Lading', 
      docNumber: 'BOL-2026-003', 
      orderId: 'SO-1242', 
      exporter: 'Swiss Precision Exports India',
      importer: 'Alpine Pharmaceuticals AG',
      exporterAddress: '33 Pharma Park, Ahmedabad 380001, India',
      importerAddress: '11 Zurich Medical Complex, Zurich 8001, Switzerland',
      hsCode: '3004.90.90',
      productDescription: 'Pharmaceutical Products - Mixed',
      quantity: 550,
      unit: 'Units',
      invoiceValue: 825000,
      currency: 'CHF',
      incoterm: 'DDP',
      originCountry: 'India',
      destinationCountry: 'Switzerland',
      portLoading: 'INAMD - Ahmedabad Airport',
      portDischarge: 'CHZRH - Zurich Airport',
      shippingMode: 'Air',
      grossWeight: 420,
      netWeight: 390,
      carrier: 'Swiss WorldCargo',
      vesselName: 'SWISS FLIGHT 890',
      voyageNumber: 'VOY-2026-12',
      issueDate: '2026-01-13',
      validityDate: '2026-03-13',
      status: 'Issued',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 13, 
      type: 'Customs Declaration', 
      docNumber: 'CD-2026-001', 
      orderId: 'PO-5009', 
      exporter: 'Turkey Chemical Suppliers',
      importer: 'Indian Chemical Industries',
      exporterAddress: '55 Istanbul Industrial Park, Istanbul 34000, Turkey',
      importerAddress: '88 Chemical Zone, Vadodara 390001, India',
      hsCode: '2917.35.00',
      productDescription: 'Phthalic Anhydride',
      quantity: 900,
      unit: 'Kg',
      invoiceValue: 135000,
      currency: 'TRY',
      incoterm: 'CIF',
      originCountry: 'Turkey',
      destinationCountry: 'India',
      portLoading: 'TRIST - Istanbul Port',
      portDischarge: 'INVDZ - Vadodara Port',
      shippingMode: 'Sea',
      grossWeight: 950,
      netWeight: 900,
      issueDate: '2026-01-07',
      validityDate: '2026-02-07',
      status: 'Pending',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 14, 
      type: 'Commercial Invoice', 
      docNumber: 'CI-2026-005', 
      orderId: 'PO-5008', 
      exporter: 'Malaysia Industrial Equipment',
      importer: 'Chennai Manufacturing Ltd',
      exporterAddress: '22 Kuala Lumpur Industrial Area, KL 50000, Malaysia',
      importerAddress: '44 Industrial Estate, Chennai 600058, India',
      hsCode: '8479.89.90',
      productDescription: 'Industrial Machinery - Mixed',
      quantity: 400,
      unit: 'Units',
      invoiceValue: 600000,
      currency: 'MYR',
      incoterm: 'FOB',
      originCountry: 'Malaysia',
      destinationCountry: 'India',
      portLoading: 'MYKUL - Kuala Lumpur Port',
      portDischarge: 'INMAA - Chennai Port',
      shippingMode: 'Sea',
      grossWeight: 2800,
      netWeight: 2600,
      issueDate: '2026-01-14',
      validityDate: '2026-02-14',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 15, 
      type: 'Packing List', 
      docNumber: 'PL-2026-003', 
      orderId: 'SO-1243', 
      exporter: 'Dutch Trade India',
      importer: 'Netherlands Import Corp',
      exporterAddress: '55 Export Hub, Delhi 110005, India',
      importerAddress: '88 Dam Square, Amsterdam 1012, Netherlands',
      hsCode: '8528.72.00',
      productDescription: 'LED Television Sets',
      quantity: 720,
      unit: 'Units',
      invoiceValue: 864000,
      currency: 'EUR',
      incoterm: 'FOB',
      originCountry: 'India',
      destinationCountry: 'Netherlands',
      portLoading: 'INDEL - Delhi Airport',
      portDischarge: 'NLAMS - Amsterdam Port',
      shippingMode: 'Sea',
      grossWeight: 1640,
      netWeight: 1500,
      issueDate: '2026-01-09',
      validityDate: '2026-02-09',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 16, 
      type: 'Commercial Invoice', 
      docNumber: 'CI-2026-006', 
      orderId: 'SO-1245', 
      exporter: 'Swedish Solutions India',
      importer: 'Industrial AB Stockholm',
      exporterAddress: '77 Tech Zone, Bangalore 560100, India',
      importerAddress: '22 Storgatan, Stockholm 11151, Sweden',
      hsCode: '8481.80.90',
      productDescription: 'Industrial Valves',
      quantity: 310,
      unit: 'Units',
      invoiceValue: 372000,
      currency: 'SEK',
      incoterm: 'CIF',
      originCountry: 'India',
      destinationCountry: 'Sweden',
      portLoading: 'INBLR - Bangalore Airport',
      portDischarge: 'SESTO - Stockholm Port',
      shippingMode: 'Sea',
      grossWeight: 1150,
      netWeight: 1050,
      issueDate: '2026-01-14',
      validityDate: '2026-02-14',
      status: 'Issued',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 17, 
      type: 'Bill of Lading', 
      docNumber: 'BOL-2026-004', 
      orderId: 'SO-1246', 
      exporter: 'Kiwi Exports India',
      importer: 'New Zealand Trading Ltd',
      exporterAddress: '33 Business Park, Chennai 600032, India',
      importerAddress: '44 Queen Street, Auckland 1010, New Zealand',
      hsCode: '7213.91.00',
      productDescription: 'Iron and Steel Bars',
      quantity: 620,
      unit: 'Tons',
      invoiceValue: 496000,
      currency: 'NZD',
      incoterm: 'FOB',
      originCountry: 'India',
      destinationCountry: 'New Zealand',
      portLoading: 'INMAA - Chennai Port',
      portDischarge: 'NZAKL - Auckland Port',
      shippingMode: 'Sea',
      grossWeight: 620000,
      netWeight: 600000,
      carrier: 'Pacific Direct Line',
      vesselName: 'PACIFIC FORTUNE',
      voyageNumber: 'VOY-2026-89',
      issueDate: '2026-01-10',
      validityDate: '2026-03-10',
      status: 'Issued',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 18, 
      type: 'Certificate of Origin', 
      docNumber: 'COO-2026-004', 
      orderId: 'SO-1247', 
      exporter: 'Irish Connect India',
      importer: 'Dublin Business Solutions',
      exporterAddress: '99 Export Plaza, Pune 411001, India',
      importerAddress: '11 O Connell Street, Dublin D01, Ireland',
      hsCode: '8517.62.00',
      productDescription: 'Networking Equipment',
      quantity: 480,
      unit: 'Units',
      invoiceValue: 576000,
      currency: 'EUR',
      incoterm: 'DAP',
      originCountry: 'India',
      destinationCountry: 'Ireland',
      portLoading: 'INPNQ - Pune Airport',
      portDischarge: 'IEDUB - Dublin Airport',
      shippingMode: 'Air',
      grossWeight: 520,
      netWeight: 480,
      issueDate: '2026-01-16',
      validityDate: '2026-02-16',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 19, 
      type: 'Customs Declaration', 
      docNumber: 'CD-2026-002', 
      orderId: 'PO-5010', 
      exporter: 'Hong Kong Electronics',
      importer: 'Chennai Tech Imports',
      exporterAddress: '88 Kowloon Bay, Hong Kong',
      importerAddress: '55 IT Corridor, Chennai 600096, India',
      hsCode: '8473.30.00',
      productDescription: 'Computer Accessories',
      quantity: 1250,
      unit: 'Units',
      invoiceValue: 250000,
      currency: 'HKD',
      incoterm: 'FOB',
      originCountry: 'Hong Kong',
      destinationCountry: 'India',
      portLoading: 'HKHKG - Hong Kong Port',
      portDischarge: 'INMAA - Chennai Port',
      shippingMode: 'Air',
      grossWeight: 920,
      netWeight: 850,
      issueDate: '2026-01-08',
      validityDate: '2026-02-08',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 20, 
      type: 'Packing List', 
      docNumber: 'PL-2026-004', 
      orderId: 'SO-1248', 
      exporter: 'Danish Quality India',
      importer: 'Copenhagen Trading AS',
      exporterAddress: '22 Industrial Area, Hyderabad 500032, India',
      importerAddress: '33 Nyhavn, Copenhagen 1051, Denmark',
      hsCode: '8418.50.00',
      productDescription: 'Refrigeration Equipment',
      quantity: 390,
      unit: 'Units',
      invoiceValue: 585000,
      currency: 'DKK',
      incoterm: 'CIF',
      originCountry: 'India',
      destinationCountry: 'Denmark',
      portLoading: 'INHYD - Hyderabad Airport',
      portDischarge: 'DKCPH - Copenhagen Port',
      shippingMode: 'Sea',
      grossWeight: 1420,
      netWeight: 1300,
      issueDate: '2026-01-12',
      validityDate: '2026-02-12',
      status: 'Issued',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 21, 
      type: 'Commercial Invoice', 
      docNumber: 'CI-2026-007', 
      orderId: 'SO-1250', 
      exporter: 'Egyptian Trade India',
      importer: 'Cairo Industrial Group',
      exporterAddress: '66 Export Zone, Ahmedabad 380001, India',
      importerAddress: '77 Tahrir Square, Cairo 11511, Egypt',
      hsCode: '8544.42.00',
      productDescription: 'Electric Cables',
      quantity: 670,
      unit: 'Meters',
      invoiceValue: 201000,
      currency: 'EGP',
      incoterm: 'FOB',
      originCountry: 'India',
      destinationCountry: 'Egypt',
      portLoading: 'INAMD - Ahmedabad Airport',
      portDischarge: 'EGCAI - Cairo Airport',
      shippingMode: 'Sea',
      grossWeight: 1580,
      netWeight: 1450,
      issueDate: '2026-01-10',
      validityDate: '2026-02-10',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 22, 
      type: 'Bill of Lading', 
      docNumber: 'BOL-2026-005', 
      orderId: 'SO-1251', 
      exporter: 'Saudi Connect India',
      importer: 'Riyadh Trading House',
      exporterAddress: '44 Trade Hub, Delhi 110001, India',
      importerAddress: '55 King Fahd Road, Riyadh 11564, Saudi Arabia',
      hsCode: '8525.80.00',
      productDescription: 'Digital Cameras',
      quantity: 920,
      unit: 'Units',
      invoiceValue: 1104000,
      currency: 'SAR',
      incoterm: 'CIF',
      originCountry: 'India',
      destinationCountry: 'Saudi Arabia',
      portLoading: 'INDEL - Delhi Airport',
      portDischarge: 'SARUH - Riyadh Airport',
      shippingMode: 'Air',
      grossWeight: 1320,
      netWeight: 1200,
      carrier: 'Saudia Cargo',
      vesselName: 'SAUDIA FLIGHT 345',
      voyageNumber: 'VOY-2026-56',
      issueDate: '2026-01-09',
      validityDate: '2026-03-09',
      status: 'Issued',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 23, 
      type: 'Certificate of Origin', 
      docNumber: 'COO-2026-005', 
      orderId: 'SO-1252', 
      exporter: 'Qatar Export India',
      importer: 'Doha Business Group',
      exporterAddress: '88 Commercial Complex, Mumbai 400001, India',
      importerAddress: '99 Corniche Road, Doha 00000, Qatar',
      hsCode: '8471.30.00',
      productDescription: 'Desktop Computers',
      quantity: 1100,
      unit: 'Units',
      invoiceValue: 1650000,
      currency: 'QAR',
      incoterm: 'DAP',
      originCountry: 'India',
      destinationCountry: 'Qatar',
      portLoading: 'INBOM - Mumbai Airport',
      portDischarge: 'QADOH - Doha Airport',
      shippingMode: 'Air',
      grossWeight: 1680,
      netWeight: 1550,
      issueDate: '2026-01-10',
      validityDate: '2026-02-10',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 24, 
      type: 'Packing List', 
      docNumber: 'PL-2026-005', 
      orderId: 'SO-1253', 
      exporter: 'Belgian Trade India',
      importer: 'Brussels Distributors',
      exporterAddress: '11 Export Center, Kolkata 700001, India',
      importerAddress: '22 Grand Place, Brussels 1000, Belgium',
      hsCode: '5407.61.00',
      productDescription: 'Polyester Fabric',
      quantity: 430,
      unit: 'Meters',
      invoiceValue: 85000,
      currency: 'EUR',
      incoterm: 'FOB',
      originCountry: 'India',
      destinationCountry: 'Belgium',
      portLoading: 'INCCU - Kolkata Port',
      portDischarge: 'BEBRU - Brussels Airport',
      shippingMode: 'Sea',
      grossWeight: 620,
      netWeight: 580,
      issueDate: '2026-01-15',
      validityDate: '2026-02-15',
      status: 'Pending',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 25, 
      type: 'Commercial Invoice', 
      docNumber: 'CI-2026-008', 
      orderId: 'SO-1254', 
      exporter: 'Finnish Solutions India',
      importer: 'Helsinki Import Services',
      exporterAddress: '33 Tech Park, Bangalore 560100, India',
      importerAddress: '44 Senate Square, Helsinki 00100, Finland',
      hsCode: '7318.15.00',
      productDescription: 'Steel Bolts and Screws',
      quantity: 580,
      unit: 'Kg',
      invoiceValue: 174000,
      currency: 'EUR',
      incoterm: 'CIF',
      originCountry: 'India',
      destinationCountry: 'Finland',
      portLoading: 'INBLR - Bangalore Airport',
      portDischarge: 'FIHEL - Helsinki Port',
      shippingMode: 'Sea',
      grossWeight: 1290,
      netWeight: 1200,
      issueDate: '2026-01-09',
      validityDate: '2026-02-09',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 26, 
      type: 'Bill of Lading', 
      docNumber: 'BOL-2026-006', 
      orderId: 'PO-5013', 
      exporter: 'German Tools GmbH',
      importer: 'Mumbai Industrial Ltd',
      exporterAddress: '55 Industrial Park, Munich 80331, Germany',
      importerAddress: '66 MIDC Area, Mumbai 400070, India',
      hsCode: '8207.30.00',
      productDescription: 'Metal Forming Tools',
      quantity: 520,
      unit: 'Units',
      invoiceValue: 832000,
      currency: 'EUR',
      incoterm: 'DAP',
      originCountry: 'Germany',
      destinationCountry: 'India',
      portLoading: 'DEMUC - Munich Airport',
      portDischarge: 'INBOM - Mumbai Port',
      shippingMode: 'Sea',
      grossWeight: 2150,
      netWeight: 2000,
      carrier: 'Hamburg Sud',
      vesselName: 'HAMBURG EXPRESS',
      voyageNumber: 'VOY-2026-78',
      issueDate: '2026-01-12',
      validityDate: '2026-03-12',
      status: 'Issued',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 27, 
      type: 'Customs Declaration', 
      docNumber: 'CD-2026-003', 
      orderId: 'PO-5014', 
      exporter: 'UK Steel Supplies',
      importer: 'Bangalore Manufacturing',
      exporterAddress: '77 Industrial Estate, London E14 9SH, UK',
      importerAddress: '88 Electronics City, Bangalore 560100, India',
      hsCode: '7210.49.00',
      productDescription: 'Flat Rolled Steel',
      quantity: 780,
      unit: 'Tons',
      invoiceValue: 624000,
      currency: 'GBP',
      incoterm: 'FOB',
      originCountry: 'UK',
      destinationCountry: 'India',
      portLoading: 'GBLON - London Port',
      portDischarge: 'INBLR - Bangalore Port',
      shippingMode: 'Sea',
      grossWeight: 780000,
      netWeight: 750000,
      issueDate: '2026-01-10',
      validityDate: '2026-02-10',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 28, 
      type: 'Certificate of Origin', 
      docNumber: 'COO-2026-006', 
      orderId: 'PO-5016', 
      exporter: 'Spanish Materials SA',
      importer: 'Chennai Construction Ltd',
      exporterAddress: '99 Industrial Zone, Barcelona 08001, Spain',
      importerAddress: '11 Construction Hub, Chennai 600001, India',
      hsCode: '6810.19.00',
      productDescription: 'Concrete Building Blocks',
      quantity: 1150,
      unit: 'Units',
      invoiceValue: 230000,
      currency: 'EUR',
      incoterm: 'CIF',
      originCountry: 'Spain',
      destinationCountry: 'India',
      portLoading: 'ESBCN - Barcelona Port',
      portDischarge: 'INMAA - Chennai Port',
      shippingMode: 'Sea',
      grossWeight: 34500,
      netWeight: 33000,
      issueDate: '2026-01-11',
      validityDate: '2026-02-11',
      status: 'Pending',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 29, 
      type: 'Packing List', 
      docNumber: 'PL-2026-006', 
      orderId: 'PO-5017', 
      exporter: 'Brazilian Agro Exports',
      importer: 'Delhi Food Industries',
      exporterAddress: '22 Farm District, Sao Paulo 01310, Brazil',
      importerAddress: '33 Food Processing Zone, Delhi 110001, India',
      hsCode: '1701.99.00',
      productDescription: 'Refined Sugar',
      quantity: 890,
      unit: 'Tons',
      invoiceValue: 445000,
      currency: 'BRL',
      incoterm: 'FOB',
      originCountry: 'Brazil',
      destinationCountry: 'India',
      portLoading: 'BRSAO - Sao Paulo Port',
      portDischarge: 'INDEL - Delhi Port',
      shippingMode: 'Sea',
      grossWeight: 890000,
      netWeight: 880000,
      issueDate: '2026-01-07',
      validityDate: '2026-02-07',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 30, 
      type: 'Commercial Invoice', 
      docNumber: 'CI-2026-009', 
      orderId: 'PO-5018', 
      exporter: 'Australian Mining Equipment',
      importer: 'Pune Heavy Industries',
      exporterAddress: '44 Mining District, Sydney 2000, Australia',
      importerAddress: '55 Industrial Estate, Pune 411001, India',
      hsCode: '8429.52.00',
      productDescription: 'Mining Machinery',
      quantity: 420,
      unit: 'Units',
      invoiceValue: 2100000,
      currency: 'AUD',
      incoterm: 'DAP',
      originCountry: 'Australia',
      destinationCountry: 'India',
      portLoading: 'AUSYD - Sydney Port',
      portDischarge: 'INPNQ - Pune Port',
      shippingMode: 'Sea',
      grossWeight: 1750,
      netWeight: 1650,
      issueDate: '2026-01-15',
      validityDate: '2026-02-15',
      status: 'Issued',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 31, 
      type: 'Bill of Lading', 
      docNumber: 'BOL-2026-007', 
      orderId: 'PO-5019', 
      exporter: 'Canadian Lumber Corp',
      importer: 'Bangalore Wood Industries',
      exporterAddress: '66 Forest Zone, Vancouver V6B 1A1, Canada',
      importerAddress: '77 Timber Market, Bangalore 560001, India',
      hsCode: '4407.11.00',
      productDescription: 'Softwood Lumber',
      quantity: 1320,
      unit: 'Cubic Meters',
      invoiceValue: 792000,
      currency: 'CAD',
      incoterm: 'CIF',
      originCountry: 'Canada',
      destinationCountry: 'India',
      portLoading: 'CAVAN - Vancouver Port',
      portDischarge: 'INBLR - Bangalore Port',
      shippingMode: 'Sea',
      grossWeight: 660000,
      netWeight: 650000,
      carrier: 'Pacific Shipping Line',
      vesselName: 'PACIFIC STAR',
      voyageNumber: 'VOY-2026-91',
      issueDate: '2026-01-17',
      validityDate: '2026-03-17',
      status: 'Issued',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 32, 
      type: 'Customs Declaration', 
      docNumber: 'CD-2026-004', 
      orderId: 'PO-5020', 
      exporter: 'South African Mining',
      importer: 'Ahmedabad Metal Works',
      exporterAddress: '88 Mining Complex, Johannesburg 2000, South Africa',
      importerAddress: '99 Metal Zone, Ahmedabad 380001, India',
      hsCode: '7403.11.00',
      productDescription: 'Copper Cathodes',
      quantity: 980,
      unit: 'Tons',
      invoiceValue: 4900000,
      currency: 'ZAR',
      incoterm: 'FOB',
      originCountry: 'South Africa',
      destinationCountry: 'India',
      portLoading: 'ZAJNB - Johannesburg Airport',
      portDischarge: 'INAMD - Ahmedabad Port',
      shippingMode: 'Sea',
      grossWeight: 980000,
      netWeight: 970000,
      issueDate: '2026-01-09',
      validityDate: '2026-02-09',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 33, 
      type: 'Certificate of Origin', 
      docNumber: 'COO-2026-007', 
      orderId: 'PO-5022', 
      exporter: 'Pakistani Textile Mills',
      importer: 'Surat Garment Industries',
      exporterAddress: '11 Textile City, Karachi 75300, Pakistan',
      importerAddress: '22 Textile Market, Surat 395001, India',
      hsCode: '5208.31.00',
      productDescription: 'Cotton Fabric - Dyed',
      quantity: 1560,
      unit: 'Meters',
      invoiceValue: 234000,
      currency: 'PKR',
      incoterm: 'FOB',
      originCountry: 'Pakistan',
      destinationCountry: 'India',
      portLoading: 'PKKHI - Karachi Port',
      portDischarge: 'INSRT - Surat Port',
      shippingMode: 'Sea',
      grossWeight: 2800,
      netWeight: 2700,
      issueDate: '2026-01-14',
      validityDate: '2026-02-14',
      status: 'Approved',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
    { 
      id: 34, 
      type: 'Packing List', 
      docNumber: 'PL-2026-007', 
      orderId: 'SO-1256', 
      exporter: 'Mexican Connect India',
      importer: 'Mexico City Imports SA',
      exporterAddress: '44 Tech Hub, Ahmedabad 380001, India',
      importerAddress: '55 Reforma Avenue, Mexico City 06600, Mexico',
      hsCode: '8536.69.00',
      productDescription: 'Electrical Plugs and Sockets',
      quantity: 510,
      unit: 'Units',
      invoiceValue: 102000,
      currency: 'MXN',
      incoterm: 'FOB',
      originCountry: 'India',
      destinationCountry: 'Mexico',
      portLoading: 'INAMD - Ahmedabad Airport',
      portDischarge: 'MXMEX - Mexico City Airport',
      shippingMode: 'Air',
      grossWeight: 630,
      netWeight: 580,
      issueDate: '2026-01-15',
      validityDate: '2026-02-15',
      status: 'Pending',
      validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
    },
  ])

  const [formData, setFormData] = useState({
    type: 'Commercial Invoice',
    orderId: '',
    exporter: '',
    importer: '',
    exporterAddress: '',
    importerAddress: '',
    hsCode: '',
    productDescription: '',
    quantity: '',
    unit: 'Units',
    invoiceValue: '',
    currency: 'USD',
    incoterm: 'FOB',
    originCountry: '',
    destinationCountry: '',
    portLoading: '',
    portDischarge: '',
    shippingMode: 'Sea',
    grossWeight: '',
    netWeight: '',
    notes: ''
  })

  const documentTypes = [
    'Commercial Invoice',
    'Packing List',
    'Bill of Lading',
    'Certificate of Origin',
    'Customs Declaration'
  ]

  const incotermOptions = ['FOB', 'CIF', 'EXW', 'DDP', 'FCA', 'CPT', 'DAP']
  const currencyOptions = ['USD', 'EUR', 'GBP', 'CNY', 'INR', 'JPY']
  const shippingModes = ['Sea', 'Air', 'Road', 'Rail']
  const unitOptions = ['Units', 'Pieces', 'Kg', 'Tons', 'Liters', 'Boxes']

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setUploadFile({
        file: file,
        name: file.name,
        type: file.type,
        size: (file.size / 1024).toFixed(2) + ' KB',
        preview: URL.createObjectURL(file)
      })
    }
  }

  const handleUploadSubmit = () => {
    if (uploadFile) {
      // Simulate document upload with auto-extracted fields
      const newDoc = {
        id: documents.length + 1,
        type: 'Commercial Invoice',
        docNumber: `CI-2026-${String(documents.length + 1).padStart(3, '0')}`,
        orderId: 'SO-' + Math.floor(Math.random() * 9000 + 1000),
        exporter: 'Sample Exporter Co.',
        importer: 'Sample Importer Inc.',
        exporterAddress: '123 Sample St, City, Country',
        importerAddress: '456 Import Ave, City, Country',
        hsCode: '1234.56.78',
        productDescription: 'Sample Product',
        quantity: 100,
        unit: 'Units',
        invoiceValue: 50000,
        currency: 'USD',
        incoterm: 'FOB',
        originCountry: 'Country A',
        destinationCountry: 'Country B',
        portLoading: 'PORT-A',
        portDischarge: 'PORT-B',
        shippingMode: 'Sea',
        grossWeight: 500,
        netWeight: 450,
        issueDate: new Date().toISOString().split('T')[0],
        validityDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        status: 'Pending',
        uploadedFile: uploadFile.name,
        validation: { hsCode: 'valid', incoterm: 'valid', currency: 'valid' }
      }
      setDocuments([newDoc, ...documents])
      setUploadFile(null)
      setShowUploadModal(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const prefix = {
      'Commercial Invoice': 'CI',
      'Packing List': 'PL',
      'Bill of Lading': 'BOL',
      'Certificate of Origin': 'COO',
      'Customs Declaration': 'CD'
    }
    
    // Auto-generate validation based on form data
    const validation = {
      hsCode: formData.hsCode ? 'valid' : 'missing',
      incoterm: formData.incoterm ? 'valid' : 'missing',
      currency: formData.currency ? 'valid' : 'missing'
    }
    
    const newDoc = {
      id: documents.length + 1,
      ...formData,
      docNumber: `${prefix[formData.type]}-2026-${String(documents.length + 1).padStart(3, '0')}`,
      issueDate: new Date().toISOString().split('T')[0],
      validityDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      status: 'Pending',
      validation
    }
    setDocuments([newDoc, ...documents])
    setFormData({
      type: 'Commercial Invoice',
      orderId: '',
      exporter: '',
      importer: '',
      exporterAddress: '',
      importerAddress: '',
      hsCode: '',
      productDescription: '',
      quantity: '',
      unit: 'Units',
      invoiceValue: '',
      currency: 'USD',
      incoterm: 'FOB',
      originCountry: '',
      destinationCountry: '',
      portLoading: '',
      portDischarge: '',
      shippingMode: 'Sea',
      grossWeight: '',
      netWeight: '',
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
          <h1 className="text-3xl font-bold text-gray-800">Trade Documents Management</h1>
          <p className="text-gray-600 mt-1">Import-Export Document Intelligence & Management</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            <FiUpload />
            <span>Upload Document</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
          >
            <FiPlus />
            <span>Create Document</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {documentTypes.map((type, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
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
              <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
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

                {/* Validation Indicators */}
                {doc.validation && (
                  <div className="mb-3 space-y-1">
                    {doc.validation.hsCode === 'missing' && (
                      <div className="flex items-center space-x-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                        <FiAlertTriangle className="text-sm" />
                        <span>HS Code Missing</span>
                      </div>
                    )}
                    {doc.validation.incoterm === 'mismatch' && (
                      <div className="flex items-center space-x-1 text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                        <FiAlertCircle className="text-sm" />
                        <span>Incoterm Mismatch</span>
                      </div>
                    )}
                    {doc.validation.currency === 'inconsistent' && (
                      <div className="flex items-center space-x-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                        <FiAlertCircle className="text-sm" />
                        <span>Currency Inconsistency</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order:</span>
                    <span className="font-medium text-gray-800">{doc.orderId}</span>
                  </div>
                  {doc.hsCode && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">HS Code:</span>
                      <span className="font-mono text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{doc.hsCode}</span>
                    </div>
                  )}
                  {doc.incoterm && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Incoterm:</span>
                      <span className="font-semibold text-purple-700">{doc.incoterm}</span>
                    </div>
                  )}
                  {doc.invoiceValue && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Value:</span>
                      <span className="font-semibold text-green-700">{doc.currency} {doc.invoiceValue.toLocaleString()}</span>
                    </div>
                  )}
                  {doc.originCountry && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Route:</span>
                      <span className="text-xs text-gray-800">{doc.originCountry} → {doc.destinationCountry}</span>
                    </div>
                  )}
                  {doc.shippingMode && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Mode:</span>
                      <span className="text-gray-800">{doc.shippingMode}</span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewModal(doc)}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                  >
                    <FiEye />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => downloadDocumentPDF(doc)}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 text-sm bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                  >
                    <FiDownload />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Upload Trade Document</h2>
              <button onClick={() => { setShowUploadModal(false); setUploadFile(null); }} className="text-gray-500 hover:text-gray-700">
                <FiX className="text-2xl" />
              </button>
            </div>
            <div className="p-6">
              {!uploadFile ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <FiUpload className="text-5xl text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">Drop files to upload</p>
                    <p className="text-sm text-gray-500">or click to browse</p>
                    <p className="text-xs text-gray-400 mt-2">Supports PDF and image files</p>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FiFile className="text-2xl text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-800">{uploadFile.name}</p>
                        <p className="text-sm text-gray-600">{uploadFile.size}</p>
                      </div>
                    </div>
                    <button onClick={() => setUploadFile(null)} className="text-red-500 hover:text-red-700">
                      <FiX className="text-xl" />
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2 mb-3">
                      <FiCheckCircle className="text-green-600 text-xl mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-800">Document Intelligence Processing</p>
                        <p className="text-sm text-gray-600 mt-1">Auto-extracting trade document fields...</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700 mt-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>HS Code identified: 8471.30.00</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Incoterm detected: FOB</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Currency: USD</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Trade route: Country A → Country B</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => { setShowUploadModal(false); setUploadFile(null); }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadSubmit}
                  disabled={!uploadFile}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <FiUpload />
                  <span>Upload & Process</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Document Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl my-8">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Create Trade Document</h2>
                <p className="text-sm text-gray-600 mt-1">Fill in export/import document details</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <FiX className="text-2xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                {/* Document Type & Order */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                {/* Parties Section */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Trade Parties</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Exporter *</label>
                      <input
                        type="text"
                        name="exporter"
                        value={formData.exporter}
                        onChange={handleInputChange}
                        required
                        placeholder="Company name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Importer *</label>
                      <input
                        type="text"
                        name="importer"
                        value={formData.importer}
                        onChange={handleInputChange}
                        required
                        placeholder="Company name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Exporter Address</label>
                      <input
                        type="text"
                        name="exporterAddress"
                        value={formData.exporterAddress}
                        onChange={handleInputChange}
                        placeholder="Full address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Importer Address</label>
                      <input
                        type="text"
                        name="importerAddress"
                        value={formData.importerAddress}
                        onChange={handleInputChange}
                        placeholder="Full address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                        <span>HS Code (Harmonized System) *</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Important</span>
                      </label>
                      <input
                        type="text"
                        name="hsCode"
                        value={formData.hsCode}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 8471.30.00"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Description *</label>
                      <textarea
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleInputChange}
                        required
                        placeholder="Detailed product description"
                        rows="2"
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
                        placeholder="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {unitOptions.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Financial Details */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial & Trade Terms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Value *</label>
                      <input
                        type="number"
                        name="invoiceValue"
                        value={formData.invoiceValue}
                        onChange={handleInputChange}
                        required
                        placeholder="50000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                        <span>Currency *</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Important</span>
                      </label>
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {currencyOptions.map(curr => (
                          <option key={curr} value={curr}>{curr}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                        <span>Incoterm *</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Important</span>
                      </label>
                      <select
                        name="incoterm"
                        value={formData.incoterm}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {incotermOptions.map(term => (
                          <option key={term} value={term}>{term}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country of Origin *</label>
                      <input
                        type="text"
                        name="originCountry"
                        value={formData.originCountry}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., India"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Destination Country *</label>
                      <input
                        type="text"
                        name="destinationCountry"
                        value={formData.destinationCountry}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., USA"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Port of Loading *</label>
                      <input
                        type="text"
                        name="portLoading"
                        value={formData.portLoading}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., INNSA - Nhava Sheva"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Port of Discharge *</label>
                      <input
                        type="text"
                        name="portDischarge"
                        value={formData.portDischarge}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., USNYC - New York"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Mode *</label>
                      <select
                        name="shippingMode"
                        value={formData.shippingMode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {shippingModes.map(mode => (
                          <option key={mode} value={mode}>{mode}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gross Weight (kg)</label>
                      <input
                        type="number"
                        name="grossWeight"
                        value={formData.grossWeight}
                        onChange={handleInputChange}
                        placeholder="1000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Net Weight (kg)</label>
                      <input
                        type="number"
                        name="netWeight"
                        value={formData.netWeight}
                        onChange={handleInputChange}
                        placeholder="950"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Any additional information..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <FiPlus />
                  <span>Create Document</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <div className="flex items-center space-x-3">
                <FiFile className={`text-3xl ${getIconColor(viewModal.type)}`} />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{viewModal.type}</h2>
                  <p className="text-sm text-gray-600">{viewModal.docNumber}</p>
                </div>
              </div>
              <button onClick={() => setViewModal(null)} className="text-gray-500 hover:text-gray-700">
                <FiX className="text-2xl" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Validation Alerts */}
              {viewModal.validation && (
                <div className="mb-6 space-y-2">
                  {viewModal.validation.hsCode === 'missing' && (
                    <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg p-3">
                      <FiAlertTriangle className="text-red-600 text-xl" />
                      <span className="text-red-700 font-medium">HS Code Missing - Required for customs clearance</span>
                    </div>
                  )}
                  {viewModal.validation.incoterm === 'mismatch' && (
                    <div className="flex items-center space-x-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <FiAlertCircle className="text-yellow-600 text-xl" />
                      <span className="text-yellow-700 font-medium">Incoterm Mismatch - Verify with purchase order</span>
                    </div>
                  )}
                  {viewModal.validation.currency === 'inconsistent' && (
                    <div className="flex items-center space-x-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <FiAlertCircle className="text-orange-600 text-xl" />
                      <span className="text-orange-700 font-medium">Currency Inconsistency - Check exchange rate terms</span>
                    </div>
                  )}
                  {viewModal.validation.hsCode === 'valid' && viewModal.validation.incoterm === 'valid' && viewModal.validation.currency === 'valid' && (
                    <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg p-3">
                      <FiCheckCircle className="text-green-600 text-xl" />
                      <span className="text-green-700 font-medium">All validation checks passed - Document ready for processing</span>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Trade Parties */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">1</span>
                      Trade Parties
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600 uppercase mb-1">Exporter</p>
                        <p className="font-semibold text-gray-800">{viewModal.exporter}</p>
                        {viewModal.exporterAddress && (
                          <p className="text-sm text-gray-600 mt-1">{viewModal.exporterAddress}</p>
                        )}
                      </div>
                      <div className="border-t border-blue-200 pt-3">
                        <p className="text-xs text-gray-600 uppercase mb-1">Importer</p>
                        <p className="font-semibold text-gray-800">{viewModal.importer}</p>
                        {viewModal.importerAddress && (
                          <p className="text-sm text-gray-600 mt-1">{viewModal.importerAddress}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">2</span>
                      Product Information
                    </h3>
                    <div className="space-y-3">
                      {viewModal.hsCode && (
                        <div className="bg-white rounded-lg p-3 border border-purple-300">
                          <p className="text-xs text-gray-600 uppercase mb-1 flex items-center space-x-1">
                            <span>HS Code</span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Important</span>
                          </p>
                          <p className="text-2xl font-mono font-bold text-purple-700">{viewModal.hsCode}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-gray-600 uppercase mb-1">Description</p>
                        <p className="font-medium text-gray-800">{viewModal.productDescription}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Quantity</p>
                          <p className="font-semibold text-gray-800">{viewModal.quantity} {viewModal.unit}</p>
                        </div>
                        {viewModal.grossWeight && (
                          <div>
                            <p className="text-xs text-gray-600 uppercase mb-1">Gross Weight</p>
                            <p className="font-semibold text-gray-800">{viewModal.grossWeight} kg</p>
                          </div>
                        )}
                        {viewModal.netWeight && (
                          <div>
                            <p className="text-xs text-gray-600 uppercase mb-1">Net Weight</p>
                            <p className="font-semibold text-gray-800">{viewModal.netWeight} kg</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">3</span>
                      Shipping Information
                    </h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Origin</p>
                          <p className="font-semibold text-gray-800">{viewModal.originCountry}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Destination</p>
                          <p className="font-semibold text-gray-800">{viewModal.destinationCountry}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase mb-1">Port of Loading</p>
                        <p className="font-medium text-gray-800">{viewModal.portLoading}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase mb-1">Port of Discharge</p>
                        <p className="font-medium text-gray-800">{viewModal.portDischarge}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase mb-1">Shipping Mode</p>
                        <p className="font-semibold text-gray-800">{viewModal.shippingMode}</p>
                      </div>
                      {viewModal.carrier && (
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Carrier</p>
                          <p className="font-semibold text-gray-800">{viewModal.carrier}</p>
                        </div>
                      )}
                      {viewModal.vesselName && (
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Vessel/Voyage</p>
                          <p className="font-medium text-gray-800">{viewModal.vesselName} - {viewModal.voyageNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Financial Details */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">4</span>
                      Financial & Trade Terms
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                        <p className="text-xs text-gray-600 uppercase mb-1">Invoice Value</p>
                        <p className="text-3xl font-bold text-green-700">
                          {viewModal.currency} {viewModal.invoiceValue?.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-yellow-300">
                        <p className="text-xs text-gray-600 uppercase mb-1 flex items-center space-x-1">
                          <span>Incoterm</span>
                          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">Important</span>
                        </p>
                        <p className="text-2xl font-bold text-purple-700">{viewModal.incoterm}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Currency</p>
                          <p className="font-semibold text-gray-800">{viewModal.currency}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Order ID</p>
                          <p className="font-semibold text-gray-800">{viewModal.orderId}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Document Details */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">5</span>
                      Document Details
                    </h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Issue Date</p>
                          <p className="font-medium text-gray-800">{viewModal.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Validity Date</p>
                          <p className="font-medium text-gray-800">{viewModal.validityDate}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase mb-1">Status</p>
                        <span className={`inline-block text-sm px-4 py-2 rounded-lg font-semibold ${statusColors[viewModal.status]}`}>
                          {viewModal.status}
                        </span>
                      </div>
                      {viewModal.uploadedFile && (
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Uploaded File</p>
                          <p className="font-medium text-gray-800 flex items-center space-x-2">
                            <FiFile className="text-blue-600" />
                            <span>{viewModal.uploadedFile}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Document Preview */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-lg p-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <FiEye className="mr-2" />
                      Document Preview
                    </p>
                    <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                      <FiFile className="text-7xl text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 font-medium mb-1">Trade Document</p>
                      <p className="text-xs text-gray-500">{viewModal.docNumber}</p>
                      <p className="text-xs text-gray-400 mt-2">PDF preview simulation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center sticky bottom-0">
              <button
                onClick={() => setViewModal(null)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-white transition-colors"
              >
                Close
              </button>
              <div className="flex space-x-3">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <FiEye />
                  <span>Full Preview</span>
                </button>
                <button
                  onClick={() => {
                    downloadDocumentPDF(viewModal)
                    setViewModal(null)
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
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

export default Documents
