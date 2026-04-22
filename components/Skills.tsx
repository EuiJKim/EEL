const skillGroups = [
  {
    category: "Frontend",
    color: "from-violet-500 to-purple-600",
    skills: ["HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    color: "from-pink-500 to-rose-600",
    skills: ["Node.js", "Python", "FastAPI", "Express", "REST API"],
  },
  {
    category: "Tools & Etc",
    color: "from-cyan-500 to-blue-600",
    skills: ["Git", "GitHub", "Docker", "Vercel", "VS Code"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-16 text-center">
        <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-3">TECH</p>
        <h2 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
            기술 스택
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {skillGroups.map((group) => (
          <div key={group.category} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${group.color} mb-5`}>
              {group.category}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-white/30 hover:text-white transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
