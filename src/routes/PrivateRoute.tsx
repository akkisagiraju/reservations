import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  if (!Component) return null;

  // const { user } = useAuth();
  // if (!user.token) {
  //   return <Redirect to="/" />;
  // }

  return (
    <>
      {/* <Navbar /> */}
      <Route {...rest} render={(props) => <Component {...props} />} />
    </>
  );
};

export default PrivateRoute;
