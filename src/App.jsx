import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaBars, FaTimes } from 'react-icons/fa';
import Tilt from "react-parallax-tilt";

function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [open, setOpen] = useState(false);
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);


  // Refs for videos
  const hardwareRef = useRef(null);
  const embeddedRef = useRef(null);
  const webRef = useRef(null);
  const iotRef = useRef(null);
 
  const projects = [
  {
    title: "Smart Healthcare Monitoring via IoT",
    color: "from-pink-500 to-purple-600",
    href: "https://docs.google.com/document/d/19k1MUN0G0Iueoa53PDX1YkqJf-zGT-lb/edit?usp=drive_link&ouid=101047303582015451854&rtpof=true&sd=true",
    image: "/images/Health.webp",
  },
  {
    title: "Research work on Blockchain-based EHR Management",
    color: "from-blue-500 to-indigo-600",
    href: "https://github.com/mahi200512/MedChain",
    image: "/images/doctor.webp",
  },
  {
    title: "Foot Drop Dorsiflexion Device",
    color: "from-green-500 to-emerald-600",
    href: "https://docs.google.com/presentation/d/1WkIkigwPK7kFEZhOlya7iox4El1uDx5Y/edit?usp=drive_link&ouid=101047303582015451854&rtpof=true&sd=true",
    image: "/images/footDorsi.webp",
  },
  {
    title: "Self-Driving Delivery Robot with IoT Integration",
    color: "from-pink-500 to-purple-600",
    href: "https://github.com/mahi200512/Delivery-Robot",
    image: "/images/delro.webp",
  },
  {
    title: "Research work on Ponzi Detection with ZKP",
    color: "from-yellow-500 to-orange-600",
    href: "https://drive.google.com/file/d/1HF41jk5JNSqnwwQ64I07XOWiecNhlHk0/view?usp=drive_link",
    image: "/images/Ponzi.webp",
  },
  {
    title: "Train Object Detection",
    color: "from-red-500 to-pink-600",
    href: "https://github.com/mahi200512/Train-Crack-and-Object-Detection-using-IoT-and-Multi-sensors",
    image: "/images/Train.webp",
  },
];
  useEffect(() => {
  const handleInteraction = () => setHasInteracted(true);
  window.addEventListener("click", handleInteraction, { once: true });
  return () => window.removeEventListener("click", handleInteraction);
}, []);

  // Loader timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
  if (!loading) return;

  let current = 0;
  const interval = setInterval(() => {
    current += Math.floor(Math.random() * 5) + 1; // Random step 1-5%
    if (current >= 100) {
      current = 100;
      setProgress(current);
      clearInterval(interval);
      // Add a tiny delay so user sees 100% before hiding
      setTimeout(() => setLoading(false), 500);
    } else {
      setProgress(current);
    }
  }, 150);

  return () => clearInterval(interval);
}, [loading]);

  // GSAP mask animation
  useGSAP(() => {
    if (loading || showContent) return;

    const tl = gsap.timeline();
    tl.to('.tmn-mask-group', {
      rotate: 10,
      ease: 'power4.easeInOut',
      transformOrigin: '50% 50%',
      duration: 2,
    }).to('.tmn-mask-group', {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: 'Expo.easeInOut',
      transformOrigin: '50% 50%',
      opacity: 0,
      onComplete: () => {
        setShowContent(true);
      },
    });
  }, [loading, showContent]);

  // Mousemove parallax animation
  useGSAP(() => {
    if (!showContent) return;

    const main = document.querySelector('.main');
    if (!main) return;

    const moveGTA = gsap.quickTo('.imagesdiv .gtaimg', 'x', { duration: 0.4, ease: 'power3.out' });
    const moveSky = gsap.quickTo('.sky', 'x', { duration: 0.5, ease: 'power3.out' });
    const moveBuild = gsap.quickTo('.build', 'x', { duration: 0.6, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      moveGTA(-50 - xMove * 0.4);
      moveSky(-50 - xMove);
      moveBuild(xMove * 0.7);
    };

    main.addEventListener('mousemove', handleMouseMove);
    return () => main.removeEventListener('mousemove', handleMouseMove);
  }, [showContent]);

  return (
    <>
      {/* Loader */}
      <div
  className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 ${
    loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`}
>
  <h2 className="text-2xl font-bold mb-4 tracking-widest text-yellow-400">
    Loading... {progress}%
  </h2>
  <div className="relative w-2/3 max-w-lg h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
    <div
      className="absolute top-0 left-0 h-full bg-yellow-400 transition-all duration-150 ease-linear"
      style={{ width: `${progress}%` }}
    />
  </div>
</div>


      {/* SVG Mask */}
      {!loading && !showContent && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <div className="svg w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                <mask id="tmnMask">
                  <rect width="100%" height="100%" fill="black" />
                  <g className="tmn-mask-group">
                    <text
                      x="50%"
                      y="50%"
                      fontSize="250"
                      textAnchor="middle"
                      fill="white"
                      dominantBaseline="middle"
                      fontFamily="Arial Black"
                    >
                      TMN
                    </text>
                  </g>
                </mask>
              </defs>
              <image
                href="/images/background.webp"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                mask="url(#tmnMask)"
              />
            </svg>
          </div>
        </div>
      )}
      <audio
  ref={audioRef}
  src="/Grand-Theft-Auto-San-Andreas-Theme-Song.mp3"
  autoPlay
  loop
  muted
/>
<button
  onClick={() => {
  const audio = audioRef.current;
  if (!audio) return;

  if (!hasInteracted) {
    alert("Please click anywhere on the page first to enable audio.");
    return;
  }

  if (isMuted) {
    audio.muted = false;
    audio.play().catch(() => {
      alert("Browser blocked autoplay with sound. Please try again.");
    });
    setIsMuted(false);
  } else {
    audio.muted = true;
    setIsMuted(true);
  }
}}

  className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-lg transition duration-300 flex items-center space-x-2"
>
  {isMuted ? (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.586 3.586A2 2 0 018 5v10a2 2 0 001.586 1.914l4.828-4.828A2 2 0 0015 12V8a2 2 0 00-.586-1.414l-4.828-4.828z" />
      </svg>
      <span>Unmute</span>
    </>
  ) : (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      <span>Mute</span>
    </>
  )}
</button>
      {/* Main Content */}
      {showContent && (
        <div className="main w-full bg-black">
          <div className="landing w-full h-screen bg-black overflow-hidden">
            {/* Navbar */}
            <div className="navbar absolute z-10 w-full py-4 px-4 top-0 left-0 flex justify-between items-center">
              <div className="logo">
                <h3 className="text-white text-2xl font-extrabold tracking-widest uppercase select-none">
                  &lt;/&gt; TMN
                </h3>
              </div>
              <div className="hidden md:flex space-x-6 text-white font-semibold">
                <a href="#projects" className="hover:text-yellow-300 transition-all">Projects</a>
                <a href="#internship" className="hover:text-yellow-300 transition-all">Experience</a>
                <a href="#achievements" className="hover:text-yellow-300 transition-all">Achievements</a>
                <a href="#blog" className="hover:text-yellow-300 transition-all">Blogs</a>
                <a href="#contact" className="hover:text-yellow-300 transition-all">Contact</a>
              </div>
              <div
                className="md:hidden text-white text-2xl z-50"
                onClick={() => setOpen(!open)}
              >
                {open ? <FaTimes /> : <FaBars />}
              </div>
              {open && (
                <div className="absolute top-full left-0 w-full bg-black/90 text-white flex flex-col items-center space-y-4 py-6 z-40 md:hidden animate-slide-down">
                  <a href="#projects" className="hover:text-yellow-300 transition-all">Projects</a>
                <a href="#internship" className="hover:text-yellow-300 transition-all">Experience</a>
                <a href="#achievements" className="hover:text-yellow-300 transition-all">Achievements</a>
                <a href="#blog" className="hover:text-yellow-300 transition-all">Blogs</a>
                <a href="#contact" className="hover:text-yellow-300 transition-all">Contact</a>
                </div>
              )}
              <a
                href="https://drive.google.com/file/d/1DKHAl-5V-vpjgGpjGmTlnLONjGkb2Wvp/view?usp=drive_link"
                download
                className="hidden md:inline-flex items-center justify-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-xl tracking-wide uppercase transition-all duration-300 neon-glow"
              >
                Download Resume
              </a>
            </div>
            {/* Images */}
            <div className="imagesdiv relative w-full min-h-screen">
              <img
                loading="lazy"
                className="sky scale-[1.2] absolute top-0 left-0 w-full h-full object-cover"
                src="/images/background.webp"
                alt=""
              />
              <img
                className="build scale-[1.2] absolute top-0 left-0 w-full h-full object-cover"
                src="/images/buildings.webp"
                alt=""
                loading="lazy"
              />
              <img
                className="gtaimg absolute top-[80px] sm:w-[500px] sm:h-[200px] md:w-[700px] md:h-[500px] md:bottom-[25%] lg:w-[600px] lg:left-[25%] object-cover"
                src="/images/gta.webp"
                alt=""
                loading="lazy"
              />
              <img
                className="girl absolute bottom-0 left-[20%] sm:h-[200px] sm:w-[200px] md:w-[500px] md:h-[200px] lg:w-[900px] lg:h-[550px] object-contain"
                src="/images/girl.webp"
                alt=""
                loading="lazy"
              />
            
          {/* Bottom Gradient (always visible) */}
<div className="absolute bottom-0 left-0 w-full z-10">
  <div className="h-10 sm:h-16 bg-gradient-to-t from-black to-transparent" />
</div>

{/* Arrow Icon (hidden on mobile) */}
<div
  className="hidden sm:flex absolute bottom-2 left-0 w-full justify-center items-center z-20 cursor-pointer"
  onClick={() => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' })}
>
  <i className="bx bxs-caret-down animate-bounce text-3xl text-white" />
</div>
</div>
            
          </div>
          {/* Banner Section */}
          <div id='skills' className="flex flex-col w-full h-full overflow-y-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-center text-3xl font-extrabold text-white mb-4 tracking-wider uppercase">
              My Technical Skills
            </h2>
            {/* Large Hardware Development */}
            <div className="w-full">
              <div
                className="group relative rounded-lg overflow-hidden shadow-lg border border-gray-700"
                onMouseEnter={() => hardwareRef.current.play()}
                onMouseLeave={() => {
                  hardwareRef.current.pause();
                  hardwareRef.current.currentTime = 0;
                }}
              >
                <video
                  ref={hardwareRef}
                  src="/videos/car.mp4"
                  muted
                  loop
                  preload="none"
                  loading="lazy"
                  playsInline
                  className="w-full h-[150px] md:h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
                  poster="/images/car_TN.webp"
                  
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                    Hardware Development
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full md:space-x-4 space-y-4 md:space-y-0">
              {/* Embedded Systems */}
              <div
                className="w-full md:w-1/3 group relative rounded-lg overflow-hidden shadow-lg border border-gray-700"
                onMouseEnter={() => embeddedRef.current.play()}
                onMouseLeave={() => {
                  embeddedRef.current.pause();
                  embeddedRef.current.currentTime = 0;
                }}
              >
                <video
                  ref={embeddedRef}
                  src="/videos/Aeroplane.mp4"
                  muted
                  loop
                  preload="none"
                  loading="lazy"
                  playsInline
                  className="w-full h-[150px] md:h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
                  poster="/images/aeroplane_TN.webp"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                    Embedded Systems
                  </h3>
                </div>
              </div>

              {/* Web Development */}
              <div
                className="w-full md:w-1/3 group relative rounded-lg overflow-hidden shadow-lg border border-gray-700"
                onMouseEnter={() => webRef.current.play()}
                onMouseLeave={() => {
                  webRef.current.pause();
                  webRef.current.currentTime = 0;
                }}
              >
                <video
                  ref={webRef}
                  src="/videos/nightlight.mp4"
                  muted
                  loop
                  preload="none"
                  loading="lazy"
                  playsInline
                  className="w-full h-[150px] md:h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
                  poster="/images/night_TN.webp"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                    Web Development
                  </h3>
                </div>
              </div>

              {/* IoT Systems */}
              <div
                className="w-full md:w-1/3 group relative rounded-lg overflow-hidden shadow-lg border border-gray-700"
                onMouseEnter={() => iotRef.current.play()}
                onMouseLeave={() => {
                  iotRef.current.pause();
                  iotRef.current.currentTime = 0;
                }}
              >
                <video
                  ref={iotRef}
                  src="/videos/Spray.mp4"
                  muted
                  preload="none"
                  loading="lazy"
                  loop
                  playsInline
                  className="w-full h-[150px] md:h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
                  poster="/images/spray_TN.webp"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                    IoT Systems
                  </h3>
                </div>
              </div>
            </div>
                        </div>
            
            <div id="projects" className="relative w-full bg-black py-12 overflow-hidden">
  <h2 className="text-center text-3xl font-extrabold text-white mb-12 tracking-wider uppercase neon-text">
    My Projects
  </h2>
  <div className="scroll-container flex gap-8 overflow-x-auto scroll-snap-x snap-mandatory px-6">
        {projects.map((project, index) => (
          <Tilt
            key={index}
            glareEnable={true}
            glareMaxOpacity={0.45}
            scale={1.05}
            transitionSpeed={1500}
            className="snap-center"
          >
            <a
              href={project.href}
              className={`w-72 h-80 bg-gradient-to-br ${project.color} relative rounded-xl border-2 border-white/20 shadow-xl hover:shadow-neon group transition-transform duration-500`}
            >
              {/* Overlay flicker */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 rounded-xl z-0" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="h-1/2 w-full overflow-hidden rounded-t-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter blur-xs transition duration-300 group-hover:blur-none"
                    loading='lazy'
                  />
                </div>
                <div className="flex-grow flex items-center justify-center px-3 py-4 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-widest glitch-text">
                    {project.title}
                  </h3>
                </div>
              </div>
            </a>
          </Tilt>
        ))}
      </div>
    </div>
    {/* Internship Section */}
{/* Internship Section */}
<div id="internship" className="relative w-full overflow-hidden">

  {/* Video Background */}
  <video
    src="/videos/20250715_2318_Street Duel Drama_simple_compose_01k07k6rcsedb988jkq8atj77m.mp4" // replace with your video path
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover"
  />
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/70"></div>
  {/* Content */}
<div className="relative z-10 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
  <h2 className="text-center text-3xl font-extrabold text-white mb-12 tracking-wider uppercase neon-text">
    My Internship
  </h2>
  <div className="bg-gradient-to-br from-gray-800/80 to-black/80 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
    <div className="flex flex-col md:flex-row md:items-stretch">
      {/* Image */}
      <div className="md:w-1/3 flex items-center justify-center p-4 bg-black/50 md:mb-0 mb-4">
        <img
          src="/images/MBF.webp"
          alt="Company Logo"
          className="w-24 h-24 md:w-32 md:h-32 object-contain"
          loading='lazy'
        />
      </div>
      {/* Content */}
      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
            Intern - Product Developer
          </h3>
          <p className="text-gray-300 mb-4">
            <strong>Company:</strong> Maker Bhavan Foundation - InventX
            <br />
            <strong>Duration:</strong> May 2025 – July 2025 (6 weeks)
          </p>
          <p className="text-gray-400 mb-5">
            Worked on the development of a wearable assistive device for individuals with foot drop.
            <br />◦ Developed sensor-based detection of gait patterns to trigger ankle dorsiflexion support.
            <br />◦ Implemented microcontroller firmware for signal processing and actuation control.
            <br />◦ Conducted research on existing assistive technologies to inform design choices and validate efficacy.
          </p>
        </div>
        <a
          href="https://drive.google.com/file/d/1msUk0HtVvQXWh-h70WVPD87hXKpq2ZHS/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-xl uppercase tracking-wide transition-all duration-300 neon-glow mt-4"
        >
          View Certificate
        </a>
      </div>
    </div>
  </div>
</div>

</div>

{/* Achievements Section */}
<div id="achievements" className="relative w-full h-screen overflow-hidden">
  {/* Background Video */}
  <video
    src="" // your GTA video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-fill"
  />
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/70"></div>
  
  {/* Content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-widest uppercase mb-8 neon-text">
      My Major Achievements
    </h2>
    <ul className="space-y-4 text-lg md:text-xl text-gray-300 font-medium max-w-3xl">
      <li className="flex items-center justify-center space-x-2">
        <span className="text-yellow-400">⭐</span>
        <span>Published a research paper in <strong>Springer Nature</strong></span>
      </li>
      <li className="flex items-center justify-center space-x-2">
        <span className="text-yellow-400">🎓</span>
        <span><strong>SheFi Scholar</strong> – Participating in global Web3 and blockchain innovation cohort</span>
      </li>
      <li className="flex items-center justify-center space-x-2">
        <span className="text-yellow-400">💡</span>
        <span><strong>Vice Head</strong> – Take da Bait (public speaking club of our college)</span>
      </li>
      <li className="flex items-center justify-center space-x-2">
        <span className="text-yellow-400">🏆</span>
        <span><strong>Senior People Ops Manager</strong> – ECell, IIITNR</span>
      </li>
      <li className="flex items-center justify-center space-x-2">
        <span className="text-yellow-400">🏆</span>
        <span><strong>Developed Conference Website</strong> –IIIT Naya Raipur   <a
    href="https://iciss2026.iiitnr.ac.in/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-3 py-1 text-amber-400 font-semibold rounded-md transition-all duration-300 text-sm md:text-base"
  >
    View Website
  </a> </span>
      </li>
    </ul>
  </div>
  </div>
  {/* Blogs & Videos Section
<div className="relative w-full bg-black py-12 px-4 sm:px-6 lg:px-8">
  <h2 className="text-center text-3xl md:text-4xl font-extrabold text-white mb-12 tracking-widest uppercase neon-text">
    My Blogs & Videos
  </h2>

  <div
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
  >
    {[
      {
        type: "blog",
        title: "How I Built a Foot Drop Assistive Device",
        description:
          "A deep dive into designing, prototyping, and testing a wearable device to improve gait.",
        image: "/images/blog1.webp",
        link: "https://yourbloglink.com",
      },
      {
        type: "video",
        title: "My Project Showcase",
        description:
          "A walkthrough of my IoT and AI-powered prototypes.",
        video: "/videos/yourvideo.mp4",
        poster: "/images/video_poster.webp",
      },
      {
        type: "blog",
        title: "Lessons from Hackathons",
        description:
          "What I learned building under pressure and collaborating with diverse teams.",
        image: "/images/blog2.webp",
        link: "https://yourbloglink2.com",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="group relative rounded-xl overflow-hidden border-2 border-yellow-400/20 shadow-[0_0_30px_rgba(255,255,0,0.1)] bg-gradient-to-br from-gray-900 via-black to-gray-900 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,0,0.4)] transition duration-500 cursor-pointer"
      >
        {item.type === "video" ? (
          <video
            src={item.video}
            muted
            loop
            playsInline
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => {
              e.target.pause();
              e.target.currentTime = 0;
            }}
            poster={item.poster}
            className="w-full h-48 object-cover"
          />
        ) : (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            loading='lazy'
          />
        )}
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/80 transition duration-500" />
        <div className="relative z-10 p-4 flex flex-col h-full justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-2 tracking-widest">
              {item.title}
            </h3>
            <p className="text-gray-300 text-sm">{item.description}</p>
          </div>
          {item.type === "blog" ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded transition duration-300"
            >
              Read More
            </a>
          ) : (
            <button
              onClick={(e) => {
                const video = e.currentTarget.closest("div").querySelector("video");
                video && video.play();
              }}
              className="inline-block mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded transition duration-300"
            >
              Play Video
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
</div> */}
{/* Blogs & Videos Section */}
<div id='blog' className="relative w-full bg-black py-16 px-4 sm:px-6 lg:px-8 text-center">
  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-widest uppercase neon-text mb-6">
    My Blogs & Videos
  </h2>
  <p className="text-yellow-400 text-xl md:text-2xl font-semibold tracking-wide animate-pulse">
    🚧 Coming Soon 🚧
  </p>
</div>


  <div id="contact" className="relative w-full bg-black py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Background image */}
  <img
    src="/images/swag.webp"
    alt="GTA Sticker"
    className="absolute opacity-10 inset-0 w-full h-full object-cover pointer-events-none"
    loading='lazy'
  />
 
  {/* Content */}
  <div className="relative z-10 max-w-3xl mx-auto text-center">
    <h2 className="text-4xl font-extrabold text-white mb-6 uppercase tracking-widest">
      Contact Me
    </h2>
    <p className="text-gray-400 mb-8">
      Feel free to reach out via email or connect on social media.
    </p>
    {/* Contact buttons */}
    <div className="flex justify-center gap-4 flex-wrap">
      <a
        href="mailto:thakur23101@iiitnr.edu.in"
        className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-xl transition-all duration-300"
      >
        Email Me
      </a>
      <a
        href="https://www.linkedin.com/in/thakur-mahima-nuruti-b57532290/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-xl transition-all duration-300"
      >
        LinkedIn
      </a>
    </div>
  </div>
</div>






        </div>
      )}
    </>
  );
}

export default App;
