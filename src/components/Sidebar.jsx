import React from "react";

const sidebarItems = [
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
    title: "YouTube Services",
    items: [
      { icon: "🎬", label: "YouTube Studio", color: "text-red-500" },
      { icon: "👶", label: "YouTube Kids", color: "text-red-500" },
      { icon: "🎵", label: "YouTube Music", color: "text-red-500" },
      { icon: "🎮", label: "YouTube Gaming", color: "text-red-500" },
    ],
  },
  {
    title: "Discover",
    items: [
      { icon: "🎤", label: "Voice Search" },
      { icon: "📈", label: "Trending" },
      { icon: "🛍️", label: "Shopping" },
      { icon: "🎼", label: "Music" },
      { icon: "🎭", label: "Movies" },
      { icon: "📡", label: "Live" },
      { icon: "📰", label: "News" },
      { icon: "🏆", label: "Sports" },
      { icon: "💡", label: "Learning" },
      { icon: "👗", label: "Fashion" },
      { icon: "🎙️", label: "Podcasts" },
    ],
  },
  {
    title: "More from YouTube",
    items: [
      { icon: "⚙️", label: "Settings" },
      { icon: "📊", label: "Report history" },
      { icon: "❓", label: "Help" },
      { icon: "💬", label: "Send feedback" },
    ],
  },
];

const SidebarItem = ({ icon, label, active, color }) => (
  <button
    className={`w-full flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
      active
        ? "bg-red-600/20 text-red-400 border border-red-500/30"
        : "text-gray-300 hover:text-white hover:bg-white/10"
    }`}
  >
    {/* Animated background gradient */}
    <div
      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        active
          ? "bg-gradient-to-r from-red-600/30 to-purple-600/20"
          : "bg-gradient-to-r from-white/5 to-white/10"
      }`}
    ></div>

    {/* Icon with glow effect */}
    <div
      className={`relative z-10 text-xl transition-all duration-300 ${
        active ? "scale-110" : "group-hover:scale-110"
      } ${color || ""}`}
    >
      {icon}
    </div>

    {/* Label with smooth animation */}
    <span
      className={`relative z-10 text-sm font-medium transition-all duration-300 ${
        active ? "text-red-400" : "group-hover:text-white"
      }`}
    >
      {label}
    </span>

    {/* Active indicator */}
    {active && (
      <div className="absolute right-2 w-1 h-8 bg-red-500 rounded-full opacity-80"></div>
    )}
  </button>
);

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Enhanced backdrop for mobile */}
      <div
        className={`fixed inset-0 z-30 backdrop-blur-sm bg-black/60 sm:hidden transition-all duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed z-40 top-0 bottom-0 left-0 w-72 bg-black/95 backdrop-blur-xl border-r border-gray-700/40 shadow-2xl shadow-black/50 transform transition-all duration-500 ease-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:static sm:top-20 sm:h-[calc(100vh-5rem)]`}
      >
        {/* Header with YouTube branding */}
        <div className="p-6 border-b border-gray-700/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">▶</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">YouTube</h1>
              <p className="text-gray-400 text-xs">Premium Experience</p>
            </div>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 p-4">
          <nav className="space-y-8">
            {sidebarItems.map((section, index) => (
              <div key={index} className="space-y-3">
                {/* Section header with modern styling */}
                <div className="flex items-center space-x-2 px-3 pt-2">
                  <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    {section.title}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-700/50 to-transparent"></div>
                </div>

                {/* Section items */}
                <ul className="space-y-1">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <SidebarItem
                        icon={item.icon}
                        label={item.label}
                        active={item.active}
                        color={item.color}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer section */}
        <div className="p-4 border-t border-gray-700/40 bg-black/60">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">© 2024 YouTube Clone</p>
            <div className="flex justify-center space-x-4">
              <button className="text-gray-400 hover:text-red-400 transition-colors duration-300">
                <span className="text-lg">🌙</span>
              </button>
              <button className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <span className="text-lg">🔔</span>
              </button>
              <button className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                <span className="text-lg">⚙️</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ambient glow effects */}
        <div className="absolute top-1/4 -right-20 w-40 h-40 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      </aside>
    </>
  );
}

export default Sidebar;
