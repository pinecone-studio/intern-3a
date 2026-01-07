'use client';

import { animate, motion, useMotionValue, useTransform, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImSearch } from 'react-icons/im';

// Counter Animation Component
const AnimatedCounter = ({ target, duration = 2, shouldStart }: { target: number; duration?: number; shouldStart: boolean }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    console.log('Starting counter animation to:', target);

    const controls = animate(count, target, {
      duration,
      ease: 'easeOut',
    });

    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded, target, duration, shouldStart]);

  return <span>{displayValue.toLocaleString()}+</span>;
};

export const Intro = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldStartCounting, setShouldStartCounting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);

    // Calculate total time before stats section finishes animating:
    // delayChildren (0.3s) + staggerChildren * 3 items (0.2s * 3 = 0.6s) + animation duration (1.5s) = 2.4s
    const totalDelay = 300 + 200 * 3 + 1500; // 2.4 seconds

    const timer = setTimeout(() => {
      console.log('Stats animation completed, starting counters');
      setShouldStartCounting(true);
    }, totalDelay);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-orange-50 via-white to-purple-50">
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
        {/* Main Heading - Website Description */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-pink-500 to-purple-600">
            Хүүхдийн дугуйлангын <br className="hidden sm:block" />
            нэгдсэн платформ
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed">Таны хүүхдэд тохирсон спорт, урлаг, боловсролын дугуйланг олоход туслах платформ.</p>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group relative px-10 py-4 bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-orange-500/50 overflow-hidden"
            onClick={() => router.push('/map')}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <ImSearch />
              Дугуйлан хайх
            </span>
            <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20" initial={false} whileHover={{ scale: 1.5 }} transition={{ duration: 0.4 }} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group relative px-10 py-4 bg-linear-to-r from-purple-500 to-indigo-600 text-white rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-purple-500/50 overflow-hidden"
            onClick={() => router.push('/sign-in')}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <LogIn /> Нэвтрэх
            </span>
            <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20" initial={false} whileHover={{ scale: 1.5 }} transition={{ duration: 0.4 }} />
          </motion.button>
        </motion.div>

        {/* Stats Section with Animated Counters */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          {/* Customers */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300"
          >
            <div className="text-5xl mb-2">👨‍👩‍👧‍👦</div>
            <div className="text-4xl font-bold text-orange-600 mb-2">
              <AnimatedCounter target={5000} duration={2.5} shouldStart={shouldStartCounting} />
            </div>
            <div className="text-lg font-semibold text-slate-700">Хэрэглэгчид</div>
          </motion.div>

          {/* Teachers */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300"
          >
            <div className="text-5xl mb-2">👨‍🏫</div>
            <div className="text-4xl font-bold text-purple-600 mb-2">
              <AnimatedCounter target={300} duration={2.5} shouldStart={shouldStartCounting} />
            </div>
            <div className="text-lg font-semibold text-slate-700">Багш нар</div>
          </motion.div>

          {/* Clubs */}
          <motion.div whileHover={{ scale: 1.05, y: -5 }} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-pink-200 hover:border-pink-400 transition-all duration-300">
            <div className="text-5xl mb-2">🏫</div>
            <div className="text-4xl font-bold text-pink-600 mb-2">
              <AnimatedCounter target={150} duration={2.5} shouldStart={shouldStartCounting} />
            </div>
            <div className="text-lg font-semibold text-slate-700">Дугуйлан</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
