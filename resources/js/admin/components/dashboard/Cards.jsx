import { useEffect, useState } from "react"

export default function Cards() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        $axios.get('card-reports')
        .then( (res) => {
            setData({
                ...res.data.data
            });
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            alert(error?.message)
        });
    }, []);


    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                        </path>
                    </svg>
                </div>
                <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Member</h3>
                    <p className="text-3xl">{data?.total_users ?? 0}</p>
                </div>
            </div>

            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-amber-600">
                    <svg className="h-12 w-12 text-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <g id="add-user-left-6" transform="translate(-2 -2)">
                            <path id="primary" d="M11,3.41A5.11,5.11,0,0,1,13,3a5,5,0,1,1-4.59,7" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                            <path id="primary-2" data-name="primary" d="M7,5H3M5,7V3m9,10H12a7,7,0,0,0-7,7H5a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1h0A7,7,0,0,0,14,13Z" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </g>
                    </svg>
                </div>
                <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">New Member</h3>
                    <p className="text-3xl">{data?.new_users ?? 0}</p>
                </div>
            </div>

            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-blue-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2">
                        </path>
                    </svg></div>
                <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Post</h3>
                    <p className="text-3xl">{data?.total_posts ?? 0}</p>
                </div>
            </div>

            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-sky-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2">
                        </path>
                    </svg></div>
                <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Published Post</h3>
                    <p className="text-3xl">{data?.total_published_posts ?? 0}</p>
                </div>
            </div>

            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-indigo-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z">
                        </path>
                    </svg></div>
                <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Role</h3>
                    <p className="text-3xl">{data?.total_roles ?? 0}</p>
                </div>
            </div>

            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-gray-400">
                    <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Iconly/Curved/Category">
                            <g id="Category">
                                <path id="Stroke 1" fillRule="evenodd" clipRule="evenodd" d="M21.0003 6.6738C21.0003 8.7024 19.3551 10.3476 17.3265 10.3476C15.2979 10.3476 13.6536 8.7024 13.6536 6.6738C13.6536 4.6452 15.2979 3 17.3265 3C19.3551 3 21.0003 4.6452 21.0003 6.6738Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path id="Stroke 3" fillRule="evenodd" clipRule="evenodd" d="M10.3467 6.6738C10.3467 8.7024 8.7024 10.3476 6.6729 10.3476C4.6452 10.3476 3 8.7024 3 6.6738C3 4.6452 4.6452 3 6.6729 3C8.7024 3 10.3467 4.6452 10.3467 6.6738Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path id="Stroke 5" fillRule="evenodd" clipRule="evenodd" d="M21.0003 17.2619C21.0003 19.2905 19.3551 20.9348 17.3265 20.9348C15.2979 20.9348 13.6536 19.2905 13.6536 17.2619C13.6536 15.2333 15.2979 13.5881 17.3265 13.5881C19.3551 13.5881 21.0003 15.2333 21.0003 17.2619Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path id="Stroke 7" fillRule="evenodd" clipRule="evenodd" d="M10.3467 17.2619C10.3467 19.2905 8.7024 20.9348 6.6729 20.9348C4.6452 20.9348 3 19.2905 3 17.2619C3 15.2333 4.6452 13.5881 6.6729 13.5881C8.7024 13.5881 10.3467 15.2333 10.3467 17.2619Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Categories</h3>
                    <p className="text-3xl">{data?.total_categories ?? 0}</p>
                </div>
            </div>

            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-red-400">
                    <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 3H11.5118C12.2455 3 12.6124 3 12.9577 3.08289C13.2638 3.15638 13.5564 3.27759 13.8249 3.44208C14.1276 3.6276 14.387 3.88703 14.9059 4.40589L20.5 10M7.5498 10.0498H7.5598M9.51178 6H8.3C6.61984 6 5.77976 6 5.13803 6.32698C4.57354 6.6146 4.1146 7.07354 3.82698 7.63803C3.5 8.27976 3.5 9.11984 3.5 10.8V12.0118C3.5 12.7455 3.5 13.1124 3.58289 13.4577C3.65638 13.7638 3.77759 14.0564 3.94208 14.3249C4.1276 14.6276 4.38703 14.887 4.90589 15.4059L8.10589 18.6059C9.29394 19.7939 9.88796 20.388 10.5729 20.6105C11.1755 20.8063 11.8245 20.8063 12.4271 20.6105C13.112 20.388 13.7061 19.7939 14.8941 18.6059L16.1059 17.3941C17.2939 16.2061 17.888 15.612 18.1105 14.9271C18.3063 14.3245 18.3063 13.6755 18.1105 13.0729C17.888 12.388 17.2939 11.7939 16.1059 10.6059L12.9059 7.40589C12.387 6.88703 12.1276 6.6276 11.8249 6.44208C11.5564 6.27759 11.2638 6.15638 10.9577 6.08289C10.6124 6 10.2455 6 9.51178 6ZM8.0498 10.0498C8.0498 10.3259 7.82595 10.5498 7.5498 10.5498C7.27366 10.5498 7.0498 10.3259 7.0498 10.0498C7.0498 9.77366 7.27366 9.5498 7.5498 9.5498C7.82595 9.5498 8.0498 9.77366 8.0498 10.0498Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Tags</h3>
                    <p className="text-3xl">{data?.total_tags ?? 0}</p>
                </div>
            </div>
        </div>
    ) 
}