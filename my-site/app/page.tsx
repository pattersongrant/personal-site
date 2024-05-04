import Image from "next/image";
{/* Okay test*/}
export default function Home() {
  return (
    <main className="h-full p-10 flex items-end">
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
        <div className="w-2/5 ml-auto">
          <img className="m-2 hover:drop-shadow-lg hover:text-gold duration-100 mx-auto w-28" src="/tottenham.png" alt="tottenham logo" />
          <div className="shadow-2xl" id="scoreaxis-widget-96e18" style={{ borderWidth: '0px', borderColor: 'rgba(0, 0, 0, 0.15)', borderStyle: 'solid', borderRadius: '8px', padding: '10px', background: 'rgb(255, 255, 255)', width: '100%', container: '1px', maxHeight: '80vh', overflow: 'auto', minHeight: '80vh'}}>
            <iframe id="Iframe" src="https://www.scoreaxis.com/widget/standings-widget/8?autoHeight=1&amp;widgetHomeAwayTabs=0&amp;header=0&amp;widgetRows=1%2C1%2C1%2C1%2C1%2C1%2C0%2C1%2C1%2C1&amp;borderColor=%23ffffff&amp;lang=en&amp;font=0&amp;teamsLogo=1&amp;removeBorders=0&amp;fontSize=&amp;links=1&amp;inst=96e18" style={{ width: '100%', border: 'none', transition: 'all 300ms ease' }}></iframe>
            <script dangerouslySetInnerHTML={{ __html: `window.addEventListener("DOMContentLoaded",event=>{window.addEventListener("message",event=>{if(event.data.appHeight&&"96e18"==event.data.inst){let container=document.querySelector("#scoreaxis-widget-96e18 iframe");container&&(container.style.height=parseInt(event.data.appHeight)+"px")}},!1)});` }}></script>
          </div>
        </div>
    </main>
  );
}
