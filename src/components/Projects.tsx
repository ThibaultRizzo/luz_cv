"use client";

import { useTextContent } from '@/lib/TextContentContext';
import Image from 'next/image';

interface Project {
  title: string;
  subtitle?: string;
  image?: string;
  link?: string;
  tags?: string[];
}

export default function Projects() {
  const { textContent } = useTextContent();

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-brand-deep text-brand-cream scroll-mt-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-60 h-60 bg-brand-cream/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs sm:text-sm mb-4 sm:mb-6 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
            Featured Projects
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
            {textContent.projectsTitle || 'My Projects'}
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>

        {/* Projects grid - responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {(textContent.projects as Project[] | undefined)?.map((project: Project, index: number) => {
            const CardWrapper = project.link ? 'a' : 'div';
            const cardProps = project.link 
              ? { 
                  href: project.link, 
                  target: '_blank', 
                  rel: 'noopener noreferrer',
                  className: 'cursor-pointer'
                } 
              : {};

            return (
              <CardWrapper
                key={index}
                {...cardProps}
              >
                <div
                  className="group relative bg-gradient-to-br from-brand-cream/5 to-brand-gold/5 backdrop-blur-sm rounded-3xl border border-brand-gold/20 hover:border-brand-gold/60 transition-all duration-500 hover:transform hover:-translate-y-2 hover:scale-[1.02] shadow-xl hover:shadow-2xl overflow-hidden h-full flex flex-col"
                >
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 z-10 pointer-events-none"></div>
                  
                  {/* Image section - 60% of card */}
                  <div className="relative w-full h-0 pb-[60%] overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title || 'Project image'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-brand-cream/10 flex items-center justify-center">
                        <span className="text-6xl opacity-50">📁</span>
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content section - 40% of card */}
                  <div className="flex-1 p-6 sm:p-8 flex flex-col relative z-20 justify-start">
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-semibold text-brand-cream mb-2 leading-tight group-hover:text-brand-gold transition-colors duration-300">
                      {project.title || 'Untitled Project'}
                    </h3>

                    {/* Subtitle */}
                    {project.subtitle && (
                      <p className="text-sm sm:text-base text-brand-cream/70 leading-relaxed mb-3">
                        {project.subtitle}
                      </p>
                    )}

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-brand-gold/20 text-brand-gold text-xs font-medium rounded-full border border-brand-gold/30 hover:bg-brand-gold/30 transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Spacer to push link to bottom */}
                    <div className="flex-1"></div>

                    {/* Link indicator */}
                    {project.link && (
                      <div className="mt-4 flex items-center text-brand-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>View Project</span>
                        <svg 
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Hover effect decoration */}
                  <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-brand-gold/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

