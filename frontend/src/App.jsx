import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <main className="welcome-page">
      <div className="welcome-glow" />
      <div className="welcome-flower flower-one">❀</div>
      <div className="welcome-flower flower-two">✿</div>
      <div className="welcome-flower flower-three">❀</div>

      <header className="welcome-header">
        <span className="welcome-monogram">J <i>&</i> A</span>
        <span className="welcome-header-label">A CELEBRATION OF LOVE</span>
        <Heart size={19} />
      </header>

      <section className="welcome-content">
        <motion.div
          className="welcome-topline"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Sparkles size={15} />
          <span>YOU ARE CORDIALLY INVITED</span>
          <Sparkles size={15} />
        </motion.div>

        <motion.p
          className="welcome-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          With the blessings of our families
        </motion.p>

        <motion.h1
          className="welcome-names"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          Jasar
          <span>&</span>
          Afrin
        </motion.h1>

        <motion.div
          className="welcome-ornament"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <i />
          <Heart size={17} />
          <i />
        </motion.div>

        <motion.p
          className="welcome-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          Two hearts, one beautiful beginning.
          <br />
          Join us as we celebrate a new chapter of forever.
        </motion.p>

        <motion.div
          className="welcome-envelope-wrap"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <motion.button
            className="welcome-envelope"
            onClick={() => navigate('/invitation')}
            whileHover={{ y: -8, scale: 1.025 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Open Jasar and Afrin's engagement invitation"
          >
            <div className="envelope-back" />
            <div className="envelope-paper">
              <span className="paper-small">WITH LOVE</span>
              <strong>J <i>&</i> A</strong>
              <Heart size={19} />
            </div>
            <div className="envelope-front" />
            <div className="envelope-flap" />
            <div className="envelope-seal">
              <Heart size={20} fill="currentColor" />
            </div>
          </motion.button>

          <motion.span
            className="envelope-instruction"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={13} />
            CLICK TO OPEN YOUR INVITATION
            <Sparkles size={13} />
          </motion.span>
        </motion.div>

        <motion.div
          className="welcome-date"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1 }}
        >
          <span>25</span>
          <div>
            <strong>DECEMBER</strong>
            <small>FRIDAY · 2026</small>
          </div>
        </motion.div>
      </section>

      <footer className="welcome-footer">
        <span>MADE WITH LOVE</span>
        <Heart size={13} fill="currentColor" />
        <span>JASAR & AFRIN · 2026</span>
      </footer>
    </main>
  );
}

export default App;
