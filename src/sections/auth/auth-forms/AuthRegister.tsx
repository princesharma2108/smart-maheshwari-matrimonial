import { useEffect, useState, SyntheticEvent, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'api/snackbar';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
// types
import { SnackbarProps } from 'types/snackbar';
import { StringColorProps } from 'types/password';

// assets
import { Eye, EyeSlash } from 'iconsax-react';
import { registerUser } from 'apiServices/authentication';
import { Grid } from '@mui/material';

// ============================|| JWT - REGISTER ||============================ //
interface ResponseData {
  created: false;
  expiresMilliseconds: number;
  matrimonialId: string;
  message: string;
  status: string;
  token: string;
  userId: string;
  username: string;
}
interface ErrorData {
  response: any;
}
export default function AuthRegister() {
  const { register } = useAuth();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [level, setLevel] = useState<StringColorProps>();
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;

    // Load the script only if not already included
    if (!document.querySelector('script[src="https://www.phone.email/sign_in_button_v1.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.phone.email/sign_in_button_v1.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Define listener to capture OTP and user JSON URL
    window.phoneEmailListener = async (userObj: { user_json_url: string; otp: string }) => {
      console.log('userObj', userObj);

      try {
        const response = await fetch(userObj.user_json_url);
        const userData = await response.json();

        if (userData && userData.user_phone_number) {
          setPhoneNumber(userData.user_phone_number);
        } else {
          console.warn('Phone number not found in user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    return () => {
      window.phoneEmailListener = null; // Cleanup
    };
  }, []);
  console.log('phoneNumber', phoneNumber);
  useEffect(() => {
    if (phoneNumber) {
      registerUserAPI(phoneNumber);
    }
  }, [phoneNumber]);

  const registerUserAPI = async (phoneNumber: string) => {
    console.log('inRegisterUserAPI');
    const registerData = {
      phoneNumber: phoneNumber,
      emailAddress: null,
      googleToken: null,
      appVersion: '1.0.4'
    };
    try {
      const response = await registerUser(registerData);
      console.log('response', response);
      const responseData = response.data as ResponseData;
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      openSnackbar({
        open: true,
        message: responseData.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      // window.location.href = '/';
    } catch (error) {
      console.error('Error fetching customers:', error);
      const errorData = error as ErrorData;
      openSnackbar({
        open: true,
        message: errorData.response.data.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      } as SnackbarProps);
    }
  };
  return (
    <>
      {/* Phone Verification Button */}
      <Grid container spacing={3} justifyContent={'center'}>
        <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div ref={buttonRef} className="pe_signin_button" data-client-id="13139718047550239662" style={{ width: '100%' }}></div>
        </div>
      </Grid>
    </>
  );
}
