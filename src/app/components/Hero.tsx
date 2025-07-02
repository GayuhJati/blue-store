export default function Hero() {
    return (
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
            Selamat Datang di Toko Buku Biru
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-6">
            Temukan ribuan buku menarik dari berbagai kategori, mulai dari fiksi, non-fiksi, edukasi, hingga buku anak.
          </p>
          <a
            href="/kategori"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-blue-700 transition"
          >
            Jelajahi Kategori
          </a>
        </div>
      </section>
    );
  }
  