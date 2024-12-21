

export const metadata = {
  title: 'Portfolio',
  description: 'Read my portfolio.',
}

export default function Portfolio() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-8 tracking-tighter">Grant's Portfolio</h1>
      <div className="flex flex-wrap">
        <div className="mr-8 mb-8">
          <h2 className="font-medium text-xl mb-4">M-Cals</h2>
          <img src="M.png" alt="M" className="w-36 h-36 object-cover" />
          <p className="mt-4 w-36">An iOS app making calories/macro tracking easier, faster, and more accurate for UMich dining halls with daily menu updates.</p>
        </div>
        <div className="mr-8 mb-8">
          <h2 className="font-medium text-xl mb-4">Musicwrap</h2>
          <img src="mwrap.png" alt="Musicwrap" className="w-36 h-36 object-cover" />
          <p className="mt-4 w-36">A full-stack web app expanding on native Spotify functionality by allowing users to create shareable and customizable playlist folders.</p>
        </div>
        <div className="mb-8">
          <h2 className="font-medium text-xl mb-4">LLM News App</h2>
          <img src="llmnews.png" alt="llmnewsapp" className="w-36 h-36 object-cover" />
          <p className="mt-4 w-36">A Llama-3 news chatbot that scrapes the web for up-to-date news and allows users to ask questions for deeper understanding.</p>
        </div>
      </div>
      <h3 className="font-medium text-16 mb-8 mt-8 tracking-tighter">And more! Check out my GitHub!</h3>
    </section>
  )
}
