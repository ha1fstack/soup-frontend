import { useEffect } from "react";

const LoginRedirect = () => {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage(true, location.origin);
    }
  }, []);
  return <>redirecting...</>;
};

LoginRedirect.getLayout = (page: React.ReactElement) => <>{page}</>;

export default LoginRedirect;
