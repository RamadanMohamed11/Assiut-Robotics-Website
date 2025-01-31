import React, { useRef, useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { fetchTeamData, TeamMember } from './TeamData';

const About = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [totalSlides, setTotalSlides] = useState(0);
  const [committeeMembers, setCommitteeMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await fetchTeamData();
        const members = data.filter(member => member.as === 'Member' || member.as === 'Head');
        setCommitteeMembers(members);
        setLoading(false);
      } catch (err) {
        setError('Failed to load team members');
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
      const calculateSlides = () => {
        const containerWidth = scrollContainerRef.current.offsetWidth;
        const itemWidth = containerWidth / 3;
        setTotalSlides(Math.ceil(committeeMembers.length / (containerWidth >= 768 ? 3 : 1)));
      };
      
      calculateSlides();
      window.addEventListener('resize', calculateSlides);
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', calculateSlides);
      };
    }
  }, [committeeMembers.length]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollTo = (index) => {
    const element = scrollContainerRef.current;
    const cardWidth = element.offsetWidth;
    element.scrollLeft = cardWidth * index;
    setActiveIndex(index);
  };

  const handleScroll = () => {
    const element = scrollContainerRef.current;
    const index = Math.round(element.scrollLeft / element.offsetWidth);
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center bg-gradient-to-b from-blue-900 to-indigo-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center bg-gradient-to-b from-blue-900 to-indigo-900 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-blue-900 to-indigo-900 overflow-hidden relative">
      <div className="absolute inset-0 geometric-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/50"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-bold text-white mb-3 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            Meet Our Team
          </h2>
          <div className={`w-24 h-1 bg-blue-500 mx-auto rounded-full animate-glow ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} 
               style={{ animationDelay: '0.3s' }}></div>
        </div>
        
        <div className="relative group">
          <button
            onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scrollTo(Math.min(totalSlides - 1, activeIndex + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight size={24} />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onScroll={handleScroll}
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {committeeMembers.map((member, index) => (
              <div 
                key={member.name}
                className="flex-none w-full md:w-1/3 px-2 md:px-3 snap-center"
              >
                <div 
                  className={`relative flex flex-col min-h-[450px] ${
                    member.isHead ? 'transform scale-[1.02]' : ''
                  } ${
                    member.isHead 
                      ? 'bg-gradient-to-br from-blue-900/90 to-indigo-900/90 border-2 border-yellow-400' 
                      : 'bg-white/10'
                  } backdrop-blur-sm rounded-xl p-4 text-center hover:border-blue-400/50 transition-all duration-500 ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {member.isHead && (
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent animate-shine"></div>
                    </div>
                  )}

                  <div className="relative mt-4 mb-3">
                    <div className={`absolute inset-0 rounded-full animate-pulse-slow opacity-20 ${
                      member.isHead ? 'bg-yellow-400' : 'bg-blue-500'
                    }`}></div>
                    <img
                      src={member.imageLink}
                      alt={member.name}
                      className={`w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto relative z-10 animate-float border-4 ${
                        member.isHead 
                          ? 'border-yellow-400 ring-4 ring-yellow-400/30' 
                          : 'border-white/20'
                      } hover:border-blue-400 transition-colors duration-300 object-cover`}
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className={`text-lg md:text-xl font-semibold text-white mb-1 ${
                      member.isHead ? 'text-yellow-400' : ''
                    }`}>{member.name}</h3>
                    <p className={`text-sm md:text-base mb-2 shimmer ${
                      member.isHead ? 'text-yellow-200' : 'text-blue-200'
                    }`}>{member.role}</p>
                    <p className="text-gray-300 mb-4 text-sm md:text-base line-clamp-3">{member.about}</p>
                  </div>
                  
                  <div className="flex justify-center space-x-3 mt-auto pt-3">
                    {[
                      { icon: <Github size={18} />, href: member.github, label: "GitHub" },
                      { icon: <Linkedin size={18} />, href: member.linkedinLink, label: "LinkedIn" },
                      { icon: <Mail size={18} />, href: member.email, label: "Email" },
                      { icon: <MessageCircle size={18} />, href: member.whatsappLink, label: "WhatsApp" }
                    ].map((social, i) => (
                      social.href && (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-gray-300 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full ${
                            member.isHead ? 'hover:text-yellow-400 hover:bg-yellow-400/10' : ''
                          }`}
                          title={social.label}
                        >
                          {social.icon}
                        </a>
                      )
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-blue-500 w-4' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;