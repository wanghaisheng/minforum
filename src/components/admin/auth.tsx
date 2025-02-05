import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import toast, { Toaster } from 'react-hot-toast';
import { userProp } from 'interfaces/user';

type authProps = {
  children: JSX.Element | JSX.Element[] | string;
  roles: string[];
};

const Auth = (prop: authProps) => {
  const router = useRouter();
  const cookie = parseCookies();
  const [user, setUser] = useState<userProp>({ id: '', role: '' });

  useEffect(() => {
    let user: any = cookie;
    user = user && user._w_auth ? JSON.parse(user._w_auth) : null;
    setUser(user);

    console.log(user?.role, prop.roles);

    if (!user && prop.roles.includes(user?.role) === false) {
      toast.error('You are not authorized to access this page', {
        duration: 3000
      });
      router.push('/404');
    }
  }, [router]);

  if (!user && prop.roles.includes(user?.role) === false) {
    return <></>;
  } else {
    return (
      <div>
        <Toaster />
        {prop.children}
      </div>
    );
  }
};

export default Auth;
