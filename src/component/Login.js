import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { REGEX, USERNAME, PASSWORD } from '../utils/WebUtil' 
import { loggedIn } from '../redux/action'
import TextInput from './common/TextInput'

function Login(props) {
    const [ userName, setUserName ] = useState('')
    const [ password, setPassword ] = useState('') 
    const [ errorUserName, setErrorUserName ] = useState(false)
    const [ errorPassword, setErrorPassword ] = useState(false)
    const [ invalidDataError,setinvalidDataError] = useState(false)
    const dispatch = useDispatch()
    

    const changeUserNameInput = (event) =>{
        setinvalidDataError(false)
        let { value } = event.target
        setUserName(value)
        setErrorUserName(false)
    }
    
    const validateUserName = () =>{
        if(REGEX.username.test(userName)){
            setErrorUserName(false)
        }else{
            setErrorUserName(true)
        }
    }

    const changePasswordInput = (event) =>{
        setinvalidDataError(false)
        let { value } = event.target
        setPassword(value)
        setErrorPassword(false)
    }
    
    const validatePassword = () =>{
        if(REGEX.password.test(password)){
            setErrorPassword(false)
        }else{
            setErrorPassword(true)
        }
    }

    const onAuthenticate = (event) =>{
        event.preventDefault();
        if(userName !== '' && password !== '' && !errorUserName && !errorPassword ){
            if(USERNAME === userName && password === PASSWORD){
                let userData = { userName, password}
                dispatch(loggedIn(userData))
                props.history.push('/home')
            }else{
                setinvalidDataError(true)
                setTimeout(()=>{setinvalidDataError(false)},1000)
                setUserName('')
                setPassword('')
            }

        }else{
            validatePassword()
            validateUserName()
        }

    }


    return (
      <div className=" card container shadow-lg rounded" style={{width : '40%', marginTop:'15%' }}>
            <form className="mt-5 pd-5">
            {
                invalidDataError && 
                <div class="alert alert-danger alert-dismissible fade show">
                     Invalid username and password.
                    <button type="button" onClick={()=>setinvalidDataError(false)} class="close" data-dismiss="alert">&times;</button>
                </div>

            } 
            <TextInput
                label = "Username"
                type = "text"
                name = "userName"
                value = {userName}
                onChange = {changeUserNameInput}
                onBlur = {validateUserName}
                error = {errorUserName}
                errorMessage = "Invalid username"
                marginRight = "25%"
                labelStyle = "col-xl-3 col-form-label"
                inputStyle = "col-xl-9"
                placeholder = ''
                loginField = {true}
            />
            <TextInput
                label = "Password"
                type = "password"
                name = "password"
                value = {password}
                onChange = {changePasswordInput}
                onBlur = {validatePassword}
                error = {errorPassword}
                errorMessage = "Invalid password"
                marginRight = "25%"
                labelStyle = "col-xl-3 col-form-label"
                inputStyle = "col-xl-9"
                placeholder = ''
                loginField = {true}
            />
            <div className="form-group row">
                <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary shadow" onClick={onAuthenticate}>Sign in</button>
                </div>
            </div>
        </form>
      </div>
    );
}

export default Login;