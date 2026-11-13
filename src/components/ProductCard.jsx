function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="bg-gray-50 h-48 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-800 truncate">{product.title}</h3>
        <p className="text-xs text-gray-400 capitalize mb-3">{product.category}</p>

        <div className="flex items-center justify-between">
          <span className="text-indigo-600 font-semibold">${product.price}</span>
          <span className="text-sm text-gray-500">
            <span className="text-orange-400">★</span> {product.rating}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;