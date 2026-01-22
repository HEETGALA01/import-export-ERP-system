import React, { useState } from 'react'
import { FiX, FiBell, FiWifi, FiBattery } from 'react-icons/fi'
import MobileBottomNav from './MobileBottomNav'
import MobileDashboard from '../MobileDashboard/MobileDashboard'
import MobileShipments from '../MobileShipments/MobileShipments'
import MobileOrders from '../MobileOrders/MobileOrders'
import MobileInventory from '../MobileInventory/MobileInventory'
import MobileProfile from '../MobileProfile/MobileProfile'

const MobileERP = ({ onClose }) => {
  const [activeScreen, setActiveScreen] = useState('dashboard')
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', title: 'Shipment Delay', message: 'SH-5678 delayed by 2 days', time: '5m ago', unread: true },
    { id: 2, type: 'approval', title: 'Approval Pending', message: 'PO-5004 requires your approval', time: '1h ago', unread: true },
    { id: 3, type: 'risk', title: 'Risk Alert', message: 'Low stock on PRD-002', time: '2h ago', unread: false },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  const unreadCount = notifications.filter(n => n.unread).length

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <MobileDashboard notifications={notifications} setNotifications={setNotifications} />
      case 'shipments':
        return <MobileShipments />
      case 'orders':
        return <MobileOrders />
      case 'inventory':
        return <MobileInventory />
      case 'profile':
        return <MobileProfile onClose={onClose} />
      default:
        return <MobileDashboard notifications={notifications} setNotifications={setNotifications} />
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-100 to-gray-200 md:flex md:items-center md:justify-center md:p-8 z-50">
      {/* Mobile Container - Centered on desktop, full screen on mobile */}
      <div className="relative bg-white md:rounded-3xl md:shadow-2xl overflow-hidden w-full h-full md:w-[390px] md:max-h-[844px] md:h-[90vh]">
        <div className="flex flex-col h-full">
          {/* App Header */}
          <div className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between shadow-sm">
            <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-800">
              {activeScreen === 'dashboard' && 'Dashboard'}
              {activeScreen === 'shipments' && 'Shipments'}
              {activeScreen === 'orders' && 'Orders'}
              {activeScreen === 'inventory' && 'Inventory'}
              {activeScreen === 'profile' && 'Profile'}
            </h1>
            <p className="text-xs text-gray-500">Import-Export ERP</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowNotifications(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiBell className="text-xl text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors flex items-center space-x-1"
              title="Back to Desktop View"
            >
              <FiX className="text-sm" />
              <span>Desktop</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        <MobileBottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
        </div>

          {/* Notifications Panel */}
          {showNotifications && (
            <div className="absolute inset-0 bg-white z-30 flex flex-col md:rounded-3xl overflow-hidden">
              {/* Notifications Header */}
              <div className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX className="text-xl text-gray-700" />
                </button>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <FiBell className="text-5xl mb-3" />
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-3">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          notif.type === 'warning' ? 'border-orange-500 bg-orange-50' :
                          notif.type === 'approval' ? 'border-blue-500 bg-blue-50' :
                          'border-red-500 bg-red-50'
                        } ${notif.unread ? 'shadow-md' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-sm font-semibold text-gray-800">{notif.title}</h3>
                              {notif.unread && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                            <span className="text-xs text-gray-500">{notif.time}</span>
                          </div>
                        </div>
                        {notif.type === 'approval' && (
                          <div className="flex space-x-2 mt-3">
                            <button className="flex-1 py-2 bg-green-500 text-white text-sm font-medium rounded-lg active:bg-green-600">
                              Approve
                            </button>
                            <button className="flex-1 py-2 bg-red-500 text-white text-sm font-medium rounded-lg active:bg-red-600">
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default MobileERP
