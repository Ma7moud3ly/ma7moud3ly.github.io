/* ==========================================================================
   site-data.js
   The chapter manifest (course content). Every page loads this before the
   engine, which reads it to build the sidebar, prev/next nav, and landing grid.
   Loaded via <script> so it works on file:// and http alike.
   Paths are relative to the language root; the engine prefixes them per page.
   ========================================================================== */

window.SITE = window.SITE || {};

window.SITE.META = {
  title: "دليل Docker بالعربية",
  subtitle: "من الصفر إلى الإنتاج",
};

window.SITE.CHAPTERS = [
  {
    n: 1,
    slug: "docker-fundamentals",
    file: "chapters/01-docker-fundamentals.html",
    title: "أساسيات Docker",
    summary: "لماذا Docker؟ المشكلات التي يحلّها، الفرق بين الأجهزة الافتراضية والحاويات، ومعمارية Docker.",
    topics: ["Why Docker", "VMs", "Containers", "Images", "Architecture"],
  },
  {
    n: 2,
    slug: "installation-cli",
    file: "chapters/02-installation-cli.html",
    title: "التثبيت وواجهة الأوامر",
    summary: "تثبيت Docker Desktop وWSL، والأوامر الأساسية للتعامل مع Docker من الطرفية.",
    topics: ["Docker Desktop", "WSL", "docker version", "hello-world", "CLI"],
  },
  {
    n: 3,
    slug: "images",
    file: "chapters/03-images.html",
    title: "الـ Images",
    summary: "كيف تُبنى الـ Images من طبقات، والتعامل مع Docker Hub عبر pull وpush وtag.",
    topics: ["Images", "Layers", "Registries", "Docker Hub", "pull", "push"],
  },
  {
    n: 4,
    slug: "containers",
    file: "chapters/04-containers.html",
    title: "الحاويات (Containers)",
    summary: "دورة حياة الحاوية: الإنشاء والتشغيل والإيقاف، مع السجلات والفحص والدخول إليها.",
    topics: ["run", "start", "stop", "logs", "inspect", "exec"],
  },
  {
    n: 5,
    slug: "dockerfile",
    file: "chapters/05-dockerfile.html",
    title: "Dockerfile",
    summary: "كتابة Dockerfile خطوة بخطوة وفهم كل تعليمة من FROM حتى ENTRYPOINT.",
    topics: ["FROM", "WORKDIR", "COPY", "RUN", "CMD", "ENTRYPOINT"],
  },
  {
    n: 6,
    slug: "volumes",
    file: "chapters/06-volumes.html",
    title: "التخزين (Volumes)",
    summary: "حفظ البيانات خارج الحاوية باستخدام Named Volumes وBind Mounts مع PostgreSQL.",
    topics: ["Named volumes", "Bind mounts", "Persistence", "PostgreSQL"],
  },
  {
    n: 7,
    slug: "networking",
    file: "chapters/07-networking.html",
    title: "الشبكات (Networking)",
    summary: "كيف تتواصل الحاويات معًا عبر شبكات Bridge وDNS الداخلي ومنافذ التوصيل.",
    topics: ["Bridge", "Host", "DNS", "Port Mapping"],
  },
  {
    n: 8,
    slug: "compose",
    file: "chapters/08-compose.html",
    title: "Docker Compose",
    summary: "إدارة عدة حاويات بملف واحد: services وnetworks وvolumes ومتغيرات البيئة.",
    topics: ["compose.yaml", "Services", "Networks", "Volumes"],
  },
  {
    n: 9,
    slug: "spring-boot-postgres",
    file: "chapters/09-spring-boot-postgres.html",
    title: "Spring Boot + PostgreSQL",
    summary: "حاويّة تطبيق Spring Boot كامل مع قاعدة PostgreSQL وفحوص السلامة والاستمرارية.",
    topics: ["Containerizing", "PostgreSQL", "Compose", "Health checks"],
  },
  {
    n: 10,
    slug: "interview-questions",
    file: "chapters/10-interview-questions.html",
    title: "أسئلة المقابلات",
    summary: "بنك أسئلة مقابلات Docker الحقيقية مرتّبة حسب الموضوع، مع إجابات دقيقة من الأساسيات حتى الإنتاج.",
    topics: ["Fundamentals", "Images", "Dockerfile", "Networking", "Compose"],
  },
];
