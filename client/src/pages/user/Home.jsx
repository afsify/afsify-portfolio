import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import UserLayout from "../../components/layout/UserLayout";
import { Parallax } from "../../components/design/Parallax";
import { listProject } from "../../api/services/userService";

function Home() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listProject();
        const data = response.data.data;
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProjectData([]);
        fetchData();
      }
    };
    fetchData();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <UserLayout>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <Parallax projects={projectData} />
      </motion.div>
    </UserLayout>
  );
}

export default Home;
