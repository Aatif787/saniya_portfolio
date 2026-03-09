import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const premiumFonts = [
    'Playfair Display', 'Dancing Script', 'Montserrat', 'Cormorant Garamond', 'Great Vibes',
    'Alex Brush', 'Cinzel', 'Libre Baskerville', 'Allura', 'Pinyon Script',
    'Sacramento', 'Parisienne', 'Quicksand', 'Josefin Sans', 'Lora',
    'Bodoni Moda', 'Italiana', 'Prata', 'Rozha One', 'Marcellus',
    'Monsieur La Doulaise', 'Petit Formal Script', 'Rochester', 'Tangerine',
    'Cardo', 'Crimson Text', 'Old Standard TT', 'Arapey', 'Spectral',
    'Arizonia', 'Bad Script', 'Cookie', 'Damion', 'Dynalight',
    'Euphoria Script', 'Herr Von Muellerhoff', 'Kaushan Script', 'League Script',
    'Meie Script', 'Miss Fajardose', 'Mr De Haviland', 'Niconne', 'Nothing You Could Do',
    'Petit Formal Script', 'Princess Sofia', 'Quintessential', 'Reenie Beanie',
    'Rouge Script', 'Ruge Boogie', 'Ruthie', 'Satisfy', 'Seaweed Script',
    'Shadows Into Light', 'Stalemate', 'Waiting for the Sunrise', 'Yellowtail',
    'Yesteryear', 'Amatic SC', 'Caveat', 'Indie Flower', 'Shadows Into Light',
    'Zeyada', 'Aboreto', 'Almendra Display', 'Antic Didone', 'Bellefair',
    'Brawler', 'Castoro', 'Caudex', 'DM Serif Display', 'Enriqueta',
    'Fanwood Text', 'Gilda Display', 'IM Fell Double Pica', 'Inria Serif',
    'Ibarra Real Nova', 'Jacques Francois', 'Judson', 'Julius Sans One',
    'Kameron', 'Lustria', 'Maitree', 'Maneuse', 'Nanum Myeongjo',
    'Oranienbaum', 'Ortie', 'Petrona', 'Poly', 'Quando',
    'Questrial', 'Rakkas', 'Rasa', 'Rhodium Libre', 'Saira Stencil One',
    'Sanchez', 'Scope One', 'Slabo 27px', 'Solway', 'Suranna',
    'Sura', 'Taviraj', 'Trirong', 'Vesper Libre', 'Vidaloka',
    'Volkhov', 'Vollkorn', 'Yeseva One', 'Zilla Slab', 'Abel',
    'Alice', 'Alike', 'Amaranth', 'Antic', 'Assistant',
    'Balsamiq Sans', 'Belleza', 'Blinker', 'Cantata One', 'Carme',
    'Chivo', 'Comfortaa', 'Dosis', 'Exo 2', 'Fauna One',
    'Federo', 'Fira Sans', 'Gafata', 'Georama', 'Heebo',
    'Inter', 'Jost', 'Kanit', 'Lexend', 'Manrope',
    'Maven Pro', 'Montserrat Alternates', 'Muli', 'Nunito', 'Open Sans',
    'Outfit', 'PT Sans', 'Public Sans', 'Raleway', 'Red Hat Display',
    'Rubik', 'Sen', 'Space Grotesk', 'Syne', 'Urbanist',
    'Varela Round', 'Work Sans', 'Yantramanav', 'Zilla Slab Highlight',
    'Abril Fatface', 'Alfa Slab One', 'Arvo', 'Bebas Neue', 'Bitter',
    'Bree Serif', 'Cabin', 'Domine', 'Fjalla One', 'Fredoka One',
    'Inconsolata', 'Karla', 'Lato', 'Libre Franklin', 'Lobster',
    'Merriweather', 'Noticia Text', 'Oswald', 'Oxygen', 'Pacifico',
    'Patua One', 'Playfair Display SC', 'Poppins', 'Prompt', 'Quattrocento',
    'Righteous', 'Roboto', 'Russo One', 'Source Sans Pro', 'Teko',
    'Ubuntu', 'Zilla Slab', 'Alumni Sans', 'Anton', 'Archivo',
    'Asap', 'Barlow', 'Cairo', 'Catamaran', 'Exo',
    'Hind', 'Josefin Slab', 'Kalam', 'Kufam', 'Libre Caslon Display',
    'Manuale', 'Mukta', 'Nanum Gothic', 'Noto Sans', 'Nunito Sans',
    'Overpass', 'Oxygen', 'Questrial', 'Radio Canada', 'Rajdhani',
    'Recursive', 'Red Hat Mono', 'Sarabun', 'Signika', 'Titillium Web',
    'Vollkorn SC', 'Yanone Kaffeesatz'
];

