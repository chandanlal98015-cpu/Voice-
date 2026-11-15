import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { STORY_CHAPTERS, StoryChapter } from '../data/storyData';
import { InteractiveArtifacts } from './InteractiveArtifacts';
import { StoryIllustration } from './StoryIllustration';

export type FontSizeScale = 'small' | 'medium' | 'large';

interface ChapterReaderProps {
  activeChapterIndex: number;
  onSelectChapter: (index: number) => void;
  fontSize: FontSizeScale;
  isNarrating: boolean;
  narratingChapterId: string | null;
  narratingParagraphIndex: number | null;
  onNarrateChapter: (chapter: StoryChapter) => void;
}

const PROSE_SIZE_CLASSES: Record<FontSizeScale, string> = {
  small: 'text-base leading-relaxed',
  medium: 'text-lg leading-loose',
  large: 'text-xl leading-loose',
};

export function ChapterReader({
  activeChapterIndex,
  onSelectChapter,
  fontSize,
  isNarrating,
  narratingChapterId,
  narratingParagraphIndex,
  onNarrateChapter,
}: ChapterReaderProps) {
  const chapter = STORY_CHAPTERS[activeChapterIndex];
  const hasPrev = activeChapterIndex > 0;
  const hasNext = activeChapterIndex < STORY_CHAPTERS.length - 1;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
      {/* Chapter Index Navigation Rail */}
      <div
        role="tablist"
        aria-label="अध्याय सूची"
        className="grid grid-cols-2 gap-2 border-b border-[#DDD5C7] pb-6 sm:grid-cols-3 lg:grid-cols-6"
      >
        {STORY_CHAPTERS.map((item, idx) => {
          const isActive = idx === activeChapterIndex;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectChapter(idx)}
              className={`flex flex-col items-start rounded-md border px-3.5 py-3 text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                isActive
                  ? 'border-[#1E3A8A] bg-[#F2EDE3] text-[#1C1917]'
                  : 'border-[#E6DFD3] bg-[#FBF9F5] text-[#57524B] hover:border-[#C9BFA9] hover:text-[#1C1917]'
              }`}
            >
              <span
                className={`text-xs font-medium tabular-nums ${
                  isActive ? 'text-[#1E3A8A]' : 'text-[#57524B]'
                }`}
              >
                अध्याय {item.numberLabel}
              </span>
              <span className="mt-1 line-clamp-1 w-full font-editorial text-sm font-semibold">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* 70 / 30 Asymmetric Editorial Reading Canvas */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Main Essay / Story Body (70%) */}
        <article className="lg:col-span-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDD5C7] pb-5">
            <div>
              <p className="text-xs font-medium text-[#57524B]">
                {chapter.subtitle} · {chapter.setting}
              </p>
              <h2 className="mt-2 font-editorial text-3xl font-bold text-[#1C1917] sm:text-4xl">
                {chapter.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNarrateChapter(chapter)}
              className="inline-flex items-center gap-2 rounded-md border border-[#DDD5C7] bg-[#F2EDE3] px-3.5 py-2 text-xs font-medium text-[#1C1917] whitespace-nowrap shrink-0 transition-colors hover:border-[#1E3A8A] hover:text-[#1E3A8A] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
            >
              <Volume2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>
                {isNarrating && narratingChapterId === chapter.id
                  ? 'अध्याय पढ़ना रोकें'
                  : 'यह अध्याय सुनें'}
              </span>
            </button>
          </div>

          <StoryIllustration
            src={chapter.illustration}
            alt={chapter.illustrationAlt}
            caption={chapter.figureCaption}
            className="mt-8"
          />

          <div className="mt-8 max-w-prose space-y-6">
            {chapter.paragraphs.map((paragraph, pIdx) => {
              const isSpoken =
                isNarrating &&
                narratingChapterId === chapter.id &&
                narratingParagraphIndex === pIdx;

              return (
                <p
                  key={pIdx}
                  className={`prose-hindi text-[#1C1917] transition-colors duration-200 ${
                    PROSE_SIZE_CLASSES[fontSize]
                  } ${pIdx === 0 ? 'drop-cap-hindi' : ''} ${
                    isSpoken ? 'rounded-sm bg-[#EFE9DD] px-3 py-2 -mx-3' : ''
                  }`}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {chapter.interactiveType && (
            <InteractiveArtifacts
              type={chapter.interactiveType}
              onAdvanceChapter={
                hasNext
                  ? () => onSelectChapter(activeChapterIndex + 1)
                  : undefined
              }
            />
          )}

          {/* Chapter Bottom Pagination */}
          <div className="mt-10 flex items-center justify-between border-t border-[#DDD5C7] pt-6">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={() => hasPrev && onSelectChapter(activeChapterIndex - 1)}
              className="inline-flex items-center gap-2 rounded-md border border-[#DDD5C7] bg-[#FBF9F5] px-4 py-2 text-sm font-medium text-[#1C1917] whitespace-nowrap shrink-0 transition-colors hover:bg-[#F2EDE3] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
            >
              <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>पिछला अध्याय</span>
            </button>

            <span className="text-xs font-medium tabular-nums text-[#57524B]">
              अध्याय {chapter.numberLabel} / ०६
            </span>

            <button
              type="button"
              disabled={!hasNext}
              onClick={() => hasNext && onSelectChapter(activeChapterIndex + 1)}
              className="inline-flex items-center gap-2 rounded-md bg-[#1E3A8A] px-4 py-2 text-sm font-medium text-[#FBF9F5] whitespace-nowrap shrink-0 transition-colors hover:bg-[#172C6B] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
            >
              <span>अगला अध्याय</span>
              <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </article>

        {/* Margin Notes & Glossary Sidebar (30%) */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-8 border-t border-[#DDD5C7] pt-6 lg:border-t-0 lg:border-l lg:border-[#DDD5C7] lg:pl-8 lg:pt-0">
            <div>
              <p className="text-xs font-medium text-[#78350F]">
                संपादकीय टिप्पणी
              </p>
              <h3 className="mt-1.5 font-editorial text-lg font-semibold text-[#1C1917]">
                {chapter.marginNoteTitle}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#57524B]">
                {chapter.marginNoteText}
              </p>
            </div>

            <div className="border-t border-[#DDD5C7] pt-6">
              <p className="text-xs font-medium text-[#57524B]">
                शब्दावली एवं अर्थ
              </p>
              <dl className="mt-4 divide-y divide-[#E6DFD3]">
                {chapter.glossary.map((item) => (
                  <div key={item.word} className="py-3 first:pt-0 last:pb-0">
                    <dt className="font-editorial text-sm font-semibold text-[#1C1917]">
                      {item.word}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[#57524B]">
                      {item.meaning}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
