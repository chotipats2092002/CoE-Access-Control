import { useState } from "react";

const LoginForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onLogin(username, password);
    }

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit}
            className="flex flex-col border-1 border-gray-300 max-w-md px-10 py-18 rounded-lg shadow-lg">
                <div className="text-5xl font-semibold text-center ">Login</div>
                <div className="mt-8">
                    <label className="text-xl font-medium ">Username</label>
                    <input className="w-full border-2 border-gray-300 p-2 mt-2 rounded-md" 
                        type="text" 
                        placeholder="Enter your username"
                        value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <label className="text-xl font-medium ">Password</label>
                    <input className="w-full border-2 border-gray-300 p-2 mt-2 rounded-md" 
                        type="password" 
                        placeholder="Enter your password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mt-8 flex flex-col ">
                    <button type="submit" className="bg-blue-600 text-white font-medium p-2 rounded-md cursor-pointer hover:bg-gray-400 hover:text-white">Login</button>
                </div>
            </form>   
        </div>
        
    )

}

export default LoginForm;