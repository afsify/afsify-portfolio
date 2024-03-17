import { useEffect } from "react";
import PropTypes from "prop-types";
import Footer from "../user/Footer";
import { Navbar } from "../design/Navbar";
import { userPath } from "../../routes/routeConfig";
import { getUser } from "../../api/services/userService";
import {
  HomeFilled,
  MailFilled,
  InfoCircleFilled,
  CustomerServiceFilled,
} from "@ant-design/icons";

const UserLayout = ({ children }) => {
  const logged = localStorage.getItem("userToken") !== null;

  useEffect(() => {
    if (logged) {
      const fetchUserData = async () => {
        try {
          const userResponse = await getUser();
          const encodedUserData = btoa(
            JSON.stringify(userResponse.data.userData)
          );
          localStorage.setItem("userData", encodedUserData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [logged]);

  const userMenu = [
    {
      id: 1,
      name: "Home",
      path: userPath.home,
      icon: <HomeFilled />,
    },
    {
      id: 2,
      name: "Service",
      path: userPath.service,
      icon: <CustomerServiceFilled />,
    },
    {
      id: 3,
      name: "Contact",
      path: userPath.contact,
      icon: <MailFilled />,
    },
    {
      id: 4,
      name: "About",
      path: userPath.about,
      icon: <InfoCircleFilled />,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar navItems={userMenu} />
      <main className="container mx-auto mt-4 px-2 mb-5 min-h-[85vh]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserLayout;
