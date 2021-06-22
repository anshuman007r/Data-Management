function HomePage(props) {
        return (
            <div>
                <button onClick={()=>props.history.push('/login')}>Navigate to LoginPage</button>
            </div>
        );
}

export default HomePage;