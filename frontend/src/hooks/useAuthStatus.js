import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkLoading, setCheckLoading] = useState(true);

  //   Get Client from state
  const { client } = useSelector((state) => state.auth);

  //   Run whenever client changes
  useEffect(() => {
    if (client) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckLoading(false);
  }, [client]);

  return { loggedIn, checkLoading };
};
