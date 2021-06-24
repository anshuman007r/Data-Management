import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { REGEX, USERNAME, PASSWORD } from '../utils/WebUtil' 
import { loggedIn } from '../redux/action'

function Login(props) {
    let [ userName, setUserName ] = useState('')
    let [ password, setPassword ] = useState('') 
    let [ errorUserName, setErrorUserName ] = useState(false)
    let [ errorPassword, setErrorPassword ] = useState(false)
    let [ invalidDataError,setinvalidDataError] = useState(false)
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
      <div className=" card container shadow-lg rounded" style={{width : '45%', marginTop:'15%' }}>
            <form className="mt-5 pd-5">
            {
                invalidDataError && 
                <div class="alert alert-danger alert-dismissible fade show">
                     Invalid username and password.
                    <button type="button" onClick={()=>setinvalidDataError(false)} class="close" data-dismiss="alert">&times;</button>
                </div>

            } 

                <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10 ">
                        <input type="text" name='userName' value={userName} className="form-control shadow" id="inputEmail3" onChange={changeUserNameInput} onBlur={validateUserName}/>
                    </div>
                </div>
                {
                    errorUserName  &&
                    <div className="text-danger text-center" style={{marginTop:-10, marginRight:'50%', fontSize:'14px'}}> Invalid email</div>
                }

                <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10 ">
                        <input type="password" name="password" value={password} className="form-control shadow" id="inputPassword3" onChange={changePasswordInput} onBlur={validatePassword}/>
                    </div>
                </div>
                {
                    errorPassword && 
                    <div className="text-danger text-center" style={{marginTop:-10, marginRight:'47%', fontSize:'14px'}}> Invalid Password</div>
                }

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