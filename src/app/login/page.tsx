"use client";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Ambil CSRF cookie dulu
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      // 2. Kirim form login
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // penting!
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        login(data.access_token, data.user);
        router.push("/");
      } else {
        alert(data.message);
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white  rounded-lg shadow">
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <h2 className="text-xl font-bold text-gray-900 ">
            Sign in to your account
          </h2>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 "
            >
              Your email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2.5 border rounded-lg bg-gray-50  "
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 "
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2.5 border rounded-lg bg-gray-50  "
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2 text-sm text-gray-600 ">
              <input type="checkbox" className="w-4 h-4" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg"
          >
            Sign in
          </button>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
