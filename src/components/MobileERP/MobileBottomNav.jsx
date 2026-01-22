import React from 'react'
import { FiHome, FiTruck, FiShoppingBag, FiPackage, FiUser } from 'react-icons/fi'

const MobileBottomNav = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: FiHome },
    { id: 'shipments', label: 'Shipments', icon: FiTruck },
    { id: 'orders', label: 'Orders', icon: FiShoppingBag },
    { id: 'inventory', label: 'Stock', icon: FiPackage },
    { id: 'profile', label: 'More', icon: FiUser },
  ]

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around px-2 shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeScreen === item.id
        
        return (
          <button
            key={item.id}
            onClick={() => setActiveScreen(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-2 rounded-lg transition-all ${
              isActive 
                ? 'text-primary-600' 
                : 'text-gray-500 active:bg-gray-100'
            }`}
          >
            <Icon className={`text-2xl mb-1 ${isActive ? 'scale-110' : ''}`} />
            <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default MobileBottomNav
