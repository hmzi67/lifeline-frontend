
import { useEffect, useState } from 'react';
import api from "@/lib/axios.ts";

type Category = {
    id: string;
    name: string;
    // Assuming the API returns a count of posts for each category.
    // If not, you might need to adjust this.
    postCount?: number;
};

export const CategoryFilter = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Replace it with your actual API base URL
                const response = await api.get(`blogs/categories`);
                if (response.status != 200) {
                    throw new Error('Failed to fetch categories');
                }
                const data: Category[] = await response.data.data;
                setCategories(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories().then(r => console.log(r));
    }, []);

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Category</h3>
            <div className="space-y-3">
                {loading && <p className="text-gray-500">Loading categories...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && categories.map((category) => (
                    <div key={category.id} className="flex justify-between items-center">
            <span className="text-gray-700 hover:text-primary-500 cursor-pointer transition-colors duration-200 text-sm">
              {category.name}
            </span>
                        {/* The count is commented out as the API might not provide it. */}
                        {/* <span className="text-primary-500  text-xs px-2 py-1 rounded-full min-w-[24px] text-center">
              {category.postCount}
            </span> */}
                    </div>
                ))}
            </div>
        </div>
    );
};