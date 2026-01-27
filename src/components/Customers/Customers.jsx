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
    { id: 4, name: 'Pacific Imports LLC', type: 'customer', country: 'Australia', contact: 'Emma Wilson', email: 'emma@pacificimports.com', phone: '+61-2-8765', gst: 'AU567890', balance: '₹18,90,000' },
    { id: 5, name: 'Nordic Trading AS', type: 'customer', country: 'Norway', contact: 'Lars Hansen', email: 'lars@nordic.com', phone: '+47-22-3456', gst: 'NO234567', balance: '₹9,25,000' },
    { id: 6, name: 'Mediterranean Exports', type: 'customer', country: 'Spain', contact: 'Carlos Garcia', email: 'carlos@medexports.com', phone: '+34-91-8901', gst: 'ES890123', balance: '₹11,60,000' },
    { id: 7, name: 'Asian Commerce Group', type: 'customer', country: 'Singapore', contact: 'Wei Zhang', email: 'wei@asiancommerce.com', phone: '+65-6234-5678', gst: 'SG456789', balance: '₹22,30,000' },
    { id: 8, name: 'Americas Trading Co', type: 'customer', country: 'Canada', contact: 'Robert Brown', email: 'robert@americastrade.com', phone: '+1-416-5555', gst: 'CA678901', balance: '₹14,75,000' },
    { id: 9, name: 'Middle East Imports', type: 'customer', country: 'UAE', contact: 'Ahmed Al-Rashid', email: 'ahmed@meimports.com', phone: '+971-4-3456', gst: 'AE123890', balance: '₹26,40,000' },
    { id: 10, name: 'South American Traders', type: 'customer', country: 'Brazil', contact: 'Maria Santos', email: 'maria@satraders.com', phone: '+55-11-9876', gst: 'BR345678', balance: '₹16,80,000' },
    { id: 11, name: 'African Export Hub', type: 'customer', country: 'South Africa', contact: 'David Nkosi', email: 'david@africahub.com', phone: '+27-11-4567', gst: 'ZA901234', balance: '₹13,20,000' },
    { id: 12, name: 'Alpine Industries', type: 'customer', country: 'Switzerland', contact: 'Franz Mueller', email: 'franz@alpine.com', phone: '+41-44-6789', gst: 'CH567890', balance: '₹19,50,000' },
    { id: 13, name: 'Baltic Trading Group', type: 'customer', country: 'Poland', contact: 'Anna Kowalski', email: 'anna@baltic.com', phone: '+48-22-7890', gst: 'PL234567', balance: '₹10,90,000' },
    { id: 14, name: 'Dutch Import Corporation', type: 'customer', country: 'Netherlands', contact: 'Jan van der Berg', email: 'jan@dutchimport.com', phone: '+31-20-6543', gst: 'NL789456', balance: '₹21,40,000' },
    { id: 15, name: 'Italian Fashion Group', type: 'customer', country: 'Italy', contact: 'Giuseppe Rossi', email: 'giuseppe@italianfashion.com', phone: '+39-06-7890', gst: 'IT456789', balance: '₹17,30,000' },
    { id: 16, name: 'Mexican Trading House', type: 'customer', country: 'Mexico', contact: 'Diego Martinez', email: 'diego@mexicotrade.com', phone: '+52-55-4321', gst: 'MX234567', balance: '₹14,50,000' },
    { id: 17, name: 'Swedish Industrial AB', type: 'customer', country: 'Sweden', contact: 'Erik Andersson', email: 'erik@swedishindustrial.com', phone: '+46-8-5678', gst: 'SE901234', balance: '₹19,80,000' },
    { id: 18, name: 'Belgian Distributors NV', type: 'customer', country: 'Belgium', contact: 'Marie Dubois', email: 'marie@belgiandist.com', phone: '+32-2-3456', gst: 'BE567890', balance: '₹12,60,000' },
    { id: 19, name: 'New Zealand Imports Ltd', type: 'customer', country: 'New Zealand', contact: 'James Wilson', email: 'james@nzimports.com', phone: '+64-9-2345', gst: 'NZ678901', balance: '₹15,70,000' },
    { id: 20, name: 'Austrian Trade Partners', type: 'customer', country: 'Austria', contact: 'Klaus Schmidt', email: 'klaus@austriantrade.com', phone: '+43-1-7890', gst: 'AT345678', balance: '₹13,90,000' },
    { id: 21, name: 'Irish Business Solutions', type: 'customer', country: 'Ireland', contact: 'Patrick O\'Connor', email: 'patrick@irishbiz.com', phone: '+353-1-8901', gst: 'IE789012', balance: '₹16,20,000' },
    { id: 22, name: 'Greek Mediterranean Co', type: 'customer', country: 'Greece', contact: 'Dimitris Papadopoulos', email: 'dimitris@greekmed.com', phone: '+30-210-2345', gst: 'GR456789', balance: '₹9,80,000' },
    { id: 23, name: 'Portuguese Export Group', type: 'customer', country: 'Portugal', contact: 'João Silva', email: 'joao@portexport.com', phone: '+351-21-6789', gst: 'PT123456', balance: '₹11,30,000' },
    { id: 24, name: 'Danish Trading Company', type: 'customer', country: 'Denmark', contact: 'Lars Nielsen', email: 'lars@danishtrade.com', phone: '+45-33-4567', gst: 'DK890123', balance: '₹18,50,000' },
    { id: 25, name: 'Finnish Import Services', type: 'customer', country: 'Finland', contact: 'Mika Virtanen', email: 'mika@finnishimport.com', phone: '+358-9-1234', gst: 'FI567890', balance: '₹14,90,000' },
    { id: 26, name: 'Czech Industrial Group', type: 'customer', country: 'Czech Republic', contact: 'Pavel Novák', email: 'pavel@czechindustrial.com', phone: '+420-222-5678', gst: 'CZ234567', balance: '₹12,10,000' },
    { id: 27, name: 'Argentine Imports SA', type: 'customer', country: 'Argentina', contact: 'Carlos Rodriguez', email: 'carlos@argentinaimports.com', phone: '+54-11-8901', gst: 'AR901234', balance: '₹10,40,000' },
    { id: 28, name: 'Chilean Export Corp', type: 'customer', country: 'Chile', contact: 'Luis Fernandez', email: 'luis@chileanexport.com', phone: '+56-2-3456', gst: 'CL678901', balance: '₹13,60,000' },
    { id: 29, name: 'Colombian Trading Ltd', type: 'customer', country: 'Colombia', contact: 'Sofia Gomez', email: 'sofia@colombiatrade.com', phone: '+57-1-7890', gst: 'CO345678', balance: '₹11,80,000' },
    { id: 30, name: 'Egyptian Commerce Group', type: 'customer', country: 'Egypt', contact: 'Ahmed Hassan', email: 'ahmed@egyptcommerce.com', phone: '+20-2-5678', gst: 'EG123456', balance: '₹15,40,000' },
    { id: 31, name: 'Saudi Trading House', type: 'customer', country: 'Saudi Arabia', contact: 'Abdullah Al-Saud', email: 'abdullah@sauditrade.com', phone: '+966-11-8901', gst: 'SA890123', balance: '₹28,70,000' },
    { id: 32, name: 'Kuwaiti Import Partners', type: 'customer', country: 'Kuwait', contact: 'Yusuf Al-Ahmad', email: 'yusuf@kuwaitimport.com', phone: '+965-2-2345', gst: 'KW567890', balance: '₹24,30,000' },
    { id: 33, name: 'Qatari Business Group', type: 'customer', country: 'Qatar', contact: 'Hamad Al-Thani', email: 'hamad@qataribiz.com', phone: '+974-4-6789', gst: 'QA234567', balance: '₹31,50,000' },
  ])

  const [vendors, setVendors] = useState([
    { id: 1, name: 'Asia Import Co', type: 'vendor', country: 'China', contact: 'Li Wei', email: 'liwei@asiaimport.com', phone: '+86-10-9876', gst: 'CN987654', balance: '₹9,80,000' },
    { id: 2, name: 'Euro Exports Ltd', type: 'vendor', country: 'France', contact: 'Pierre Dubois', email: 'pierre@euroexports.com', phone: '+33-1-4567', gst: 'FR654321', balance: '₹7,45,000' },
    { id: 3, name: 'Japan Trading Corp', type: 'vendor', country: 'Japan', contact: 'Yuki Tanaka', email: 'yuki@japan.com', phone: '+81-3-2345', gst: 'JP123789', balance: '₹11,20,000' },
    { id: 4, name: 'Korea Components Ltd', type: 'vendor', country: 'South Korea', contact: 'Kim Min-jun', email: 'kim@koreacomp.com', phone: '+82-2-5678', gst: 'KR456123', balance: '₹8,90,000' },
    { id: 5, name: 'Vietnam Manufacturing', type: 'vendor', country: 'Vietnam', contact: 'Nguyen Van', email: 'nguyen@vietmfg.com', phone: '+84-4-7890', gst: 'VN789456', balance: '₹6,75,000' },
    { id: 6, name: 'Thai Suppliers Co', type: 'vendor', country: 'Thailand', contact: 'Somchai Wong', email: 'somchai@thaisupply.com', phone: '+66-2-3456', gst: 'TH321654', balance: '₹5,60,000' },
    { id: 7, name: 'Taiwan Electronics', type: 'vendor', country: 'Taiwan', contact: 'Chen Li', email: 'chen@taiwanelec.com', phone: '+886-2-8901', gst: 'TW654987', balance: '₹12,30,000' },
    { id: 8, name: 'Indonesia Raw Materials', type: 'vendor', country: 'Indonesia', contact: 'Budi Santoso', email: 'budi@indoraw.com', phone: '+62-21-4567', gst: 'ID987321', balance: '₹7,85,000' },
    { id: 9, name: 'Malaysia Industrial', type: 'vendor', country: 'Malaysia', contact: 'Ahmad Ibrahim', email: 'ahmad@myindustrial.com', phone: '+60-3-6789', gst: 'MY123987', balance: '₹9,40,000' },
    { id: 10, name: 'Philippines Trade', type: 'vendor', country: 'Philippines', contact: 'Jose Reyes', email: 'jose@phtrade.com', phone: '+63-2-2345', gst: 'PH456789', balance: '₹4,90,000' },
    { id: 11, name: 'Bangladesh Textiles', type: 'vendor', country: 'Bangladesh', contact: 'Rahman Ahmed', email: 'rahman@bdtextile.com', phone: '+880-2-5678', gst: 'BD789123', balance: '₹6,20,000' },
    { id: 12, name: 'Turkey Exports Inc', type: 'vendor', country: 'Turkey', contact: 'Mehmet Yilmaz', email: 'mehmet@turkexport.com', phone: '+90-212-8901', gst: 'TR321456', balance: '₹8,50,000' },
    { id: 13, name: 'UAE Trading Partners', type: 'vendor', country: 'UAE', contact: 'Mohammed Al-Maktoum', email: 'mohammed@uaetrading.com', phone: '+971-4-6789', gst: 'AE654321', balance: '₹10,75,000' },
    { id: 14, name: 'Hong Kong Supplies Ltd', type: 'vendor', country: 'Hong Kong', contact: 'Wong Kar-wai', email: 'wong@hksupplies.com', phone: '+852-2-3456', gst: 'HK123789', balance: '₹13,40,000' },
    { id: 15, name: 'Singapore Manufacturing', type: 'vendor', country: 'Singapore', contact: 'Tan Wei Ming', email: 'tan@sgmanufacturing.com', phone: '+65-6789-0123', gst: 'SG987654', balance: '₹11,90,000' },
    { id: 16, name: 'Italian Components SRL', type: 'vendor', country: 'Italy', contact: 'Marco Bianchi', email: 'marco@italiancomp.com', phone: '+39-02-4567', gst: 'IT321654', balance: '₹14,60,000' },
    { id: 17, name: 'German Precision GmbH', type: 'vendor', country: 'Germany', contact: 'Hans Mueller', email: 'hans@germanprecision.com', phone: '+49-89-7890', gst: 'DE987321', balance: '₹16,80,000' },
    { id: 18, name: 'UK Industrial Supplies', type: 'vendor', country: 'UK', contact: 'James Anderson', email: 'james@ukindus.com', phone: '+44-161-2345', gst: 'GB456123', balance: '₹12,30,000' },
    { id: 19, name: 'Polish Manufacturing Co', type: 'vendor', country: 'Poland', contact: 'Piotr Kowalczyk', email: 'piotr@polishmfg.com', phone: '+48-12-6789', gst: 'PL789456', balance: '₹8,70,000' },
    { id: 20, name: 'Spanish Raw Materials SA', type: 'vendor', country: 'Spain', contact: 'Antonio Lopez', email: 'antonio@spanishraw.com', phone: '+34-93-3456', gst: 'ES654321', balance: '₹10,50,000' },
    { id: 21, name: 'Brazilian Exports Ltda', type: 'vendor', country: 'Brazil', contact: 'Paulo Silva', email: 'paulo@brazilexports.com', phone: '+55-21-5678', gst: 'BR123987', balance: '₹9,80,000' },
    { id: 22, name: 'Mexican Manufacturers SA', type: 'vendor', country: 'Mexico', contact: 'Juan Hernandez', email: 'juan@mexicomfg.com', phone: '+52-33-9012', gst: 'MX456321', balance: '₹7,90,000' },
    { id: 23, name: 'Australian Resources Pty', type: 'vendor', country: 'Australia', contact: 'Michael Thompson', email: 'michael@ausresources.com', phone: '+61-3-7890', gst: 'AU789654', balance: '₹15,20,000' },
    { id: 24, name: 'Canadian Materials Corp', type: 'vendor', country: 'Canada', contact: 'David Martin', email: 'david@canadamaterials.com', phone: '+1-604-2345', gst: 'CA321987', balance: '₹13,50,000' },
    { id: 25, name: 'South African Mining Co', type: 'vendor', country: 'South Africa', contact: 'Thabo Mbeki', email: 'thabo@samining.com', phone: '+27-21-6789', gst: 'ZA654789', balance: '₹11,60,000' },
    { id: 26, name: 'Russian Industrial Group', type: 'vendor', country: 'Russia', contact: 'Dmitry Ivanov', email: 'dmitry@russianindustrial.com', phone: '+7-495-1234', gst: 'RU987123', balance: '₹14,30,000' },
    { id: 27, name: 'Czech Components sro', type: 'vendor', country: 'Czech Republic', contact: 'Jakub Svoboda', email: 'jakub@czechcomp.com', phone: '+420-224-5678', gst: 'CZ456987', balance: '₹8,40,000' },
    { id: 28, name: 'Hungarian Supplies Kft', type: 'vendor', country: 'Hungary', contact: 'István Nagy', email: 'istvan@hungariansupplies.com', phone: '+36-1-9012', gst: 'HU123654', balance: '₹7,20,000' },
    { id: 29, name: 'Romanian Industrial SRL', type: 'vendor', country: 'Romania', contact: 'Andrei Popescu', email: 'andrei@romanianindustrial.com', phone: '+40-21-3456', gst: 'RO789321', balance: '₹6,90,000' },
    { id: 30, name: 'Pakistani Textiles Ltd', type: 'vendor', country: 'Pakistan', contact: 'Ali Khan', email: 'ali@paktextiles.com', phone: '+92-21-7890', gst: 'PK456789', balance: '₹9,50,000' },
    { id: 31, name: 'Sri Lankan Exports', type: 'vendor', country: 'Sri Lanka', contact: 'Nimal Fernando', email: 'nimal@slexports.com', phone: '+94-11-2345', gst: 'LK321456', balance: '₹5,80,000' },
    { id: 32, name: 'Myanmar Manufacturing', type: 'vendor', country: 'Myanmar', contact: 'Aung Min', email: 'aung@myanmarmfg.com', phone: '+95-1-6789', gst: 'MM654123', balance: '₹4,70,000' },
    { id: 33, name: 'Cambodian Supplies Co', type: 'vendor', country: 'Cambodia', contact: 'Sok Chea', email: 'sok@cambodiasupplies.com', phone: '+855-23-9012', gst: 'KH987456', balance: '₹5,30,000' },
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
