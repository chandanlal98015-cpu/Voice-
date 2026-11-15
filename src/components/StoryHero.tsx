import { ArrowDownRight } from 'lucide-react';
import { HERO_CAPTION, HERO_IMAGE, STORY_TITLE } from '../data/storyData';
import { StoryIllustration } from './StoryIllustration';

interface StoryHeroProps {
  onStartReading: () => void;
  onOpenFullStory: () => void;
}

export function StoryHero({ onStartReading, onOpenFullStory }: StoryHeroProps) {
  return (
    <section
      id="prologue"
      className="border-b border-[#DDD5C7] bg-[#FBF9F5] py-12 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#57524B]">
                लोककथा संग्रह · ६ सचित्र अध्याय · ग्राम्य जीवन
              </p>

              <h1 className="mt-4 font-editorial text-4xl font-bold leading-tight text-[#1C1917] sm:text-5xl">
                {STORY_TITLE}
              </h1>

              <p className="mt-6 max-w-xl font-editorial text-lg leading-relaxed text-[#292524]">
                एक छोटे से गाँव में टपकती छत वाली पुरानी दुकान से शुरू हुई यह कहानी
                बताती है कि जब इंसान बिना किसी लालच के दूसरों की मदद करता है, तो
                असली खजाना खुद चलकर उसके सामने आता है।
              </p>
            </div>

            <div className="mt-8 border-t border-[#DDD5C7] pt-6">
              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={onStartReading}
                  className="inline-flex items-center gap-2 rounded-md bg-[#1E3A8A] px-5 py-2.5 text-sm font-medium text-[#FBF9F5] whitespace-nowrap shrink-0 transition-colors hover:bg-[#172C6B] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                >
                  <span>अध्याय १ से पढ़ें</span>
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onOpenFullStory}
                  className="text-sm font-medium text-[#1E3A8A] underline-offset-4 hover:underline whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
                >
                  संपूर्ण कहानी एक साथ पढ़ें
                </button>
              </div>

              <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-[#DDD5C7] pt-5 text-sm">
                <div>
                  <dt className="text-xs text-[#57524B]">मुख्य पात्र</dt>
                  <dd className="mt-1 font-editorial font-semibold text-[#1C1917]">
                    रामू, गीता, छोटू
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#57524B]">पठन समय</dt>
                  <dd className="mt-1 font-editorial font-semibold tabular-nums text-[#1C1917]">
                    लगभग ३ मिनट
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#57524B]">कथा का मूल</dt>
                  <dd className="mt-1 font-editorial font-semibold text-[#1C1917]">
                    परोपकार और एकता
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <StoryIllustration
              src={HERO_IMAGE}
              alt="बारिश की शाम में टपकती छत वाली रामू की पुरानी चाय की दुकान"
              caption={HERO_CAPTION}
              className="flex-1"
              aspectClass="aspect-[4/3] lg:h-full lg:aspect-auto min-h-[280px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
