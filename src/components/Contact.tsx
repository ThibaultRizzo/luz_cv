export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-brand-cream relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-brand-deep/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-brand-deep/10 rounded-full text-brand-deep font-medium text-sm mb-6">
            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2"></span>
            Let&apos;s Connect
          </div>
          <h2 className="font-serif text-5xl md:text-7xl leading-tight text-brand-deep mb-6">
            Ready to create
            <span className="block text-brand-gold italic">something extraordinary?</span>
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
          <p className="text-xl text-brand-deep/80 max-w-3xl mx-auto">
            Whether you&apos;re looking to transform your luxury retail experience or explore new product opportunities, I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-brand-gold/10">
            <h3 className="font-serif text-2xl text-brand-deep mb-6">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brand-deep mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300" 
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-deep mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300" 
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-brand-deep mb-2">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300" 
                  placeholder="Your company"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-deep mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300 resize-none" 
                  placeholder="Tell me about your project or opportunity..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-brand-deep text-brand-cream font-medium py-4 px-6 rounded-xl hover:bg-brand-gold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & CTA */}
          <div className="space-y-8">
            {/* Direct contact */}
            <div className="bg-brand-deep/5 backdrop-blur-sm rounded-2xl p-8 border border-brand-gold/20">
              <h3 className="font-serif text-2xl text-brand-deep mb-6">Get in Touch Directly</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <div className="font-medium text-brand-deep">Email</div>
                    <a href="mailto:nadia.luna@email.com" className="text-brand-gold hover:underline">nadia.luna@email.com</a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">💼</span>
                  </div>
                  <div>
                    <div className="font-medium text-brand-deep">LinkedIn</div>
                    <a href="#" className="text-brand-gold hover:underline">linkedin.com/in/nadialuna</a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <div className="font-medium text-brand-deep">Phone</div>
                    <a href="tel:+33123456789" className="text-brand-gold hover:underline">+33 1 23 45 67 89</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-brand-gold/10 rounded-2xl p-8 border border-brand-gold/30">
              <h3 className="font-serif text-2xl text-brand-deep mb-4">Current Availability</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-brand-deep font-medium">Available for new opportunities</span>
              </div>
              <p className="text-brand-deep/80 mb-6">
                I&apos;m currently exploring exciting product leadership roles in luxury retail and fashion tech. Let&apos;s discuss how I can help transform your business.
              </p>
              <div className="space-y-2 text-sm text-brand-deep/70">
                <div>• Strategic consulting projects</div>
                <div>• Full-time product leadership roles</div>
                <div>• Speaking engagements & workshops</div>
              </div>
            </div>

            {/* Download CV */}
            <div className="text-center">
              <a 
                href="/cv.pdf" 
                download 
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-deep text-brand-cream font-medium rounded-full hover:bg-brand-gold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="text-xl mr-2">📄</span>
                Download Full Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 bg-brand-deep/5 rounded-2xl p-6">
            <div className="text-brand-deep">
              <div className="text-lg font-medium">Response Time</div>
              <div className="text-2xl font-bold text-brand-gold">24h</div>
            </div>
            <div className="w-px h-12 bg-brand-gold/30"></div>
            <div className="text-brand-deep">
              <div className="text-lg font-medium">Based in</div>
              <div className="text-2xl font-bold text-brand-gold">Paris</div>
            </div>
            <div className="w-px h-12 bg-brand-gold/30"></div>
            <div className="text-brand-deep">
              <div className="text-lg font-medium">Languages</div>
              <div className="text-2xl font-bold text-brand-gold">EN • FR</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
