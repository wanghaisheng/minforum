import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import toast, { Toaster } from 'react-hot-toast';
import { userProp } from 'interfaces/user';

const Auth = (props: any) => {
  const router = useRouter();
  const cookie = parseCookies();
  const [user, setUser] = useState<any>({ id: '', role: '' });

  useEffect(() => {
    let user: any = cookie;
    user = user && user._w_auth ? JSON.parse(user._w_auth) : null;
    setUser(user);
    if (!user) {
      toast.error('Please login to access this page', {
        duration: 3000
      });
      router.push('/login');
    }
  }, [router]);

  if (!user) {
    return <></>;
  } else {
    return (
      <div>
        <Toaster />
        {props.children}
      </div>
    );
  }
};

export const Authorized = (props: any) => {
  const router = useRouter();
  const cookie = parseCookies();
  const [user, setUser] = useState<userProp>({ id: '', role: '' });

  useEffect(() => {
    let user: any = cookie;
    user = user && user._w_auth ? JSON.parse(user._w_auth) : null;
    setUser(user);
    if (user?.id) {
      router.push('/');
    }
  }, [router]);

  if (user) {
    return <></>;
  } else {
    return (
      <div>
        <Toaster />
        {props.children}
      </div>
    );
  }
};

export default Auth;
