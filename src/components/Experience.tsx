export default function Experience() {
  const experiences = [
    {
      role: "Senior Product Owner",
      company: "Maison Lumière",
      period: "2018 - Present",
      location: "Paris, France",
      achievements: [
        "Spearheaded digital transformation resulting in €25M+ revenue increase",
        "Led cross-functional teams of 15+ across 3 countries",
        "Launched omnichannel platform serving 2M+ customers globally",
        "Achieved 40% increase in online conversion rates"
      ],
      highlight: "Transformed traditional luxury retail into digital-first experiences"
    },
    {
      role: "Product Manager",
      company: "RetailTech Innovations",
      period: "2015 - 2018",
      location: "London, UK",
      achievements: [
        "Managed €15M product portfolio across 8 retail brands",
        "Increased customer engagement by 35% through AI-driven personalization",
        "Reduced time-to-market by 50% with agile methodologies",
        "Built and scaled product team from 5 to 20 members"
      ],
      highlight: "Pioneered data-driven product strategies in luxury retail"
    },
    {
      role: "Junior Product Manager",
      company: "Fashion Forward Startup",
      period: "2012 - 2015",
      location: "Milan, Italy",
      achievements: [
        "Co-launched mobile app with 500K+ downloads in first year",
        "Featured in Vogue Business and WWD for innovation",
        "Grew user base by 300% through strategic partnerships",
        "Established product development processes from ground up"
      ],
      highlight: "Laid foundation for product excellence in emerging fashion tech"
    }
  ];

  return (
    <section id="experience" className="py-32 bg-brand-cream relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-deep/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-brand-deep/10 rounded-full text-brand-deep font-medium text-sm mb-6">
            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2"></span>
            Career Journey
          </div>
          <h2 className="font-serif text-5xl md:text-7xl leading-tight text-brand-deep mb-6">
            A decade of
            <span className="block text-brand-gold italic">transformation</span>
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold via-brand-deep/20 to-brand-gold"></div>
            
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-brand-gold rounded-full border-4 border-brand-cream shadow-lg z-10"></div>
                  
                  {/* Content card */}
                  <div className="ml-20 bg-white rounded-2xl shadow-xl p-8 border border-brand-gold/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="mb-4 lg:mb-0">
                        <h3 className="font-serif text-3xl text-brand-deep mb-2">{exp.role}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-brand-gold font-medium">
                          <span className="text-xl">{exp.company}</span>
                          <span className="hidden sm:block">•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <div className="bg-brand-deep/5 px-4 py-2 rounded-full">
                        <span className="text-brand-deep font-medium">{exp.period}</span>
                      </div>
                    </div>

                    {/* Highlight */}
                    <div className="bg-brand-gold/10 rounded-xl p-4 mb-6 border-l-4 border-brand-gold">
                      <p className="text-brand-deep font-medium italic">{exp.highlight}</p>
                    </div>

                    {/* Achievements */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-brand-gold rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-brand-deep/80">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 bg-brand-deep/5 rounded-2xl p-6">
            <div className="text-brand-deep">
              <div className="text-2xl font-bold">10+</div>
              <div className="text-sm uppercase tracking-wide">Years</div>
            </div>
            <div className="w-px h-12 bg-brand-gold/30"></div>
            <div className="text-brand-deep">
              <div className="text-2xl font-bold">€50M+</div>
              <div className="text-sm uppercase tracking-wide">Impact</div>
            </div>
            <div className="w-px h-12 bg-brand-gold/30"></div>
            <div className="text-brand-deep">
              <div className="text-2xl font-bold">25+</div>
              <div className="text-sm uppercase tracking-wide">Products</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
