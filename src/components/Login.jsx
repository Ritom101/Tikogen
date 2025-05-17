import React from "react";

export default function Login() {
    return (
        <section className="h-screen flex justify-center items-center bg-black text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <input type="email" placeholder="Email" className="block w-full p-3 mb-4 rounded bg-black border border-gray-700 text-white" />
                <input type="password" placeholder="Password" className="block w-full p-3 mb-6 rounded bg-black border border-gray-700 text-white" />
                <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded">Login</button>
            </div>
        </section>
    );
}