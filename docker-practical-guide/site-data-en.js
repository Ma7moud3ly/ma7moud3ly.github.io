/* ==========================================================================
   site-data-en.js
   English edition chapter manifest. Mirrors site-data.js (same n/slug/file)
   so the language toggle maps each page to its counterpart. Loaded by /en/.
   ========================================================================== */

window.SITE = window.SITE || {};

window.SITE.META = {
  title: "Docker — A Practical Guide",
  subtitle: "From zero to production",
};

window.SITE.CHAPTERS = [
  {
    n: 1,
    slug: "docker-fundamentals",
    file: "chapters/01-docker-fundamentals.html",
    title: "Docker Fundamentals",
    summary: "Why Docker, the problems it solves, VMs vs containers, images, and Docker's architecture.",
    topics: ["Why Docker", "VMs", "Containers", "Images", "Architecture"],
  },
  {
    n: 2,
    slug: "installation-cli",
    file: "chapters/02-installation-cli.html",
    title: "Installation & the CLI",
    summary: "Install Docker Desktop and WSL, verify it, and learn the basic CLI commands.",
    topics: ["Docker Desktop", "WSL", "docker version", "hello-world", "CLI"],
  },
  {
    n: 3,
    slug: "images",
    file: "chapters/03-images.html",
    title: "Images",
    summary: "How images are built from layers, and working with Docker Hub via pull, push, and tag.",
    topics: ["Images", "Layers", "Registries", "Docker Hub", "pull", "push"],
  },
  {
    n: 4,
    slug: "containers",
    file: "chapters/04-containers.html",
    title: "Containers",
    summary: "The container lifecycle: create, run, stop, remove, plus logs, inspect, and exec.",
    topics: ["run", "start", "stop", "logs", "inspect", "exec"],
  },
  {
    n: 5,
    slug: "dockerfile",
    file: "chapters/05-dockerfile.html",
    title: "Dockerfile",
    summary: "Write a Dockerfile step by step and understand every instruction from FROM to ENTRYPOINT.",
    topics: ["FROM", "WORKDIR", "COPY", "RUN", "CMD", "ENTRYPOINT"],
  },
  {
    n: 6,
    slug: "volumes",
    file: "chapters/06-volumes.html",
    title: "Volumes",
    summary: "Persist data outside the container with named volumes and bind mounts, applied to PostgreSQL.",
    topics: ["Named volumes", "Bind mounts", "Persistence", "PostgreSQL"],
  },
  {
    n: 7,
    slug: "networking",
    file: "chapters/07-networking.html",
    title: "Networking",
    summary: "How containers talk to each other over bridge networks, internal DNS, and port mapping.",
    topics: ["Bridge", "Host", "DNS", "Port Mapping"],
  },
  {
    n: 8,
    slug: "compose",
    file: "chapters/08-compose.html",
    title: "Docker Compose",
    summary: "Manage several containers from one file: services, networks, volumes, and env vars.",
    topics: ["compose.yaml", "Services", "Networks", "Volumes"],
  },
  {
    n: 9,
    slug: "spring-boot-postgres",
    file: "chapters/09-spring-boot-postgres.html",
    title: "Spring Boot + PostgreSQL",
    summary: "Containerize a full Spring Boot app with PostgreSQL, persistence, and health checks.",
    topics: ["Containerizing", "PostgreSQL", "Compose", "Health checks"],
  },
  {
    n: 10,
    slug: "interview-questions",
    file: "chapters/10-interview-questions.html",
    title: "Interview Questions",
    summary: "A bank of real Docker interview questions grouped by topic, with precise answers.",
    topics: ["Fundamentals", "Images", "Dockerfile", "Networking", "Compose"],
  },
];