const SaniyaMorpher = () => {
    const [currentFont, setCurrentFont] = useState(premiumFonts[0]);
    const [nextFont, setNextFont] = useState(premiumFonts[1]);
    const [index, setIndex] = useState(0);
    const [styles, setStyles] = useState({
        rotation: 0,
        size: 1,
        glow: 'rgba(236, 72, 153, 0.4)'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (index + 1) % premiumFonts.length;
            setIndex(nextIndex);
            setCurrentFont(premiumFonts[nextIndex]);

            // Random variations
            setStyles({
                rotation: Math.random() * 10 - 5, // -5 to +5
                size: Math.random() * 0.1 + 0.95, // 0.95 to 1.05
                glow: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 255)}, 0.6)`
            });

            // Pre-load next font
            const futureIndex = (nextIndex + 1) % premiumFonts.length;
            const fontToLoad = premiumFonts[futureIndex];
            const link = document.createElement('link');
            link.href = `https://fonts.googleapis.com/css2?family=${fontToLoad.replace(/ /g, '+')}&display=swap`;
            link.rel = 'stylesheet';
            document.head.appendChild(link);

        }, 1500);

        return () => clearInterval(interval);
    }, [index]);

    // Initial load of the first few fonts
    useEffect(() => {
        const initialFonts = premiumFonts.slice(0, 5);
        initialFonts.forEach(font => {
            const link = document.createElement('link');
            link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap`;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        });
    }, []);

    return (
        <div className="relative inline-block py-4">
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentFont}
                    initial={{ opacity: 0, scale: 0.8, rotate: styles.rotation - 2, y: 10 }}
                    animate={{ opacity: 1, scale: styles.size, rotate: styles.rotation, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, rotate: styles.rotation + 2, y: -10 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                        fontFamily: `'${currentFont}', cursive`,
                        display: 'inline-block',
                        textShadow: `0 0 10px ${styles.glow}, 0 0 20px ${styles.glow}, 0 0 40px rgba(255,255,255,0.2)`,
                        transformStyle: 'preserve-3d',
                        perspective: '1000px',
                        filter: 'brightness(1.2) contrast(1.1)'
                    }}
                    className="text-[clamp(3.5rem,15vw,9rem)] font-bold bg-gradient-to-r from-pink-300 via-gold-400 to-purple-400 bg-clip-text text-transparent selection:bg-purple-500/30 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-tight"
                >
                    Saniya
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
                        animate={{ x: ['-200%', '300%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Sparkle particles */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0],
                                x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                                y: [Math.random() * 100 - 50, Math.random() * 100 - 50]
                            }}
                            transition={{
                                duration: 1 + Math.random(),
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                            style={{ left: '50%', top: '50%' }}
                        />
                    ))}
                </motion.span>
            </AnimatePresence>

            {/* Subtle depth shadow */}
            <motion.span
                className="absolute left-1 top-1 text-[clamp(3rem,15vw,8rem)] font-bold opacity-10 blur-sm -z-10 select-none"
                style={{ fontFamily: `'${currentFont}', cursive`, rotate: styles.rotation }}
                animate={{ scale: styles.size }}
            >
                Saniya
            </motion.span>
        </div>
    );
};

export default SaniyaMorpher;
