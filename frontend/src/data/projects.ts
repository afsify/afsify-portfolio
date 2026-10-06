export type ProjectCategory =
  | "Full-stack"
  | "Realtime"
  | "E-commerce"
  | "Dashboard";
export interface ProjectSection {
  title: string;
  body: string;
  points?: readonly string[];
}
export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: ProjectCategory;
  status: "Active development" | "Personal project";
  stack: readonly string[];
  github: string;
  live?: { url: string; label?: string; verifiedOn?: string };
  flagship?: boolean;
  detail?: { intro: string; role: string; sections: readonly ProjectSection[] };
}
export const projects: readonly Project[] = [
  {
    slug: "ekavio",
    title: "EkaVio",
    subtitle: "Multi-Tenant SMB Operations Platform",
    summary:
      "One platform for everyday business operations. Built around organization boundaries, secure sessions and explicit access control.",
    category: "Full-stack",
    status: "Active development",
    flagship: true,
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Docker Compose",
      "Socket.IO",
    ],
    github: "https://github.com/afsify/ekavio",
    live: { url: "https://ekavio.afsify.com/", label: "View staging", verifiedOn: "2026-10-06" },
    detail: {
      intro:
        "A React and TypeScript PWA for small-business operations, backed by an Express API and PostgreSQL. Built around the people, branches and permissions behind everyday work.",
      role: "Personal project · Full-stack development",
      sections: [
        {
          title: "The problem",
          body: "Shops, clinics, salons and service businesses need to coordinate customers, appointments, queues, inventory, dues and attendance. EkaVio brings these workflows together while keeping each organization’s people and records in the right context.",
        },
        {
          title: "My role",
          body: "I design and develop the React/Vite PWA, Express/TypeScript API, data model and delivery tooling as an independent full-stack project. The work spans usable frontend workflows, server-side access control and the migration to a single runtime data store.",
        },
        {
          title: "Designed for organizations and branches",
          body: "An organization can have multiple branches and members. Access is resolved through active membership and branch assignments. Selecting an organization or branch requests a context; the server decides whether that context is allowed.",
        },
        {
          title: "Sessions that can be revoked",
          body: "Refresh credentials travel in HttpOnly cookies. Access JWTs stay in browser memory, while server-side sessions make revocation possible. Protected HTTP requests and realtime connections validate the session and resolve membership before granting access.",
          points: [
            "HttpOnly refresh cookies",
            "In-memory access JWTs",
            "Revocable server-side sessions",
            "Server-validated organization and branch context",
          ],
        },
        {
          title: "Permissions and entitlements",
          body: "RBAC answers what a member may do. Commercial entitlements answer which capabilities an organization has. Keeping these decisions separate lets protected operations check the member’s permission alongside the organization’s module access.",
        },
        {
          title: "One runtime source of truth",
          body: "PostgreSQL is the sole normal runtime data authority, covering identity, commercial entitlements and operational records. Transactional migrations, parity checks and cutover tooling support that transition. MongoDB remains only for explicit legacy migration, reconciliation, archive/recovery and compatibility tooling; normal server startup and readiness use PostgreSQL.",
        },
        {
          title: "Account recovery and invitations",
          body: "Email becomes login and recovery authority only after verification. Account recovery and password changes revoke sessions, while staff invitations let recipients choose their own passwords. These flows have local integration and browser acceptance coverage; hosted email delivery still depends on deployment configuration.",
        },
        {
          title: "Realtime with tenant context",
          body: "Socket.IO supports realtime communication. Context switching reconnects the transport after the server validates the selected organization and branch, so the realtime connection follows the active membership context.",
        },
        {
          title: "A repeatable development foundation",
          body: "Docker Compose and health/readiness checks support predictable startup. Repeatable lint, typecheck, test and build gates are paired with transactional migrations, parity checks, API integration tests and browser acceptance tests using disposable local data.",
        },
        {
          title: "Where it stands",
          body: "EkaVio is in active development with a public staging site. It is for disposable development data and is not approved for real customer data. Hosted recovery and final operational acceptance remain open; local engineering gates do not establish commercial production readiness.",
        },
      ],
    },
  },
  {
    slug: "codisify",
    title: "Codisify Devlearn",
    subtitle: "Learning, connected.",
    summary:
      "A full-stack learning platform bringing courses, developer services and realtime discussions into one place.",
    category: "Full-stack",
    status: "Personal project",
    stack: [
      "React",
      "Redux",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "JWT",
    ],
    github: "https://github.com/afsify/codisify-devlearn",
    live: { url: "https://codisify.vercel.app", verifiedOn: "2026-10-06" },
    detail: {
      intro:
        "An e-learning platform connecting learners with courses, developer services and ongoing discussions.",
      role: "Personal project · Full-stack development",
      sections: [
        {
          title: "The idea",
          body: "Bring course discovery, a purchased-course library and conversations with developers into a connected learning experience.",
        },
        {
          title: "What I built",
          body: "A MERN application with JWT authentication, course and service offerings, a course library and live communication.",
          points: [
            "User authentication and profile management",
            "Course discovery and purchased-course library",
            "Developer service offerings",
            "Socket.IO direct and group discussions",
          ],
        },
        {
          title: "Technical focus",
          body: "Connecting React and Redux state to Express APIs and MongoDB, with Socket.IO for conversations. The project brings multiple user workflows together across frontend and backend.",
        },
      ],
    },
  },
  {
    slug: "chateph",
    title: "Chateph Messenger",
    subtitle: "Conversations in the moment.",
    summary:
      "Realtime, ephemeral messaging built around username-only entry and 24-hour chat sessions.",
    category: "Realtime",
    status: "Personal project",
    stack: [
      "React",
      "Redux",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
    ],
    github: "https://github.com/afsify/chateph-messenger",
    live: { url: "https://chateph.vercel.app", verifiedOn: "2026-10-06" },
    detail: {
      intro:
        "A realtime messaging project exploring short-lived conversations and a lightweight path into chat.",
      role: "Personal project · Full-stack development",
      sections: [
        {
          title: "The idea",
          body: "Start a conversation with a username, connect with active users and keep the experience focused on a 24-hour window.",
        },
        {
          title: "What I built",
          body: "An ephemeral messaging application with a responsive dark interface and Socket.IO-powered conversations.",
          points: [
            "Username-only entry",
            "24-hour account and chat-session model",
            "Active-user discovery",
            "Realtime messaging using Socket.IO",
          ],
        },
        {
          title: "Technical focus",
          body: "Coordinating realtime events with React and Redux UI state, backed by Node.js, Express and MongoDB. The central engineering focus is the lifecycle of a short-lived messaging session.",
        },
      ],
    },
  },
  {
    slug: "afssian",
    title: "Afssian E-Commerce",
    subtitle: "From catalogue to checkout.",
    summary:
      "An electronics storefront connecting product discovery, cart interactions, payments and order management.",
    category: "E-commerce",
    status: "Personal project",
    stack: [
      "Node.js",
      "Express.js",
      "EJS",
      "MongoDB",
      "JavaScript",
      "Bootstrap",
      "Razorpay",
    ],
    github: "https://github.com/afsify/afssian-ecommerce",
    live: { url: "https://afssian.onrender.com/", verifiedOn: "2026-10-06" },
    detail: {
      intro:
        "An electronics e-commerce project spanning the shopping experience and the operational work behind it.",
      role: "Personal project · Full-stack development",
      sections: [
        {
          title: "The idea",
          body: "Connect the storefront to practical commerce workflows: product inventory, an interactive cart, checkout and order tracking.",
        },
        {
          title: "What I built",
          body: "A Node.js and Express application using EJS templates and MongoDB, with Razorpay integration.",
          points: [
            "Product catalogue and stock management",
            "AJAX cart updates",
            "Razorpay, wallet and cash-on-delivery options",
            "Checkout, order tracking and coupons",
            "Product image uploads using Multer",
          ],
        },
        {
          title: "Technical focus",
          body: "Working across server-rendered pages, database-backed commerce flows and payment integration. Frontend interactions use JavaScript and AJAX alongside the EJS templating layer.",
        },
      ],
    },
  },
  {
    slug: "taskent",
    title: "Taskent Dashboard",
    subtitle: "A workspace for tasks.",
    summary:
      "A React dashboard for task management, user tables and interactive charts, built with sample data and a public test API.",
    category: "Dashboard",
    status: "Personal project",
    stack: ["React", "Redux", "Tailwind CSS", "Ant Design", "Chart.js"],
    github: "https://github.com/afsify/taskent-dashboard",
    live: { url: "https://taskent.vercel.app", verifiedOn: "2026-10-06" },
  },
];
export const flagshipProject = projects[0];
export const detailedProjects = projects.filter((project) => project.detail);
export const projectCategories = [
  "All work",
  "Full-stack",
  "Realtime",
  "E-commerce",
  "Dashboard",
] as const;
export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug && project.detail);
}
