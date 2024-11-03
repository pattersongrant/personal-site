import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1>Test</h1>
    <div className="h-screen p-10 sm:flex">
      <div>
      
      </div>
      
        <div className="my-auto">
        <h1 className="sm:text-5xl md:text-9xl text-3xl text-white font-sans font-bold align-middle mx-auto my-6 hover:text-sky-800 duration-200">Grant Patterson</h1>
        <h2 className="my-10 text-3xl font-sans font-bold">Software Engineer</h2>
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
          <img className="m-2 hover:animate-spin duration-100 mx-auto w-0 sm:min-w-28 sm:size-full" src="/tottenham2.png" alt="tottenham logo" />
        </div>
    </div>
    </main>
  );
}
