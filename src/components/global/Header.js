import { auth } from "../../services/firebase";
import React, { useState } from 'react';

const Header = ({user}) => {
    const [modal, isModal] = useState(false);

    return (
        <div>
            <nav className="bg-white shadow-md top-0 px-8 py-3 mb-4">
                <div className="flex items-center justify-between flex-wrap">
                    <div>
                        <h1 className="text-xl font-medium">PWA Slider</h1>
                    </div>
                    <div>
                        <button onClick={() => isModal(current => !current)}>
                            <img className="rounded-full w-10 h-10 hover:ring-4 hover:ring-gray-200 cursor-pointer" src={user.photoURL} alt=""/>
                        </button>
                    </div>
                </div>
                { modal ? <Modals user={user} /> : null }
            </nav>
        </div>
    );
}

const Modals = ({user}) => {
    return (
        <div
            className="absolute mr-12 mt-2 right-0 z-50 ring-2 ring-gray-100 bg-white rounded drop-shadow-md lg:w-1/5 md:w-1/2 w-4/5 flex flex-col justify-center items-center p-4 space-y-4">
            <img className="rounded-full w-14 h-14" src={user.photoURL} alt=""/>
            <h2 className="text-sm font-medium">{user.displayName}</h2>
            <p className="text-sm font-medium text-gray-400 ">{user.email}</p>
            <button
                className="rounded border-2 border-gray w-full py-2 hover:bg-slate-50"
                onClick={() => auth.signOut()}>Logout
            </button>
        </div>
    );
}

export default Header;