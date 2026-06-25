

export const metadata = {
  title: 'Portfolio',
  description: 'Read my portfolio.',
}

export default function Portfolio() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-8 tracking-tighter">Grant's Portfolio</h1>
      <div className="flex flex-wrap">
        <div className="mr-8 mb-8 w-40">
          <h2 className="font-medium text-xl">Charismax</h2>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">8.8M+ TikTok views · 200+ downloads · $174 MRR</p>
          <img src="cmaxlogo.png" alt="Charismax logo" className="w-16 h-16 object-cover rounded-lg border border-black dark:border-white mb-3" />
          <img src="charismax.png" alt="Charismax App Store screenshot" className="w-40 rounded-lg border border-black dark:border-white" />
          <p className="mt-4">An iOS app that uses native speech-to-text and OpenAI text-to-speech to simulate real conversations, then coaches you on how to become more charismatic.</p>
        </div>
        <div className="mr-8 mb-8 w-40">
          <h2 className="font-medium text-xl">M-Cals</h2>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">500+ downloads · 70+ monthly active users</p>
          <img src="M.png" alt="M-Cals logo" className="w-16 h-16 object-cover rounded-lg border border-black dark:border-white mb-3" />
          <img src="mcalsscreenshot.png" alt="M-Cals App Store screenshot" className="w-40 rounded-lg border border-black dark:border-white" />
          <p className="mt-4">An iOS app making calories/macro tracking easier, faster, and more accurate for UMich dining halls with daily menu updates.</p>
        </div>
        <div className="mr-8 mb-8">
          <h2 className="font-medium text-xl mb-4">Musicwrap</h2>
          <img src="mwrap.png" alt="Musicwrap" className="w-36 h-36 object-cover rounded-lg border border-black dark:border-white" />
          <p className="mt-4 w-36">A full-stack web app expanding on native Spotify functionality by allowing users to create shareable and customizable playlist folders.</p>
        </div>
        <div className="mr-8 mb-8">
          <h2 className="font-medium text-xl mb-4">Playlist Publicizer</h2>
          <img src="playlists.png" alt="Playlist Publicizer" className="w-36 h-36 object-cover rounded-lg border border-black dark:border-white" />
          <p className="mt-4 w-36">A Python script that automatically sets all Spotify playlists to private or public in one click, for users with hundreds of playlists.</p>
        </div>
        <div className="mb-8">
          <h2 className="font-medium text-xl mb-4">LLM News App</h2>
          <img src="llmnews.png" alt="llmnewsapp" className="w-36 h-36 object-cover rounded-lg border border-black dark:border-white" />
          <p className="mt-4 w-36">A Llama-3 news chatbot that scrapes the web for up-to-date news and allows users to ask questions for deeper understanding.</p>
        </div>
      </div>
      <h3 className="font-medium text-16 mb-8 mt-8 tracking-tighter">And more! Check out my GitHub!</h3>
    </section>
  )
}
