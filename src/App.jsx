import './App.css'
import isEmail from 'validator/lib/isEmail';
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

const App = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isStrongPass, setIsStrongPass] = useState(false);
    const [focusState, setFocusState] = useState({
      email: false,
      username: false,
      password: false,
    })
    const checkboxRef = useRef(null)
    const [isEightChars, setIsEightChars] = useState(false);
    const [isCapitalise, setIsCapitalise] = useState(false);
    const [isNumAndSpecial, setIsNumAndSpecial] = useState(false);

    const hanldeFocus = (field) => setFocusState(prevFocusState => ({...prevFocusState, [field]: true}));
    const hanldeBlur = (field) => setFocusState(prevFocusState => ({...prevFocusState, [field]: false}));

    useEffect(() => {
      setIsEightChars(password.length >= 8)
      setIsCapitalise(/[a-z]/.test(password) && /[A-Z]/.test(password));
      setIsNumAndSpecial(/[!@#$%^&*(),.?":{}|<>0-9]/.test(password))

      setIsStrongPass(isEightChars && isCapitalise && isNumAndSpecial)
    }, [password, isEightChars, isCapitalise, isNumAndSpecial])

    const handleSubmit = async e => {
      e.preventDefault();

      try {
        if (isStrongPass && checkboxRef.current.checked){
          toast.success('Signup successfully')
        }
        else{
          if (!email.trim() || !username.trim() || !password.trim()) toast.error('Please fill in all fields correctly.')
          else if (!isEmail(email)) toast.error("Invalid email address")
          else if (!isEightChars) toast.error("Password must be at least 8 characters")
          else if (!isCapitalise) toast.error("Password must contain at least one UPPERCASE and one LOWERCASE character")
          else if (!isNumAndSpecial) toast.error("Password must contain at least one number and special character")
          else if (!checkboxRef.current.checked) toast.error("Please agree to the Terms and Conditions")
        }
      } catch (error) {
        console.error(`Error during registration:`, error)
      }
    }

    return (
    <div className="bubbles_bg">
      <div className="container">
        <div className="signup min-h-[95vh] grid items-center">
          <div>
            <div className="text-center flex justify-center items-center gap-4 pb-6">
              <h2 className="text-center font-bold text-xl lg:text-2xl">Register your account</h2>
            </div>
            <form className="form">
              <div className='input flex gap-1 flex-column align-start'>
                  <label style={{ display: focusState.email ? 'block' : 'none'}}>Email</label>
                  <input name='email' type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={!focusState.email ? 'Email' : ''} required onFocus={() => hanldeFocus('email')} onBlur={() => hanldeBlur('email')}/>
              </div>
              <div className='input flex gap-1 flex-column align-start'>
                  <label style={{ display: focusState.username ? 'block' : 'none'}}>Username</label>
                  <input name='username' type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder={!focusState.username ? 'Username' : ''} required onFocus={() => hanldeFocus('username')} onBlur={() => hanldeBlur('username')}/>
              </div>
              <div className='input flex gap-1 flex-column align-start'>
                  <label style={{ display: focusState.password ? 'block' : 'none'}}>Password</label>
                  <input name='password' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={!focusState.password ? 'Password' : ''} required onFocus={() => hanldeFocus('password')} onBlur={() => hanldeBlur('password')}/>
              </div>
              {password && <div className="pt-3 text-gray-500">
                <p className={`lg:pl-8 md:pl-4 ${isStrongPass ? 'text-[#1da466] font-medium' : ''}`}>Strong password must have:</p>
                <ul className='*:list-disc grid justify-center '>
                  <li className={isEightChars ? 'text-[#1da466] font-medium' : ''}>At least 8 characters </li>
                  <li className={isCapitalise ? 'text-[#1da466] font-medium' : ''}>At least one UPPERCASE and one LOWERCASE character</li>
                  <li className={isNumAndSpecial ? 'text-[#1da466] font-medium' : ''}>At least one number and special character</li>
                </ul>
              </div>}
              <div className="checkbox d-flex fw-500"><input ref={checkboxRef} className='mr-2' required type="checkbox"/>I agree to <span>Terms & Conditions</span> </div>
              <button className="btn btn-form" type="submit" onClick={handleSubmit}>Sign Up</button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
    );
}

export default App;