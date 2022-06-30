import {signInWithGoogle} from "../../services/firebase";

const Login = () => {
    return (
        <div className="flex h-screen bg-slate-200">
            <div className="m-auto w-1/3">
                <form className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-center text-xl mb-4">Login</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                            Sign In
                        </button>
                    </div>
                </form>
                <button className="w-full bg-white p-4 rounded" onClick={signInWithGoogle}>
                    <div class="flex justify-center items-center space-x-4 mx-2">
                        <div>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png"
                                className="w-8 h-8 "
                                alt="Google"/>
                        </div>
                        <div>Login with Google</div>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Login;