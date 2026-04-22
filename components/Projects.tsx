const projects = [
  {
    title: "프로젝트 이름 1",
    description: "프로젝트에 대한 간단한 설명을 여기에 적어주세요. 어떤 문제를 해결했는지, 어떤 기술을 사용했는지 작성하면 좋습니다.",
    tags: ["React", "Next.js", "TypeScript"],
    gradient: "from-violet-500 to-purple-700",
    link: "#",
  },
  {
    title: "프로젝트 이름 2",
    description: "프로젝트에 대한 간단한 설명을 여기에 적어주세요. 어떤 문제를 해결했는지, 어떤 기술을 사용했는지 작성하면 좋습니다.",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    gradient: "from-pink-500 to-rose-700",
    link: "#",
  },
  {
    title: "프로젝트 이름 3",
    description: "프로젝트에 대한 간단한 설명을 여기에 적어주세요. 어떤 문제를 해결했는지, 어떤 기술을 사용했는지 작성하면 좋습니다.",
    tags: ["Node.js", "Express", "MongoDB"],
    gradient: "from-cyan-500 to-blue-700",
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-16 text-center">
        <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-3">WORK</p>
        <h2 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            프로젝트
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            className="group relative rounded-2xl p-px bg-gradient-to-br from-white/10 to-white/5 hover:from-violet-500/40 hover:to-cyan-500/40 transition-all duration-300"
          >
            <div className="rounded-2xl bg-[#0d0d18] p-6 h-full flex flex-col gap-4">
              {/* 그라디언트 썸네일 */}
              <div
                className={`w-full h-36 rounded-xl bg-gradient-to-br ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <h3 className="text-lg font-semibold text-white">{project.title}</h3>
              <p className="text-sm text-gray-400 flex-1">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
