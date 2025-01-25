import React, { useRef, useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronLeft, ChevronRight, MessageCircle, Crown, Star } from 'lucide-react';

const committeeMembers = [
  {
    name: "Ramadan Mohamed",
    role: "Committee Head, C, Python, Arduino & Embedded",
    image: "https://res.cloudinary.com/dhjyfpw6f/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1737651433/IMG_20211227_100504_auto_x2_iyrrcg.jpg",
    bio: "Faculty of Engineering, Department of Electrical Engineering, Computer & Control Section.",
    github: "https://github.com/RamadanMohamed11",
    linkedin: "https://www.linkedin.com/in/ramadan-mohamed-31624a220/",
    email: "mailto:ramadan.work010@gmail.com",
    whatsapp: "https://wa.me/+201065728564",
    isHead: true
  },
  {
    name: "Arwa Hassan",
    role: "Vice, Python",
    image: "https://res.cloudinary.com/dhjyfpw6f/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1737651791/fff82686c6fe583253ddd8411980c5e1_as9okv.jpg",
    bio: "Faculty of Engineering, Department of Mechanical Engineering, Mechatronics Section.",
    linkedin: "https://www.linkedin.com/in/arwa-hassan-253425221/",
    whatsapp: "https://wa.me/+201123026677"
  },
  {
    name: "Ahmed Oraby",
    role: "C, Arduino & Embedded (Team Leader ♥️)",
    image: "https://res.cloudinary.com/dhjyfpw6f/image/upload/v1737726528/IMG_20240818_162453_836_axqfd7.jpg",
    bio: "Faculty of Engineering, Department of Electrical Engineering, Computer & Control Section.",
    linkedin: "https://www.linkedin.com/in/ahmed-oraby-6195b7174/",
    whatsapp: "https://wa.me/+201068998965"
  },
  {
    name: "Ahmed AbdElhakeem",
    role: "PCB & Devices",
    image: "https://res.cloudinary.com/dhjyfpw6f/image/upload/v1737726495/Hakeem_uua5cr.jpg",
    bio: "Faculty of Engineering, Department of Electrical Engineering, Communications Section.",
    linkedin: "https://www.linkedin.com/in/ahmedabdelhakeemm/",
    whatsapp: "https://wa.me/+201067182722"
  },
  {
    name: "Karim Abdelsabour",
    role: "Computer Vision & Python",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "Faculty of Engineering, Department of Electrical Engineering, Communications Section.",
    linkedin: "https://www.linkedin.com/in/karim-abdelsabour-gamal-729422237/",
    whatsapp: "https://wa.me/+201024912459"
  },
   {
    name: "Mohamed Yasir",
    role: "ROS & Raspberry",
    image: "https://res.cloudinary.com/dhjyfpw6f/image/upload/v1737738895/WhatsApp_Image_2025-01-24_at_19.06.31_751c66e7_fzg86a.jpg",
    bio: "Faculty of Engineering, Department of Mechanical Engineering, Mechatronics Section.",
    github: "https://github.com/mohamedyasir399",
    linkedin: "https://www.linkedin.com/in/mohamed-yasir-114944231/",
    whatsapp: "https://wa.me/+201207005967",
    email: "mailto:mohmedyasser405@gmail.com",
  },
  {
    name: "Ahmed Mostafa",
    role: "C, Arduino, Embedded, ROS & Raspberry",
    image: "https://res.cloudinary.com/dhjyfpw6f/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1737651250/IMG_20240316_142657_606insta_mychir.jpg",
    bio: "Faculty of Engineering, Department of Electrical Engineering, Computer & Control Section.",
    linkedin: "https://www.linkedin.com/in/a7hmedmbs/",
    whatsapp: "https://wa.me/+201023457165"
  },
  {
    name: "Mohamed Ali",
    role: "Arduino, Digital & Circuits",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "Faculty of Engineering, Department of Electrical Engineering, Computer & Control Section.",
    linkedin: "https://www.linkedin.com/in/mohamed-ali-leefa/",
    whatsapp: "https://wa.me/+201022421272"
  },
  {
    name: "Mohammed Abdelrhim",
    role: "Electronics & Circuits",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "Expert in microcontroller programming and IoT solutions.",
    linkedin: "https://linkedin.com",
    whatsapp: "https://wa.me/+201007552620"
  },
  {
    name: "Ahmed Hussien",
    role: "Embedded Systems Engineer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "Expert in microcontroller programming and IoT solutions.",
    linkedin: "https://linkedin.com",
    whatsapp: "https://wa.me/+201002411218"
  }
];

const About = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
      // Calculate total number of slides based on viewport width
      const calculateSlides = () => {
        const containerWidth = scrollContainerRef.current.offsetWidth;
        const itemWidth = containerWidth / 3; // 3 items per view on desktop
        setTotalSlides(Math.ceil(committeeMembers.length / (containerWidth >= 768 ? 3 : 1)));
      };
      
      calculateSlides();
      window.addEventListener('resize', calculateSlides);
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', calculateSlides);
      };
    }
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
    <section className="py-20 bg-gradient-to-b from-blue-900 to-indigo-900 overflow-hidden relative">
      <div className="absolute inset-0 geometric-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/50"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className={`text-5xl font-bold text-white mb-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
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
                className="flex-none w-full md:w-1/3 px-2 md:px-4 snap-center"
              >
                <div 
                  className={`relative h-full flex flex-col ${
                    member.isHead ? 'transform scale-[1.02]' : ''
                  } ${
                    member.isHead 
                      ? 'bg-gradient-to-br from-blue-900/90 to-indigo-900/90 border-2 border-yellow-400' 
                      : 'bg-white/10'
                  } backdrop-blur-sm rounded-xl p-4 md:p-6 text-center hover:border-blue-400/50 transition-all duration-500 ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    minHeight: '400px'
                  }}
                >
                  {member.isHead && (
                    <>
                      
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent animate-shine"></div>
                      </div>
                    </>
                  )}

                  <div className="relative mt-6 mb-4">
                    <div className={`absolute inset-0 rounded-full animate-pulse-slow opacity-20 ${
                      member.isHead ? 'bg-yellow-400' : 'bg-blue-500'
                    }`}></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto relative z-10 animate-float border-4 ${
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
                    <p className="text-gray-300 mb-4 text-sm md:text-base">{member.bio}</p>
                  </div>
                  
                  <div className="flex justify-center space-x-3 mt-auto pt-4">
                    {[
                      { icon: <Github size={18} />, href: member.github, label: "GitHub" },
                      { icon: <Linkedin size={18} />, href: member.linkedin, label: "LinkedIn" },
                      { icon: <Mail size={18} />, href: member.email, label: "Email" },
                      { icon: <MessageCircle size={18} />, href: member.whatsapp, label: "WhatsApp" }
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

          <div className="flex justify-center mt-8 space-x-2">
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