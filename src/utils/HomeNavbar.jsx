import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
 
export function HomeNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  return (
     <>
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none bg py-2 px-4 lg:px-6 lg:py-3">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="text-3xl mr-4 cursor-pointer py-1.5 font-medium"
          >
            <span className="text-primary-purple">:D</span>
            <span className="text-logo-yellow">o</span>
            <span className="text-logo-orange">o</span>
            <span className="text-primary-purple">d</span>
            <span className="text-logo-rose">l</span>
            <span className="text-logo-green">e</span>
          </Typography>
          <div className="flex items-center gap-4">
          <Button variant="text" size="sm" className="hidden lg:inline-block text-primary-purple">
            Login
          </Button>
          <Button fullWidth size="sm" className="hidden lg:inline-block bg-primary-purple">
               Create an Account
          </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
               
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
              ) : (
                   <svg
                   xmlns="http://www.w3.org/2000/svg"
                   className="h-6 w-6"
                   fill="none"
                   stroke="currentColor"
                   strokeWidth={2}
                   >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <Button variant="outlined" size="sm" fullWidth className="mt-6 mb-2 border-primary-purple text-primary-purple">
            <span>Login</span>
          </Button>
          <Button  variant="filled" size="sm" fullWidth className="mb-2 bg-primary-purple">
            <span>Create an Account</span>
          </Button>
        </Collapse>
      </Navbar>
     </>
  );
}