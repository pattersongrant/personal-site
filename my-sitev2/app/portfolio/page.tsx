

export const metadata = {
  title: 'Portfolio',
  description: 'Read my portfolio.',
}

const githubLinkClassName =
  'text-sm text-neutral-400 hover:text-neutral-200 transition-all'

export default function Portfolio() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-8 tracking-tighter">Grant's Portfolio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        <div>
          <h2 className="font-medium text-xl">Charismax</h2>
          <p className="mb-4 text-sm text-neutral-400">8.8M+ TikTok views · 200+ downloads · $174 MRR</p>
          <img src="/cmaxlogo.png" alt="Charismax logo" className="w-16 h-16 object-cover rounded-lg border border-white mb-3" />
          <img src="/charismax.png" alt="Charismax App Store screenshot" className="w-40 max-sm:w-full max-sm:max-w-40 rounded-lg border border-white" />
          <p className="mt-4">An iOS app that uses native speech-to-text and OpenAI text-to-speech + GPT4.1 to simulate real conversations, then coaches you on how to become more charismatic.</p>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <h2 className="font-medium text-xl">M-Cals</h2>
            <a
              href="https://github.com/pattersongrant/M-Cals"
              className={githubLinkClassName}
              rel="noopener noreferrer"
              target="_blank"
            >
              github
            </a>
          </div>
          <p className="mb-4 text-sm text-neutral-400">600+ downloads · 70+ monthly active users</p>
          <img src="/M.png" alt="M-Cals logo" className="w-16 h-16 object-cover rounded-lg border border-white mb-3" />
          <img src="/mcalsscreenshot.png" alt="M-Cals App Store screenshot" className="w-40 max-sm:w-full max-sm:max-w-40 rounded-lg border border-white" />
          <p className="mt-4">An iOS app making calories/macro tracking easier, faster, and more accurate for UMich dining halls with daily menu updates.</p>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <h2 className="font-medium text-xl">Atrakto</h2>
            <a
              href="https://atrakto.com"
              className={githubLinkClassName}
              rel="noopener noreferrer"
              target="_blank"
            >
              atrakto.com
            </a>
          </div>
          <p className="mb-4 text-sm text-neutral-400">3,000+ page visits in first week · Paying customers</p>
          <img src="/atrakto.png" alt="Atrakto social audience visualization" className="w-40 max-sm:w-full max-sm:max-w-40 rounded-lg border border-white" />
          <p className="mt-4">An OpenAI-powered, full-stack web app for optimizing social media marketing, built with Next.js/Typescript and deployed on Cloudflare.</p>
        </div>
        <div>
          <h2 className="font-medium text-xl">Lighthome</h2>
          <p className="mb-4 text-sm text-neutral-400">2M+ TikTok Views</p>
          <img src="/lighthomelogo.png" alt="Lighthome logo" className="w-16 h-16 object-cover rounded-lg border border-white mb-3" />
          <img src="/lighthomess.png" alt="Lighthome App Store screenshot" className="w-40 max-sm:w-full max-sm:max-w-40 rounded-lg border border-white" />
          <p className="mt-4">An iOS breakup recovery app with a personalized path of lessons, quizzes, and tasks, plus a no-contact tracker, journaling, and an AI coach. Built with RevenueCat, AWS, and OpenAI.</p>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="font-medium text-xl">iMessage Insights</h2>
            <a
              href="https://github.com/pattersongrant/imsg"
              className={githubLinkClassName}
              rel="noopener noreferrer"
              target="_blank"
            >
              github
            </a>
          </div>
          <img src="/imsg.png" alt="iMessage Insights" className="w-36 h-36 max-sm:max-w-full object-cover rounded-lg border border-white" />
          <p className="mt-4 w-36 max-sm:w-full">A local Python/Flask web app that analyzes your Mac's iMessage database to show who you text the most and what you talk about.</p>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="font-medium text-xl">Musicwrap</h2>
            <a
              href="https://github.com/pattersongrant/musicwrap"
              className={githubLinkClassName}
              rel="noopener noreferrer"
              target="_blank"
            >
              github
            </a>
          </div>
          <img src="/mwrap.png" alt="Musicwrap" className="w-36 h-36 max-sm:max-w-full object-cover rounded-lg border border-white" />
          <p className="mt-4 w-36 max-sm:w-full">A full-stack web app expanding on native Spotify functionality by allowing users to create shareable and customizable playlist folders.</p>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="font-medium text-xl">Playlist Publicizer</h2>
            <a
              href="https://github.com/pattersongrant/playlist-publicizer"
              className={githubLinkClassName}
              rel="noopener noreferrer"
              target="_blank"
            >
              github
            </a>
          </div>
          <img src="/playlists.png" alt="Playlist Publicizer" className="w-36 h-36 max-sm:max-w-full object-cover rounded-lg border border-white" />
          <p className="mt-4 w-36 max-sm:w-full">A Python script that automatically sets all Spotify playlists to private or public in one click, for users with hundreds of playlists.</p>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="font-medium text-xl">LLM News App</h2>
            <a
              href="https://github.com/pattersongrant/llm-news-app"
              className={githubLinkClassName}
              rel="noopener noreferrer"
              target="_blank"
            >
              github
            </a>
          </div>
          <img src="/llmnews.png" alt="llmnewsapp" className="w-36 h-36 max-sm:max-w-full object-cover rounded-lg border border-white" />
          <p className="mt-4 w-36 max-sm:w-full">A Llama-3 news chatbot that scrapes the web for up-to-date news and allows users to ask questions for deeper understanding.</p>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="font-medium text-xl">Volume Booster</h2>
            <a
              href="https://github.com/pattersongrant/volume-booster"
              className={githubLinkClassName}
              rel="noopener noreferrer"
              target="_blank"
            >
              github
            </a>
          </div>
          <img src="/volume.png" alt="Volume Booster" className="w-full max-w-sm rounded-lg border border-white" />
          <p className="mt-4 max-w-sm">A macOS GUI for adjusting an MP4's audio volume, listening to the result, and exporting it. Video is copied without re-encoding; audio is saved as lossless ALAC.</p>
        </div>
      </div>
      <h3 className="font-medium text-16 mb-8 mt-8 tracking-tighter">And more! Check out my GitHub!</h3>
    </section>
  )
}
