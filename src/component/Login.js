
function Login(props) {
    return (
        <div>
            <button onClick={()=>props.history.push('/')}>Go back to Homepage</button>
        </div>
    );
}

export default Login;