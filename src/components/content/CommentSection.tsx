import {Heart, User} from "lucide-react";
import {useState} from "react";


export const CommentSection = () => {
    const [comment, setComment] = useState('');

    return (
        <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave a Comment</h3>
            <div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Write a message..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>
                <button
                    onClick={() => {
                        console.log('Comment submitted:', comment);
                        setComment('');
                    }}
                    className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors duration-200"
                >
                    Post Comment
                </button>
            </div>

            {/* Sample Comment */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900">Jon de</h4>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">2m ago</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliqua deserunt. Nulla Lorem mollit cupidatat irure. Laborum in deserunt.
                        </p>
                        <div className="flex items-center space-x-4 mt-3">
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-teal-500 transition-colors">
                                <Heart className="w-4 h-4" />
                                <span className="text-sm">2</span>
                            </button>
                            <button className="text-gray-500 hover:text-teal-500 transition-colors text-sm">
                                Reply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


