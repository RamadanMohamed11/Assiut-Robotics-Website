import React, { useRef, useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

const hrMembers = [
  {
    id: 1,
    name: "Youssef AbdelAal",
    role: "HR",
    image: "https://res.cloudinary.com/dhjyfpw6f/image/upload/v1737732272/WhatsApp_Image_2025-01-24_at_17.19.58_76d9da22_w1xclb.jpg",
    bio: "Faculty of Engineering, Department of Electrical Engineering, Power Section.",
    linkedin: "https://www.linkedin.com/in/youssef-abdelaal-007558289/",
    whatsapp: "https://wa.me/+201147312206"
  },
  {
    id: 2,
    name: "Mohamed Samy",
    role: "HR",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "Faculty of Engineering, Department of Electrical Engineering, Power Section.",
    linkedin: "https://linkedin.com",
    whatsapp: "https://wa.me/+201094793331"
  },
];

const HRs = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

  return (
    <section className="py-20 bg-gradient-to-b from-blue-900 to-purple-900 overflow-hidden relative">
      <div className="absolute inset-0 geometric-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/50"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className={`text-5xl font-bold text-white mb-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            Our HR Team
          </h2>
          <div className={`w-24 h-1 bg-purple-500 mx-auto rounded-full animate-glow ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} 
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
            onClick={() => scrollTo(Math.min(hrMembers.length - 1, activeIndex + 1))}
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
            {hrMembers.map((member) => (
              <div 
                key={member.id}
                className="flex-none w-full md:w-[calc(100%/3)] snap-center px-4"
              >
                <div 
                  className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center h-full border border-white/10 hover:border-purple-400/50 transition-all duration-500 ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${member.id * 0.2}s` }}
                >
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-purple-500 rounded-full animate-pulse-slow opacity-20"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full relative z-10 animate-float border-4 border-white/20 hover:border-purple-400 transition-colors duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-rotate opacity-20"></div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-purple-200 mb-3 shimmer">{member.role}</p>
                  <p className="text-gray-300 mb-6">{member.bio}</p>
                  
                  <div className="flex justify-center space-x-4">
                    {[
                      { icon: <Github size={20} />, href: member.github, label: "GitHub" },
                      { icon: <Linkedin size={20} />, href: member.linkedin, label: "LinkedIn" },
                      { icon: <Mail size={20} />, href: member.email, label: "Email" },
                      { icon: <MessageCircle size={20} />, href: member.whatsapp, label: "WhatsApp" }
                    ].map((social, i) => (
                      social.href && (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
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

          <div className="flex justify-center mt-8 space-x-2">
            {hrMembers.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-purple-500 w-6' 
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

export default HRs;