import Header from "./global/Header";

const Home = ({user}) => {
    return (
        <div>
            <Header user={user}/>
            <h1>Home</h1>
            <p>Welcome {user.displayName}</p>
        </div>
    );
}

export default Home;