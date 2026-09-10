// Web Audio API synthesized sound effects - zero external audio files needed

const STORAGE_KEY = "dyslexiaquest_sound_enabled";

function getStoredSoundPreference() {
  if (typeof window === "undefined") return true;
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (item !== null) {
      return item === "true";
    }
  } catch {}
  return true;
}

let audioCtx = null;
let soundEnabled = getStoredSoundPreference();

// Global interceptor for window.speechSynthesis to guarantee zero speech when muted
if (typeof window !== "undefined" && window.speechSynthesis) {
  try {
    const nativeSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
    window.speechSynthesis.speak = function (utterance) {
      if (!isSoundEnabled()) {
        // Silently drop speech while globally muted
        return;
      }
      return nativeSpeak(utterance);
    };
  } catch (e) {
    console.warn("Could not wrap speechSynthesis.speak:", e);
  }
}

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!soundEnabled) return null;

  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled() {
  return soundEnabled;
}

/**
 * Immediately stop all application audio: SpeechSynthesis narration, Web Audio, and media elements.
 */
export function stopAllAudio() {
  // 1. Cancel SpeechSynthesis narration immediately
  if (typeof window !== "undefined" && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }

  // 2. Suspend Web Audio Context immediately
  if (audioCtx && audioCtx.state === "running") {
    try {
      audioCtx.suspend();
    } catch {}
  }

  // 3. Pause any media elements in the DOM
  if (typeof document !== "undefined") {
    try {
      const mediaEls = document.querySelectorAll("audio, video");
      mediaEls.forEach((el) => {
        try {
          el.pause();
          el.currentTime = 0;
        } catch {}
      });
    } catch {}
  }
}

/**
 * Toggle or set the global sound state.
 * Syncs with localStorage and dispatches a window event for header/UI synchronization.
 */
export function toggleSound(forcedState) {
  const next = forcedState !== undefined ? Boolean(forcedState) : !soundEnabled;
  soundEnabled = next;

  // Persist preference
  try {
    localStorage.setItem(STORAGE_KEY, soundEnabled ? "true" : "false");
  } catch {}

  if (!soundEnabled) {
    stopAllAudio();
  } else {
    if (audioCtx && audioCtx.state === "suspended") {
      try {
        audioCtx.resume();
      } catch {}
    }
  }

  // Broadcast event so all components immediately update their icons and state
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(
        new CustomEvent("dyslexiaquest-audio-toggle", {
          detail: { enabled: soundEnabled },
        })
      );
    } catch {}
  }

  return soundEnabled;
}

// Synaptic impulse chime (when interacting with buttons or cards)
export function playSynapsePulse() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.35);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  } catch {
    // AudioContext blocked or not supported
  }
}

// Subtle hover tick for cards and interactive glyphs
export function playHoverTick() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.05);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // ignore
  }
}

// 3D Letter flip / transformation whoosh
export function playLetterFlip() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(330, now + 0.25);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
  } catch {
    // ignore
  }
}

// Success chime for mini-challenge and quizzes
export function playSuccessChime() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const startTime = now + idx * 0.08;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  } catch {
    // ignore
  }
}

// Diagnostic complete celebration fanfare
export function playDiagnosticFanfare() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const chord = [440, 554.37, 659.25, 880]; // A major
    const now = ctx.currentTime;

    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.8);
    });
  } catch {
    // ignore
  }
}