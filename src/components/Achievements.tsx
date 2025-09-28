export default function Achievements() {
  const achievements = [
    {
      metric: "+40%",
      description: "Increase in Online Sales",
    },
    {
      metric: "+25%",
      description: "Customer Retention in 1 Year",
    },
    {
      metric: "10+",
      description: "New Boutiques Opened Worldwide",
    },
    {
      metric: "+30%",
      description: "Improvement in Customer Engagement",
    },
  ];

  return (
    <section id="achievements" className="py-20 bg-brand-deep text-brand-cream">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl text-center mb-12">Achievements</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center p-6 border border-brand-gold rounded-lg">
              <p className="font-serif text-5xl font-bold text-brand-gold">{achievement.metric}</p>
              <p className="mt-4 text-lg">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
