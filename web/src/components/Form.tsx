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
            className="flex flex-col border-2 border-gray-300 max-w-md px-10 py-18">
                <div className="text-5xl font-semibold text-center ">Login</div>
                <div className="mt-8">
                    <label className="text-xl font-medium ">Username</label>
                    <input className="w-full border-2 border-gray-300 p-2 mt-2" 
                        type="text" 
                        placeholder="Enter your username"
                        value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <label className="text-xl font-medium ">Password</label>
                    <input className="w-full border-2 border-gray-300 p-2 mt-2" 
                        type="password" 
                        placeholder="Enter your password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mt-8 flex flex-col">
                    <button type="submit" className="bg-blue-200 text-black font-medium p-2">Login</button>
                </div>
            </form>   
        </div>
        
    )

}

export default LoginForm;