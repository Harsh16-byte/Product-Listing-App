import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getProducts() {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
      setLoading(false)
    }
    getProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(
    products.map((p)=>(p.category))
  )]

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else {
      return a.price - b.price;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Shop</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 bg-white rounded-xl p-5 h-fit">
          <h2 className="font-semibold text-gray-800 mb-3">Category</h2>
          <button
            onClick={() => setCategory("all")}
            className={`px-3 py-2 rounded-lg  w-full flex justify-between text-sm ${category==='all' ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            <span>All</span>
          </button>
          {categories.map((c) => (
            <button
              onClick={() => setCategory(c)}
              key={c}
              className={`px-3 py-2 rounded-lg  w-full flex justify-between text-sm ${category===(c) ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              <span>{c}</span>
            </button>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1">
          {loading ===true ? (
            <div className="flex justify-center items-center py-16">
            <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          ):(
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search Products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-72 px-5 py-2.5 rounded-full bg-white outline-none shadow-sm"
            />
            <p className="text-sm text-gray-500">
              Showing {filteredProducts.length} results
            </p>
            <div className="md:ml-auto flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <button
                onClick={() => setSortBy("rating")}
                className={`px-3 py-1.5 rounded-md ${
                  sortBy === "rating"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Ratings: High to Low
              </button>
              <button
                onClick={() => setSortBy("price")}
                className={`px-3 py-1.5 rounded-md ${
                  sortBy === "price"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Price: Low to High
              </button>
            </div>
          </div>
         )}
          
          {sortedProducts.length ===0 ? (
            <p className="text-center text-gray-500 py-16">No products found</p>
          ):(
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          )}             
        </main>
      </div>
    </div>
  );
}         
          
export default App;
