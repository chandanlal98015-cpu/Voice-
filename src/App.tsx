import { useCallback, useEffect, useRef, useState } from 'react';
import { ChapterReader, FontSizeScale } from './components/ChapterReader';
import { CharactersAndMoral } from './components/CharactersAndMoral';
import { FullStoryView } from './components/FullStoryView';
import { StoryHero } from './components/StoryHero';
import { TopBar } from './components/TopBar';
import { STORY_CHAPTERS, STORY_MORAL, STORY_TITLE, StoryChapter } from './data/storyData';

type ReadingMode = 'chapters' | 'full';

export default function App() {
  const [readingMode, setReadingMode] = useState<ReadingMode>('chapters');
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<FontSizeScale>('medium');

  const [isNarrating, setIsNarrating] = useState(false);
  const [narratingChapterId, setNarratingChapterId] = useState<string | null>(null);
  const [narratingParagraphIndex, setNarratingParagraphIndex] = useState<number | null>(null);

  const fallbackTimerRef = useRef<number | null>(null);
  const narrationSessionRef = useRef(0);

  const stopNarration = useCallback(() => {
    narrationSessionRef.current += 1;
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsNarrating(false);
    setNarratingChapterId(null);
    setNarratingParagraphIndex(null);
  }, []);

  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakQueue = useCallback(
    (
      items: { chapterId: string; chapterIndex: number; paragraphIndex: number; text: string }[],
      cursor: number,
      sessionId: number,
      autoAdvanceChapters: boolean
    ) => {
      if (narrationSessionRef.current !== sessionId || cursor >= items.length) {
        if (narrationSessionRef.current === sessionId) {
          stopNarration();
        }
        return;
      }

      const current = items[cursor];
      setNarratingChapterId(current.chapterId);
      setNarratingParagraphIndex(current.paragraphIndex);
      if (autoAdvanceChapters) {
        setActiveChapterIndex(current.chapterIndex);
      }

      const advanceNext = () => {
        if (narrationSessionRef.current !== sessionId) return;
        speakQueue(items, cursor + 1, sessionId, autoAdvanceChapters);
      };

      const hasSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window;

      if (hasSpeech) {
        try {
          const utterance = new SpeechSynthesisUtterance(current.text);
          utterance.lang = 'hi-IN';
          utterance.rate = 0.95;

          const voices = window.speechSynthesis.getVoices();
          const hindiVoice = voices.find((v) => v.lang.toLowerCase().startsWith('hi'));
          if (hindiVoice) {
            utterance.voice = hindiVoice;
          }

          let settled = false;
          const settle = () => {
            if (settled) return;
            settled = true;
            if (fallbackTimerRef.current !== null) {
              window.clearTimeout(fallbackTimerRef.current);
              fallbackTimerRef.current = null;
            }
            advanceNext();
          };

          utterance.onend = settle;
          utterance.onerror = () => {
            // Fallback timed read-along highlight if speech synthesis voice fails
            if (narrationSessionRef.current !== sessionId) return;
            const durationMs = Math.max(2400, current.text.length * 55);
            fallbackTimerRef.current = window.setTimeout(settle, durationMs);
          };

          window.speechSynthesis.speak(utterance);

          // Safety timeout if browser speechSynthesis stalls without firing onend
          const maxDurationMs = Math.max(4500, current.text.length * 95);
          fallbackTimerRef.current = window.setTimeout(settle, maxDurationMs);
        } catch {
          const durationMs = Math.max(2400, current.text.length * 55);
          fallbackTimerRef.current = window.setTimeout(advanceNext, durationMs);
        }
      } else {
        const durationMs = Math.max(2400, current.text.length * 55);
        fallbackTimerRef.current = globalThis.setTimeout(advanceNext, durationMs) as unknown as number;
      }
    },
    [stopNarration]
  );

  const handleToggleGlobalNarration = () => {
    if (isNarrating) {
      stopNarration();
      return;
    }

    const sessionId = narrationSessionRef.current + 1;
    narrationSessionRef.current = sessionId;
    setIsNarrating(true);

    const startChapterIdx = readingMode === 'chapters' ? activeChapterIndex : 0;
    const queue: {
      chapterId: string;
      chapterIndex: number;
      paragraphIndex: number;
      text: string;
    }[] = [];

    for (let c = startChapterIdx; c < STORY_CHAPTERS.length; c++) {
      const chap = STORY_CHAPTERS[c];
      chap.paragraphs.forEach((p, pIdx) => {
        queue.push({
          chapterId: chap.id,
          chapterIndex: c,
          paragraphIndex: pIdx,
          text: p,
        });
      });
    }

    speakQueue(queue, 0, sessionId, readingMode === 'chapters');
  };

  const handleNarrateSingleChapter = (chapter: StoryChapter) => {
    if (isNarrating && narratingChapterId === chapter.id) {
      stopNarration();
      return;
    }

    stopNarration();
    const sessionId = narrationSessionRef.current + 1;
    narrationSessionRef.current = sessionId;
    setIsNarrating(true);

    const chapterIndex = STORY_CHAPTERS.findIndex((c) => c.id === chapter.id);
    const queue = chapter.paragraphs.map((p, pIdx) => ({
      chapterId: chapter.id,
      chapterIndex: chapterIndex === -1 ? 0 : chapterIndex,
      paragraphIndex: pIdx,
      text: p,
    }));

    speakQueue(queue, 0, sessionId, false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectChapter = (idx: number) => {
    if (isNarrating) {
      stopNarration();
    }
    setActiveChapterIndex(idx);
  };

  const progressPercentage =
    readingMode === 'full'
      ? 100
      : Math.round(((activeChapterIndex + 1) / STORY_CHAPTERS.length) * 100);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917]">
      <TopBar
        isNarrating={isNarrating}
        onToggleNarration={handleToggleGlobalNarration}
      />

      <main>
        <StoryHero
          onStartReading={() => {
            setReadingMode('chapters');
            setActiveChapterIndex(0);
            scrollToSection('chapters');
          }}
          onOpenFullStory={() => {
            setReadingMode('full');
            scrollToSection('chapters');
          }}
        />

        {/* Workspace Reading Toolbar */}
        <section
          id="chapters"
          aria-label="पठन नियंत्रण और अध्याय"
          className="border-b border-[#DDD5C7] bg-[#F2EDE3]"
        >
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div
              role="group"
              aria-label="पठन मोड"
              className="inline-flex items-center gap-1 rounded-md border border-[#DDD5C7] bg-[#FBF9F5] p-1"
            >
              <button
                type="button"
                onClick={() => setReadingMode('chapters')}
                className={`rounded px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  readingMode === 'chapters'
                    ? 'bg-[#1E3A8A] text-[#FBF9F5]'
                    : 'text-[#57524B] hover:text-[#1C1917]'
                }`}
              >
                अध्याय अनुसार
              </button>
              <button
                type="button"
                onClick={() => setReadingMode('full')}
                className={`rounded px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  readingMode === 'full'
                    ? 'bg-[#1E3A8A] text-[#FBF9F5]'
                    : 'text-[#57524B] hover:text-[#1C1917]'
                }`}
              >
                संपूर्ण कहानी
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div
                role="group"
                aria-label="अक्षर का आकार"
                className="inline-flex items-center gap-1 rounded-md border border-[#DDD5C7] bg-[#FBF9F5] p-1"
              >
                {(
                  [
                    { key: 'small', label: 'छोटा' },
                    { key: 'medium', label: 'मध्यम' },
                    { key: 'large', label: 'बड़ा' },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setFontSize(option.key)}
                    className={`rounded px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      fontSize === option.key
                        ? 'bg-[#1C1917] text-[#FBF9F5]'
                        : 'text-[#57524B] hover:text-[#1C1917]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-3 text-xs text-[#57524B]">
                <span className="tabular-nums">
                  {readingMode === 'chapters'
                    ? `अध्याय ${STORY_CHAPTERS[activeChapterIndex].numberLabel} / ०६`
                    : 'संपूर्ण पाठ'}
                </span>
                <div className="h-1 w-24 overflow-hidden rounded-full bg-[#DDD5C7]">
                  <div
                    className="h-full bg-[#1E3A8A] transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {readingMode === 'chapters' ? (
          <ChapterReader
            activeChapterIndex={activeChapterIndex}
            onSelectChapter={handleSelectChapter}
            fontSize={fontSize}
            isNarrating={isNarrating}
            narratingChapterId={narratingChapterId}
            narratingParagraphIndex={narratingParagraphIndex}
            onNarrateChapter={handleNarrateSingleChapter}
          />
        ) : (
          <FullStoryView
            fontSize={fontSize}
            isNarrating={isNarrating}
            narratingChapterId={narratingChapterId}
            narratingParagraphIndex={narratingParagraphIndex}
          />
        )}

        <CharactersAndMoral />
      </main>

      <footer className="border-t border-[#DDD5C7] bg-[#F2EDE3] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-editorial text-base font-bold text-[#1C1917]">
              {STORY_TITLE}
            </p>
            <p className="mt-1 text-xs text-[#57524B]">{STORY_MORAL}</p>
          </div>
          <a
            href="#prologue"
            className="text-xs font-medium text-[#1E3A8A] underline-offset-4 hover:underline whitespace-nowrap shrink-0"
          >
            ऊपर वापस जाएँ ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
