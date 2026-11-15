import { STORY_CHARACTERS, STORY_MORAL, STORY_MORAL_PREFIX } from '../data/storyData';

export function CharactersAndMoral() {
  return (
    <>
      {/* Characters Editorial Directory */}
      <section
        id="characters"
        className="border-t border-[#DDD5C7] bg-[#F2EDE3]/60 py-14 lg:py-16"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#57524B]">
              कथा के मुख्य स्तंभ
            </p>
            <h2 className="mt-2 font-editorial text-3xl font-bold text-[#1C1917]">
              पात्र परिचय
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#57524B]">
              गाँव के साधारण लोग, जिनकी सादगी, करुणा और एकता इस लोककथा को जीवंत
              बनाती है।
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 border-t border-[#DDD5C7] pt-8 md:grid-cols-2 lg:grid-cols-3">
            {STORY_CHARACTERS.map((character) => (
              <div
                key={character.name}
                className="flex flex-col justify-between border-b border-[#DDD5C7] pb-6 md:border-b-0 md:pb-0"
              >
                <div>
                  <p className="text-xs font-medium text-[#78350F]">
                    {character.role} · {character.trait}
                  </p>
                  <h3 className="mt-1.5 font-editorial text-xl font-bold text-[#1C1917]">
                    {character.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#292524]">
                    {character.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exhibition Moral Pull Quote */}
      <section
        id="moral"
        className="border-t border-[#DDD5C7] bg-[#FBF9F5] py-16 lg:py-20"
      >
        <div className="mx-auto max-w-4xl px-6">
          <div className="border-y border-[#C9BFA9] py-10 text-center">
            <p className="text-xs font-medium tracking-wide text-[#78350F]">
              {STORY_MORAL_PREFIX}
            </p>
            <blockquote className="mt-4 font-editorial text-2xl font-bold leading-relaxed text-[#1C1917] sm:text-3xl">
              “{STORY_MORAL}”
            </blockquote>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#57524B]">
              निस्वार्थ भाव से की गई छोटी-सी सहायता भी पूरे समाज के लिए जीवनदायी
              संपत्ति बन सकती है।
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
