'use client';

import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const Intro = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      setTrail((prevTrail) => {
        const newTrail = [
          { x: e.clientX, y: e.clientY },
          ...prevTrail.slice(0, 19), // Keep last 20 positions
        ];
        return newTrail;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Олон төрлийн хичээл',
      description: 'Спорт, урлаг, боловсролын сургалт',
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Амжилтын баталгаа',
      description: 'Мэргэжлийн багш, батлагдсан арга зүй',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Хүүхдийн хөгжил',
      description: 'Авьяас чадвар, өөртөө итгэх итгэл',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-orange-50 via-white to-purple-50 cursor-none">
      {/* Snake Trail Following Cursor */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {trail.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1 - index * 0.05,
              scale: 1 - index * 0.03,
            }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              left: point.x - 8,
              top: point.y - 8,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: `linear-gradient(135deg, 
                ${index % 3 === 0 ? '#F59E0B' : index % 3 === 1 ? '#A855F7' : '#EC4899'})`,
              boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />

        {/* Bouncing Ball - Basketball */}
        <motion.div className="absolute top-[15%] left-[10%] text-6xl">
          <motion.div initial={{ x: -300, y: -300 }} animate={{ x: 0, y: 0 }} transition={{ duration: 1.5, ease: 'easeOut' }}>
            <motion.div
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                rotate: [0, 360, 720],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.8,
              }}
            >
              🏀
            </motion.div>
          </motion.div>
        </motion.div>

        {/* trophy */}
        <motion.div className="absolute top-[35%] left-[26%] text-5xl">
          <motion.div initial={{ x: -300, y: -100 }} animate={{ x: 0, y: 0 }} transition={{ duration: 1.8, ease: 'easeOut' }}>
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [45, 60, 45],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            >
              🏆
            </motion.div>
          </motion.div>
        </motion.div>

        {/*  Arts */}
        <motion.div className="absolute top-[50%] right-[12%] text-6xl">
          <motion.div initial={{ x: 300 }} animate={{ x: 0 }} transition={{ duration: 2, ease: 'easeOut' }}>
            <motion.div
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2.2,
              }}
            >
              🎭
            </motion.div>
          </motion.div>
        </motion.div>

        {/* bag */}
        <motion.div className="absolute top-[5%] left-[30%] text-6xl">
          <motion.div initial={{ y: -300, x: -200 }} animate={{ y: 0, x: 0 }} transition={{ duration: 2.2, ease: 'easeOut' }}>
            <motion.div
              animate={{
                y: [0, 25, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2.5,
              }}
            >
              🎒
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Genre Icons - Sports */}
        <motion.div className="absolute top-[30%] right-[30%] text-6xl">
          <motion.div initial={{ y: -300, x: 200 }} animate={{ y: 0, x: 0 }} transition={{ duration: 1.6, ease: 'easeOut' }}>
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.8,
              }}
            >
              ⚽
            </motion.div>
          </motion.div>
        </motion.div>

        {/* book */}
        <motion.div className="absolute bottom-[15%] left-[35%] text-6xl">
          <motion.div initial={{ x: -300, y: 300 }} animate={{ x: 0, y: 0 }} transition={{ duration: 2.1, ease: 'easeOut' }}>
            <motion.div
              animate={{
                x: [0, 10, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2.3,
              }}
            >
              📙
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Pushpin */}
        <motion.div className="absolute bottom-[15%] right-[35%] text-5xl">
          <motion.div initial={{ x: 200, y: 200 }} animate={{ x: 0, y: 0 }} transition={{ duration: 1.7, ease: 'easeOut' }}>
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2.4,
              }}
            >
              📌
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Brain */}
        <motion.div className="absolute bottom-[15%] right-[15%] text-6xl">
          <motion.div initial={{ x: 300, y: 200 }} animate={{ x: 0, y: 0 }} transition={{ duration: 2, ease: 'easeOut' }}>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2.7,
              }}
            >
              🧠
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Climbing */}
        <motion.div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-6xl">
          <motion.div initial={{ y: -300, x: 0 }} animate={{ y: 0, x: 0 }} transition={{ duration: 2.2, ease: 'easeOut' }}>
            <motion.div
              animate={{
                y: [0, -30, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2.8,
              }}
            >
              🧗
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative Spiral */}
        <motion.div className="absolute top-[70%] left-[4%] -translate-y-1/2 z-20">
          <motion.div initial={{ x: -300, y: 0 }} animate={{ x: 0, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.5,
              }}
            >
              <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
                {/* Outer circle - Purple */}
                <motion.path
                  d="M100 100C100 85 108 70 122 62C136 54 152 54 166 62C180 70 188 85 188 100C188 115 180 130 166 138C152 146 136 146 122 138C108 130 100 115 100 100"
                  stroke="#A855F7"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 1, 1, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                    times: [0, 0.25, 0.5, 0.7, 1],
                  }}
                />
                {/* Middle circle - Orange */}
                <motion.path
                  d="M100 100C100 92 104 84 112 79C120 74 130 74 138 79C146 84 150 92 150 100C150 108 146 116 138 121C130 126 120 126 112 121C104 116 100 108 100 100"
                  stroke="#F59E0B"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0, 1, 1, 1, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                    times: [0, 0.25, 0.5, 0.7, 0.85, 1],
                  }}
                />
                {/* Inner circle - Pink */}
                <motion.path
                  d="M100 100C100 96 102 92 106 90C110 88 114 88 118 90C122 92 124 96 124 100C124 104 122 108 118 110C114 112 110 112 106 110C102 108 100 104 100 100"
                  stroke="#EC4899"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0, 0, 1, 1, 1, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                    times: [0, 0.25, 0.5, 0.75, 0.85, 0.95, 1],
                  }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative Rainbow */}
        <motion.div className="absolute top-[20%] right-[10%] z-20">
          <motion.div initial={{ y: -300, scale: 0.5 }} animate={{ y: 0, scale: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <motion.div
              animate={{
                y: [0, -25, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            >
              <svg width="160" height="120" viewBox="0 0 250 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                <motion.path
                  d="M40 160C40 160 70 20 125 20C180 20 210 160 210 160"
                  stroke="#86EFAC"
                  strokeWidth="20"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 1, 1, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                    times: [0, 0.2, 0.5, 0.7, 1],
                  }}
                />
                <motion.path
                  d="M55 150C55 150 80 40 125 40C170 40 195 150 195 150"
                  stroke="#EF4444"
                  strokeWidth="18"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0, 1, 1, 1, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                    times: [0, 0.2, 0.4, 0.5, 0.7, 1],
                  }}
                />
                <motion.path
                  d="M70 140C70 140 90 60 125 60C160 60 180 140 180 140"
                  stroke="#FBBF24"
                  strokeWidth="16"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0, 0, 1, 1, 1, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                    times: [0, 0.2, 0.4, 0.6, 0.7, 0.8, 1],
                  }}
                />
                <motion.path
                  d="M85 130C85 130 100 80 125 80C150 80 165 130 165 130"
                  stroke="#60A5FA"
                  strokeWidth="14"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0, 0, 0, 1, 1, 1, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                    times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 0.95, 1],
                  }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Heading */}
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-6">
          <motion.span
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="bg-gradient-to-r from-orange-600 via-purple-600 to-orange-600 bg-clip-text text-transparent bg-[length:200%_auto]"
          >
            SkillsHub
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-xl md:text-2xl lg:text-3xl text-slate-600 mb-4 max-w-3xl mx-auto font-semibold">
          Таны хүүхдийн авьяас, амжилтыг хамтдаа хөгжүүлье
        </motion.p>

        {/* Features */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-slate-200 hover:border-orange-400 transition-all duration-300"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.2,
                }}
                className="inline-block mb-4 text-orange-600"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute -bottom-50 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex flex-col items-center gap-2 text-black-400"
          >
            <span className="text-sm font-medium">Доош гүйлгэх</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
