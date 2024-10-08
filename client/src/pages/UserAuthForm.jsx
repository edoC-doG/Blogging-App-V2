import PageAnimation from '@/common/PageAnimation';
import InputBox from '@/components/InputBox';
import googleIcon from '@/img/google.png';
import { Link, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
// import axios from 'axios';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { UserContext } from '@/App';
// import { storeInSession } from '@/common/session';
import { authWithGoogle } from '@/common/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { apiLogin } from '@/apis/user';
import { signin } from '@/store/user/userSlice';

const UserAuthForm = ({ type }) => {
  const dispatch = useDispatch();
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  const userAuthThroughServer = async (serverRoute, formData) => {
    const rs = await apiLogin(formData);
    if (rs.access_token) {
      dispatch(
        signin({
          isLoggedIn: true,
          current: rs,
          token: rs.access_token,
        })
      );
    } else toast.error('Sign In Failed');
    // axios
    //   .post(
    //     import.meta.env.VITE_SERVER_DOMAIN + serverRoute,
    //     formData
    //   )
    //   .then(({ data }) => {
    //     storeInSession('user', JSON.stringify(data));

    //     setUserAuth(data);
    //   })
    //   .catch(({ response }) => {
    //     toast.error(response.data.error);
    //   });
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();

    authWithGoogle()
      .then((user) => {
        let serverRoute = 'google-auth';

        let formData = {
          access_token: user.accessToken,
        };

        userAuthThroughServer(serverRoute, formData);
      })
      .catch((err) => {
        toast.error('trouble login through google');
        return console.log(err);
      });
  };
  const handleSubmit = (e) => {
    // eslint-disable-next-line no-useless-escape
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
    let serverRoute = type === 'sign-in' ? 'signin' : 'signup';
    e.preventDefault();
    let form = new FormData(document.getElementById('formElement'));
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    let { fullname, username, email, password } = formData;
    if (fullname) {
      if (fullname.length < 3) {
        return toast.error(
          'Fullname must be at least 3 letters long'
        );
      }
    }
    if (username) {
      if (username.length < 3) {
        return toast.error(
          'Username must be at least 3 letters long'
        );
      }
    }
    if (!email.length) {
      return toast.error('Enter email');
    }
    if (!emailRegex.test(email)) {
      return toast.error('Email is invalid');
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        'Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters'
      );
    }
    userAuthThroughServer(serverRoute, formData);
  };
  const { isLoggedIn, current } = useSelector((state) => state.user);
  console.log(current);
  return access_token ? (
    <Navigate to="/" />
  ) : (
    <PageAnimation keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form id="formElement" className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type == 'sign-in' ? 'Welcome back' : 'Join us today'}
          </h1>

          {type != 'sign-in' ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-user"
            />
          ) : (
            ''
          )}

          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
          />

          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
          />

          <button
            className="btn-dark center mt-14"
            type="submit"
            onClick={handleSubmit}
          >
            {type.replace('-', ' ')}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
            onClick={handleGoogleAuth}
          >
            <img src={googleIcon} className="w-5" />
            continue with google
          </button>

          {type == 'sign-in' ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don`t have an account ?
              <Link
                to="/signup"
                className="underline text-black text-xl ml-1"
              >
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member ?
              <Link
                to="/signin"
                className="underline text-black text-xl ml-1"
              >
                Sign in here.
              </Link>
            </p>
          )}
        </form>
      </section>
    </PageAnimation>
  );
  // return( (current || isLoggedIn ) {
  //   <Navigate to="/"/>
  // })
};
UserAuthForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default UserAuthForm;
