import { useEffect } from "react";

const LoginRedirect = () => {
  useEffect(() => {
    if (window.opener) {
      console.log(window.opener.postMessage);
      window.opener.postMessage("asdf", location.origin);
    }
  }, []);
  return <>redirecting...</>;
};

LoginRedirect.getLayout = (page: React.ReactElement) => <>{page}</>;

export default LoginRedirect;
