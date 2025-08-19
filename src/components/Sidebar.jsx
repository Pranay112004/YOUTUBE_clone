import React from "react";

// Data for the sidebar items
const sidebarSections = [
  {
    title: "Main",
    items: [
      { icon: "🏠", label: "Home", active: true },
      { icon: "🔥", label: "Trending" },
      { icon: "📺", label: "Subscriptions" },
      { icon: "📚", label: "Library" },
    ],
  },
  {
    title: "Discover",
    items: [
      { icon: "🛍️", label: "Shopping" },
      { icon: "🎼", label: "Music" },
      { icon: "🎭", label: "Movies" },
      { icon: "📡", label: "Live" },
      { icon: "📰", label: "News" },
      { icon: "🏆", label: "Sports" },
    ],
  },
  {
    title: "More from YouTube",
    items: [
      { icon: "⚙️", label: "Settings" },
      { icon: "❓", label: "Help" },
      { icon: "💬", label: "Send feedback" },
    ],
  },
];

// A single, reusable item in the sidebar
const SidebarItem = ({ icon, label, active }) => (
  <button
    className={`w-full flex items-center space-x-4 p-3 rounded-xl transition-colors duration-200 ${
      active
        ? "bg-red-500/10 text-red-400"
        : "text-gray-300 hover:text-white hover:bg-white/10"
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

// The main Sidebar component
function Sidebar() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="bg-red-600 p-2 rounded-lg">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
          <h1 className="text-white font-bold text-lg">MyTube</h1>
        </div>
      </div>

      {/* Scrollable navigation items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {sidebarSections.map((section, index) => (
          <div key={index}>
            <h2 className="px-3 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
              {section.title}
            </h2>
            <ul className="space-y-1">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <SidebarItem
                    icon={item.icon}
                    label={item.label}
                    active={item.active}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <p className="text-center text-xs text-gray-500">
          © 2025 Your Business
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
