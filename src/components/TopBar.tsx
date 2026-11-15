import { Volume2, VolumeX } from 'lucide-react';

interface TopBarProps {
  isNarrating: boolean;
  onToggleNarration: () => void;
}

export function TopBar({ isNarrating, onToggleNarration }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#DDD5C7] bg-[#FBF9F5]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        <a
          href="#prologue"
          className="font-editorial text-lg font-bold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
        >
          रामू चायवाला
        </a>

        <nav
          aria-label="मुख्य नेविगेशन"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57524B]"
        >
          <a
            href="#prologue"
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#1C1917] hover:underline hover:underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
          >
            प्रस्तावना
          </a>
          <a
            href="#chapters"
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#1C1917] hover:underline hover:underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
          >
            अध्याय
          </a>
          <a
            href="#characters"
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#1C1917] hover:underline hover:underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
          >
            पात्र
          </a>
          <a
            href="#moral"
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#1C1917] hover:underline hover:underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
          >
            सीख
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onToggleNarration}
            aria-pressed={isNarrating}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
              isNarrating
                ? 'bg-[#78350F] text-[#FBF9F5] hover:bg-[#5E280A]'
                : 'bg-[#1E3A8A] text-[#FBF9F5] hover:bg-[#172C6B]'
            }`}
          >
            {isNarrating ? (
              <>
                <VolumeX className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>कहानी रोकें</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>कहानी सुनें</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
