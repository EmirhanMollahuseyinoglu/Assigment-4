// Emirhan Mollahüseyinoğlu - 2100005226
// Props ve children, duz JavaScript (JSX). Calistir: npx tsx js/props.jsx
import { renderToStaticMarkup } from 'react-dom/server'

// her seferinde ayni seyi yazmamak icin kucuk yardimci
const ciz = (etiket, eleman) => console.log(etiket, renderToStaticMarkup(eleman))

// ---------- P1: props TEK bir nesnedir ----------
function KartA(props) {
  return <section><h2>{props.baslik}</h2>{props.children}</section>
}
function KartB({ baslik, children }) {
  return <section><h2>{baslik}</h2>{children}</section>
}
ciz('P1 A:', <KartA baslik="Salon">2 cihaz açık</KartA>)
ciz('P1 B:', <KartB baslik="Salon">2 cihaz açık</KartB>)

// props nesnesinin icinde ne var, kendim bakiyorum
function PropsGoster(props) {
  console.log('P1 props nesnesi:', props)
  return null
}
renderToStaticMarkup(<PropsGoster baslik="Salon" sayi={2}>içerik</PropsGoster>)

// ---------- P2: children sadece bir prop ----------
ciz('P2 etiket arasi:', <KartB baslik="Mutfak">ocak kapalı</KartB>)
ciz('P2 children prop:', <KartB baslik="Mutfak" children="ocak kapalı" />)
// ikisini birden yazarsam hangisi kazanir?
ciz('P2 ikisi birden:', <KartB baslik="Mutfak" children="prop olan">arada yazan</KartB>)

// ---------- P3: children neler olabilir ----------
function Kutu({ children }) {
  return <div>{children}</div>
}
ciz('P3 string:', <Kutu>merhaba</Kutu>)
ciz('P3 sayi:', <Kutu>{24}</Kutu>)
ciz('P3 sifir:', <Kutu>{0}</Kutu>)
ciz('P3 tek eleman:', <Kutu><b>klima</b></Kutu>)
ciz('P3 birkac eleman:', <Kutu><b>klima</b><i>lamba</i></Kutu>)
ciz('P3 undefined:', <Kutu>{undefined}</Kutu>)
ciz('P3 hic yok:', <Kutu />)
ciz('P3 null:', <Kutu>{null}</Kutu>)
ciz('P3 false:', <Kutu>{false}</Kutu>)
ciz('P3 true:', <Kutu>{true}</Kutu>)
ciz('P3 fonksiyon:', <Kutu>{() => 'selam'}</Kutu>)

// fonksiyon ancak bilesen onu kendisi cagirirsa ise yarar
function Sicaklik({ children }) {
  return <div>{children(24)}</div>
}
ciz('P3 fonksiyonu cagirinca:', <Sicaklik>{(derece) => `Salon ${derece} derece`}</Sicaklik>)

// children'in tipi duruma gore degisiyor
function TipGoster({ children }) {
  console.log('P3 tip:', typeof children, '| dizi mi:', Array.isArray(children))
  return null
}
renderToStaticMarkup(<TipGoster>merhaba</TipGoster>)
renderToStaticMarkup(<TipGoster><b>a</b></TipGoster>)
renderToStaticMarkup(<TipGoster><b>a</b><b>b</b></TipGoster>)
renderToStaticMarkup(<TipGoster />)

// ---------- P4: children'i diger props'tan ayirmak ----------
function Bolum({ baslik, children, ...rest }) {
  return <section {...rest}><h2>{baslik}</h2>{children}</section>
}
ciz('P4:', <Bolum baslik="Salon" id="salon" className="oda">lamba açık</Bolum>)

// spread once mi sonra mi: sonra yazilan kazanir
function OnceSpread({ children, ...rest }) {
  return <section {...rest} className="kart">{children}</section>
}
function SonraSpread({ children, ...rest }) {
  return <section className="kart" {...rest}>{children}</section>
}
ciz('P4 once spread:', <OnceSpread className="benim">x</OnceSpread>)
ciz('P4 sonra spread:', <SonraSpread className="benim">x</SonraSpread>)

// baslik'i ayirmazsam rest'in icinde kalir ve DOM'a gider
function Ayirmadan({ children, ...rest }) {
  return <section {...rest}>{children}</section>
}
ciz('P4 ayirmadan:', <Ayirmadan title="ipucu olur" id="x">y</Ayirmadan>)

// ---------- P5: props mu children mi ----------
// 1) ust ve alt kisim prop olarak
function PanelProps({ header, footer, children }) {
  return (
    <div className="panel">
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  )
}
ciz('P5 props ile:',
  <PanelProps header={<h2>Salon</h2>} footer="3 cihaz">
    <p>Lamba açık</p>
  </PanelProps>
)

// 2) her sey children
function PanelChildren({ children }) {
  return <div className="panel">{children}</div>
}
ciz('P5 children ile:',
  <PanelChildren>
    <header><h2>Salon</h2></header>
    <main><p>Lamba açık</p></main>
    <footer>3 cihaz</footer>
  </PanelChildren>
)
// children ile yazinca sirayi karistirabilirim, bilesen bunu engelleyemez
ciz('P5 children ters sira:',
  <PanelChildren>
    <footer>3 cihaz</footer>
    <header><h2>Salon</h2></header>
  </PanelChildren>
)

// ---------- P6: varsayilan degerler ----------
function Lamba({ ad, parlaklik = 50 }) {
  return <p>{ad}: %{parlaklik}</p>
}
ciz('P6 verilmedi:', <Lamba ad="Salon" />)
ciz('P6 undefined:', <Lamba ad="Salon" parlaklik={undefined} />)
ciz('P6 null:', <Lamba ad="Salon" parlaklik={null} />)
ciz('P6 80:', <Lamba ad="Salon" parlaklik={80} />)

// ---------- Ek denemeler (ipuclarindan) ----------
// key bir prop mu?
function AnahtarDene(props) {
  return <p>key: {String(props.key)} | ad: {props.ad}</p>
}
ciz('Deneme key:', <AnahtarDene key="k1" ad="Lamba" />)

// bilesen props'u degistirmeye calisirsa
function Degistir(props) {
  try {
    props.baslik = 'yeni başlık'
  } catch (hata) {
    console.log('Deneme props degistirme:', hata.constructor.name + ':', hata.message)
  }
  return <p>{props.baslik}</p>
}
ciz('Deneme props degistirme sonuc:', <Degistir baslik="eski başlık" />)

// children hic verilmezse
function Zorunlu({ children }) {
  return <div>{children.toUpperCase()}</div>
}
try {
  ciz('Deneme children yok:', <Zorunlu />)
} catch (hata) {
  console.log('Deneme children yok:', hata.constructor.name + ':', hata.message)
}
