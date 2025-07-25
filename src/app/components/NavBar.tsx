"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import { useAuth } from "@/contexts/auth-context";

export default function NavBar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.setItem("roomId", "room-public");
    window.location.href = "/"; 
  };

  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Kategori", path: "/kategori" },
    { name: "Tentang", path: "/tentang" },
    { name: "Keranjang", path: "/keranjang" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-700">Toko Biru</h1>
        <div className="hidden md:flex space-x-6 md:items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium ${
                pathname === item.path
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <button onClick={handleLogout} className="text-sm py-2 px-5 font-bold border-2 border-red-500 text-red-500 hover:border-red-700 hover:text-red-700 rounded-md">Logout</button>
          ) : (
            <a
            href="/login"
            className="text-sm text-gray-600 hover:text-blue-500"
          >
            <button className="text-sm bg-blue-500 py-2 px-5 font-bold text-white rounded-md hover:bg-blue-700">
              Login
            </button>
          </a>
          )}
          
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block text-sm font-medium ${
                pathname === item.path
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
