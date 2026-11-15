import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface StoryIllustrationProps {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  aspectClass?: string;
}

export function StoryIllustration({
  src,
  alt,
  caption,
  className = '',
  aspectClass = 'aspect-[4/3]',
}: StoryIllustrationProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`m-0 ${className}`}>
      <div
        className={`relative w-full overflow-hidden rounded-sm border border-[#DDD5C7] bg-[#EFE9DD] ${aspectClass}`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#F2EDE3] to-[#E5DDD0] p-6 text-center">
            <BookOpen className="h-8 w-8 text-[#78350F]/70" strokeWidth={1.5} />
            <p className="max-w-xs font-editorial text-sm text-[#57524B]">
              {alt}
            </p>
          </div>
        )}
      </div>
      <figcaption className="mt-2.5 font-editorial text-xs italic leading-relaxed text-[#57524B]">
        {caption}
      </figcaption>
    </figure>
  );
}
