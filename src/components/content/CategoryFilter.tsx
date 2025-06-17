



export const CategoryFilter = () => {
    const categories = [
        { name: 'Action', count: 8 },
        { name: 'Adventure', count: 12 },
        { name: 'Comedy', count: 15 },
        { name: 'Drama', count: 6 },
        { name: 'Horror', count: 23 },
        { name: 'Thriller', count: 9 }
    ];

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Category</h3>
            <div className="space-y-3">
                {categories.map((category, index) => (
                    <div key={index} className="flex justify-between items-center">
            <span className="text-gray-700 hover:text-teal-500 cursor-pointer transition-colors duration-200 text-sm">
              {category.name}
            </span>
                        <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full min-w-[24px] text-center">
              {category.count}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
};