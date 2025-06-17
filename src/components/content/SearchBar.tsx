import {useState} from "react";


export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className={'mt-8 px-52 mx-96'}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
        </div>
    );
};