import Image from "next/image";
{/* Okay test*/}
export default function Home() {
  return (
    <main className="h-full p-10 sm:flex items-end">
        <div className="my-auto">
        <h1 className="sm:text-5xl md:text-9xl text-3xl text-white font-sans font-bold align-middle mx-auto my-6 hover:text-sky-800 duration-200">Grant Patterson</h1>
          <div className="md:flex">
            <a className="inline-flex invert hover:invert-0 duration-200" href="https://github.com/pattersongrant">
            <img src="git.png" className="w-8 my-auto"></img>
            <h4 className="mx-2 inline text-black my-auto">pattersongrant</h4>
            </a>
            <a className="inline-flex invert hover:invert-0 duration-200" href="https://www.linkedin.com/in/pattersongrant/">
            <img src="linkedin.png" className="w-8 my-auto"></img>
            <h4 className="mx-2 inline text-black my-auto">pattersongrant</h4>
            </a>
            <a className="inline-flex invert hover:invert-0 duration-200" href="mailto:pattersongrant06@gmail.com">
            <img src="email.png" className="w-8 my-auto"></img>
            <h4 className="mx-2 inline text-black my-auto">pattersongrant06@gmail.com</h4>
            </a>
          </div>
        </div>
        <div className="sm:w-2/5 ml-auto my-auto">
          <img className="m-2 hover:drop-shadow-lg hover:text-gold duration-100 mx-auto w-0 sm:min-w-28 sm:w-3/12" src="/tottenham.png" alt="tottenham logo" />
          <iframe className="w-full h-full rounded-lg" height="500px" src = "https://www.scoreaxis.com/widget/standings-widget/8?autoHeight=1&amp;widgetRows=1%2C1%2C1%2C1%2C1%2C1%2C0%2C1%2C1%2C1&amp;removeBorders=0&amp;header=1&amp;widgetHomeAwayTabs=0&amp;borderColor=%23ffffff&amp;inst=3f7b5"></iframe>
        </div>
    </main>
  );
}
