import { motion } from "framer-motion";
import Banner from "../../components/user/Banner";
import LazyLoader from "../../components/user/LazyLoader";
import CourseCard from "../../components/user/CourseCard";
import UserLayout from "../../components/layout/UserLayout";
import ProjectCard from "../../components/user/ProjectCard";
import { HoverCard } from "../../components/design/HoverCard";
import { FloatNav } from "../../components/design/FloatNav";
import { ParallaxSetup } from "../../components/design/ParallaxSetup";

function Home() {
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
        <FloatNav />
        <ParallaxSetup />
        <Banner />
        <HoverCard />
        <CourseCard />
        <LazyLoader>
          <ProjectCard />
        </LazyLoader>
      </motion.div>
    </UserLayout>
  );
}

export default Home;
