import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-end justify-between p-10">
      <h1 className="hover:text-5xl text-sky-950 mx-auto duration-500 text-4xl text-black font-sans font-bold">Grant Patterson</h1>
      <div className="w-2/5 h-3/5">
        <img className="hover:drop-shadow-lg hover:text-gold duration-100 mx-auto w-2/5" src="/tottenham.png" alt="tottenham logo" />
        <div id="scoreaxis-widget-96e18" style={{ borderWidth: '0px', borderColor: 'rgba(0, 0, 0, 0.15)', borderStyle: 'solid', borderRadius: '8px', padding: '10px', background: 'rgb(255, 255, 255)', width: '100%', container: '1px' }}>
          <iframe id="Iframe" src="https://www.scoreaxis.com/widget/standings-widget/8?autoHeight=1&amp;widgetHomeAwayTabs=0&amp;header=0&amp;widgetRows=1%2C1%2C1%2C1%2C1%2C1%2C0%2C1%2C1%2C1&amp;borderColor=%23ffffff&amp;lang=en&amp;font=0&amp;teamsLogo=1&amp;removeBorders=0&amp;fontSize=&amp;links=1&amp;inst=96e18" style={{ width: '100%', border: 'none', transition: 'all 300ms ease' }}></iframe>
          <script dangerouslySetInnerHTML={{ __html: `window.addEventListener("DOMContentLoaded",event=>{window.addEventListener("message",event=>{if(event.data.appHeight&&"96e18"==event.data.inst){let container=document.querySelector("#scoreaxis-widget-96e18 iframe");container&&(container.style.height=parseInt(event.data.appHeight)+"px")}},!1)});` }}></script>
        </div>
        <div style={{ fontSize: '12px', fontFamily: 'Sans, sans-serif', textAlign: 'left' }}>
          Data provided by <a target="_blank" href="https://www.scoreaxis.com/">Scoreaxis</a>
        </div>
      </div>
    </main>
  );
}
