import { useState } from 'react';
import { Compass, Droplets, Flame, MailOpen, PackageOpen } from 'lucide-react';

interface InteractiveArtifactsProps {
  type: 'stove-clue' | 'wooden-box' | 'village-well';
  onAdvanceChapter?: () => void;
}

export function InteractiveArtifacts({
  type,
  onAdvanceChapter,
}: InteractiveArtifactsProps) {
  const [stoveInspected, setStoveInspected] = useState(false);
  const [boxOpened, setBoxOpened] = useState(false);
  const [boxView, setBoxView] = useState<'letter' | 'map'>('letter');
  const [wellCleaned, setWellCleaned] = useState(false);

  if (type === 'stove-clue') {
    return (
      <div className="mt-8 rounded-md border border-[#DDD5C7] bg-[#F2EDE3] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-[#78350F]">
              कथा संकेत · अध्याय ३
            </p>
            <h3 className="mt-1 font-editorial text-lg font-semibold text-[#1C1917]">
              पुराने चूल्हे के पास का रहस्य
            </h3>
            <p className="mt-1 text-sm text-[#57524B]">
              बूढ़े मुसाफिर के गायब होने के बाद रामू ने चूल्हे के पास की मिट्टी को ध्यान से देखा।
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStoveInspected((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-md border border-[#78350F] bg-[#FBF9F5] px-4 py-2 text-sm font-medium text-[#78350F] whitespace-nowrap shrink-0 transition-colors hover:bg-[#78350F] hover:text-[#FBF9F5] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <Flame className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{stoveInspected ? 'संकेत छिपाएँ' : 'चूल्हे के पास देखें'}</span>
          </button>
        </div>

        {stoveInspected && (
          <div className="mt-5 border-t border-[#DDD5C7] pt-4 text-sm leading-relaxed text-[#292524]">
            <p>
              चूल्हे के ठीक बगल में मिट्टी थोड़ी धँसी हुई और पुरानी लग रही है। ऐसा प्रतीत
              होता है कि वर्षों पहले यहाँ कोई वस्तु दबाई गई थी।
            </p>
            {onAdvanceChapter && (
              <button
                type="button"
                onClick={onAdvanceChapter}
                className="mt-3 text-sm font-medium text-[#1E3A8A] underline underline-offset-4 hover:text-[#172C6B] cursor-pointer"
              >
                अगली सुबह जमीन खोदकर देखें (अध्याय ४) →
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  if (type === 'wooden-box') {
    return (
      <div className="mt-8 rounded-md border border-[#DDD5C7] bg-[#F2EDE3] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-[#78350F]">
              खुदाई में मिली वस्तु · अध्याय ४
            </p>
            <h3 className="mt-1 font-editorial text-lg font-semibold text-[#1C1917]">
              पुराना लकड़ी का डिब्बा
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setBoxOpened((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-md bg-[#1E3A8A] px-4 py-2 text-sm font-medium text-[#FBF9F5] whitespace-nowrap shrink-0 transition-colors hover:bg-[#172C6B] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <PackageOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{boxOpened ? 'डिब्बा बंद करें' : 'डिब्बा खोलें'}</span>
          </button>
        </div>

        {!boxOpened ? (
          <p className="mt-3 text-sm text-[#57524B]">
            चूल्हे के पास से निकला लकड़ी का यह डिब्बा मिट्टी से सना है। इसके भीतर क्या
            है, जानने के लिए डिब्बा खोलें।
          </p>
        ) : (
          <div className="mt-5 border-t border-[#DDD5C7] pt-5">
            <div className="inline-flex items-center gap-1 rounded-md border border-[#DDD5C7] bg-[#FBF9F5] p-1">
              <button
                type="button"
                onClick={() => setBoxView('letter')}
                className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  boxView === 'letter'
                    ? 'bg-[#1E3A8A] text-[#FBF9F5]'
                    : 'text-[#57524B] hover:text-[#1C1917]'
                }`}
              >
                <MailOpen className="h-3.5 w-3.5" aria-hidden="true" />
                <span>चिट्ठी पढ़ें</span>
              </button>
              <button
                type="button"
                onClick={() => setBoxView('map')}
                className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  boxView === 'map'
                    ? 'bg-[#1E3A8A] text-[#FBF9F5]'
                    : 'text-[#57524B] hover:text-[#1C1917]'
                }`}
              >
                <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                <span>पुराना नक्शा देखें</span>
              </button>
            </div>

            {boxView === 'letter' ? (
              <div className="mt-4 rounded-sm border border-[#DDD5C7] bg-[#FBF9F5] p-6 text-center">
                <p className="text-xs text-[#57524B]">हस्तलिखित चिट्ठी</p>
                <blockquote className="mt-3 font-editorial text-xl font-semibold leading-relaxed text-[#1C1917]">
                  “जो इंसान बिना लालच के दूसरों की मदद करता है, असली खजाना उसी का होता
                  है।”
                </blockquote>
              </div>
            ) : (
              <div className="mt-4 rounded-sm border border-[#DDD5C7] bg-[#FBF9F5] p-5">
                <p className="mb-3 text-xs font-medium text-[#57524B]">
                  गाँव का पुराना नक्शा — चाय की दुकान से पुराने कुएँ तक का मार्ग
                </p>
                <svg
                  viewBox="0 0 600 220"
                  role="img"
                  aria-label="रामू की चाय की दुकान से बरगद के पेड़ होते हुए गाँव के पुराने कुएँ तक का नक्शा"
                  className="h-auto w-full rounded-sm border border-[#E6DFD3] bg-[#F6F1E7]"
                >
                  <path
                    d="M 75 155 Q 195 160 285 110 T 505 70"
                    fill="none"
                    stroke="#78350F"
                    strokeWidth="2.5"
                    strokeDasharray="7 6"
                  />
                  {/* Tea stall */}
                  <circle cx="75" cy="155" r="8" fill="#1E3A8A" />
                  <text
                    x="75"
                    y="185"
                    textAnchor="middle"
                    className="fill-[#1C1917] text-[13px] font-medium"
                  >
                    रामू की दुकान
                  </text>

                  {/* Banyan tree */}
                  <circle cx="285" cy="110" r="6" fill="#57524B" />
                  <text
                    x="285"
                    y="138"
                    textAnchor="middle"
                    className="fill-[#57524B] text-[12px]"
                  >
                    पुराना बरगद
                  </text>

                  {/* Old Well */}
                  <circle
                    cx="505"
                    cy="70"
                    r="11"
                    fill="none"
                    stroke="#1E3A8A"
                    strokeWidth="2.5"
                  />
                  <circle cx="505" cy="70" r="4.5" fill="#1E3A8A" />
                  <text
                    x="505"
                    y="102"
                    textAnchor="middle"
                    className="fill-[#1E3A8A] text-[13px] font-semibold"
                  >
                    गाँव का पुराना कुआँ
                  </text>
                </svg>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // village-well
  return (
    <div className="mt-8 rounded-md border border-[#DDD5C7] bg-[#F2EDE3] p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium text-[#1E3A8A]">
            सामूहिक प्रयास · अध्याय ५
          </p>
          <h3 className="mt-1 font-editorial text-lg font-semibold text-[#1C1917]">
            गाँव का पुराना कुआँ
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setWellCleaned((prev) => !prev)}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
            wellCleaned
              ? 'border border-[#14532D] bg-[#FBF9F5] text-[#14532D] hover:bg-[#ECFDF5]'
              : 'bg-[#1E3A8A] text-[#FBF9F5] hover:bg-[#172C6B]'
          }`}
        >
          <Droplets className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            {wellCleaned ? 'प्रारंभिक स्थिति देखें' : 'गाँव वालों के साथ सफाई करें'}
          </span>
        </button>
      </div>

      <div className="mt-4 rounded-sm border border-[#DDD5C7] bg-[#FBF9F5] p-5">
        <p className="font-editorial text-base font-medium text-[#1C1917]">
          शिलालेख: “इस गाँव का सबसे बड़ा खजाना पानी है।”
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center">
          <div className="text-sm leading-relaxed text-[#292524]">
            {wellCleaned ? (
              <p>
                गाँव वालों ने मिलकर सूखी पत्तियाँ, पत्थर और गाद हटाई। कुछ ही दिनों में
                नीचे के जल-स्रोत से निर्मल, ठंडा पानी ऊपर भरने लगा और पूरा गाँव खुशी
                से झूम उठा।
              </p>
            ) : (
              <p>
                कुआँ ऊपर से सूखा और कंकड़-पत्थरों से ढका दिखाई देता है, पर पत्थर का
                लेख संकेत देता है कि नीचे जीवनदायी जल छिपा है।
              </p>
            )}
          </div>

          <div className="rounded-sm border border-[#E6DFD3] bg-[#F6F1E7] p-4">
            <div className="flex items-center justify-between text-xs text-[#57524B]">
              <span>कुएँ की स्थिति</span>
              <span className="font-medium text-[#1C1917]">
                {wellCleaned ? 'साफ और जल से परिपूर्ण' : 'सूखा एवं गाद से ढका'}
              </span>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-sm bg-[#DDD5C7]">
              <div
                className={`h-full transition-all duration-500 ${
                  wellCleaned ? 'w-full bg-[#1E3A8A]' : 'w-1/6 bg-[#78350F]'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
