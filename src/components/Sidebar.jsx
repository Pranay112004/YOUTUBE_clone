import React from "react";
import { GoHome } from "react-icons/go";
import { IoMdMic } from "react-icons/io";
import { MdOutlineSubscriptions, MdPodcasts } from "react-icons/md";
import { FaChevronRight, FaYoutube, FaRegNewspaper } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import {
  SiYoutubestudio,
  SiYoutubekids,
  SiYoutubemusic,
  SiTrendmicro,
  SiYoutubegaming,
  SiStylelint,
} from "react-icons/si";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {
  PiMusicNoteLight,
  PiFilmSlateLight,
  PiLightbulbLight,
} from "react-icons/pi";
import { CgMediaLive } from "react-icons/cg";

const sidebarItems = [
  {
    title: "Main",
    items: [
      { icon: <GoHome />, label: "Home" },
      { icon: <FaChevronRight />, label: "Explore" },
      { icon: <MdOutlineSubscriptions />, label: "Subscriptions" },
      { icon: <PiFilmSlateLight />, label: "Library" },
    ],
  },
  {
    title: "YouTube Services",
    items: [
      {
        icon: <SiYoutubestudio className="text-red-600" />,
        label: "YouTube Studio",
      },
      {
        icon: <SiYoutubekids className="text-red-600" />,
        label: "YouTube Kids",
      },
      {
        icon: <SiYoutubemusic className="text-red-600" />,
        label: "YouTube Music",
      },
      {
        icon: <SiYoutubegaming className="text-red-600" />,
        label: "YouTube Gaming",
      },
    ],
  },
  {
    title: "Discover",
    items: [
      { icon: <IoMdMic />, label: "Voice Search" },
      { icon: <SiTrendmicro />, label: "Trending" },
      { icon: <HiOutlineShoppingBag />, label: "Shop" },
      { icon: <PiMusicNoteLight />, label: "Music" },
      { icon: <PiFilmSlateLight />, label: "Films" },
      { icon: <CgMediaLive />, label: "Live" },
      { icon: <FaRegNewspaper />, label: "News" },
      { icon: <TfiCup />, label: "Awards" },
      { icon: <PiLightbulbLight />, label: "Ideas" },
      { icon: <SiStylelint />, label: "Style" },
      { icon: <MdPodcasts />, label: "Podcasts" },
    ],
  },
];

const SidebarItem = ({ icon, label }) => (
  <button className="w-full flex items-center space-x-3 p-2 hover:bg-gray-100 rounded transition text-black">
    <span className="w-6 h-6">{icon}</span>
    <span className="text-sm">{label}</span>
  </button>
);

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-30 sm:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed z-40 top-14 bottom-0 left-0 w-64 p-4 bg-white shadow-md transform transition-transform duration-300 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:static sm:top-16 sm:h-[calc(100vh-64px)] overflow-y-auto`}
      >
        <nav className="space-y-6">
          {sidebarItems.map((section, index) => (
            <div key={index}>
              <h2 className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-widest px-2">
                {section.title}
              </h2>
              <ul className="space-y-1">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <SidebarItem icon={item.icon} label={item.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
