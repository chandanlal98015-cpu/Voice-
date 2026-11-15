import { FULL_STORY_PLATES, STORY_CHAPTERS, STORY_MORAL, STORY_MORAL_PREFIX } from '../data/storyData';
import { FontSizeScale } from './ChapterReader';
import { StoryIllustration } from './StoryIllustration';

interface FullStoryViewProps {
  fontSize: FontSizeScale;
  isNarrating: boolean;
  narratingChapterId: string | null;
  narratingParagraphIndex: number | null;
}

const PROSE_SIZE_CLASSES: Record<FontSizeScale, string> = {
  small: 'text-base leading-relaxed',
  medium: 'text-lg leading-loose',
  large: 'text-xl leading-loose',
};

export function FullStoryView({
  fontSize,
  isNarrating,
  narratingChapterId,
  narratingParagraphIndex,
}: FullStoryViewProps) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
      <div className="border-b border-[#DDD5C7] pb-6 text-center">
        <p className="text-xs font-medium text-[#57524B]">
          संपूर्ण पाठ · बिना किसी बदलाव के मूल कथा
        </p>
        <h2 className="mt-2 font-editorial text-3xl font-bold text-[#1C1917] sm:text-4xl">
          रामू चायवाला और असली खजाना
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-2xl space-y-10">
        {STORY_CHAPTERS.map((chapter, cIdx) => {
          const plate = FULL_STORY_PLATES.find(
            (p) => p.afterChapterIndex === cIdx
          );

          return (
            <section key={chapter.id} className="space-y-5">
              <h3 className="font-editorial text-sm font-semibold text-[#78350F]">
                {chapter.numberLabel}. {chapter.title}
              </h3>

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
                    } ${cIdx === 0 && pIdx === 0 ? 'drop-cap-hindi' : ''} ${
                      isSpoken ? 'rounded-sm bg-[#EFE9DD] px-3 py-2 -mx-3' : ''
                    }`}
                  >
                    {paragraph}
                  </p>
                );
              })}

              {plate && (
                <div className="py-4">
                  <StoryIllustration
                    src={plate.image}
                    alt={plate.alt}
                    caption={plate.caption}
                  />
                </div>
              )}
            </section>
          );
        })}

        <div className="border-y border-[#DDD5C7] py-8 text-center">
          <p className="text-xs font-medium text-[#78350F]">
            {STORY_MORAL_PREFIX}
          </p>
          <p className="mt-3 font-editorial text-2xl font-bold leading-relaxed text-[#1C1917]">
            {STORY_MORAL}
          </p>
        </div>
      </div>
    </div>
  );
}
