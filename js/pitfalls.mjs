// Emirhan Mollahüseyinoğlu - 2100005226
// Insani sasirtan seyler. Calistir: node js/pitfalls.mjs

// Tuzak 1: undefined veya null parcalanamaz, TypeError verir
const cihazlar = [{ ad: 'Lamba' }, { ad: 'Klima' }]
try {
  const { ad } = cihazlar.find((c) => c.ad === 'Kombi')
  console.log(ad)
} catch (hata) {
  console.log('tuzak 1:', hata.constructor.name + ':', hata.message)
}

// Tuzak 2: varsayilan deger sadece undefined icin calisir, null icin calismaz
const ayar = { parlaklik: null, renk: undefined }
const { parlaklik = 50, renk = 'beyaz' } = ayar
console.log('tuzak 2:', parlaklik, renk)

// Tuzak 3: const/let olmadan nesne deseni parantez ister
let oda
let kat
const konum = { oda: 'salon', kat: 1 };
// { oda, kat } = konum   --> SyntaxError: Unexpected token '='
({ oda, kat } = konum)
console.log('tuzak 3:', oda, kat)

// Tuzak 4: kopya degil referans alinir, ic nesne ortaktir
const ev = { sahip: { isim: 'Emirhan' }, odaSayisi: 3 }
let { sahip, odaSayisi } = ev
sahip.isim = 'Ali'
odaSayisi = 10
console.log('tuzak 4:', ev.sahip.isim, ev.odaSayisi)

// Tuzak 5: nesnede sira onemsiz, dizide onemli
const { kat: k, oda: o } = { oda: 'mutfak', kat: 2 }
console.log('tuzak 5 nesne:', o, k)
const [odaAdi, katNo] = [2, 'mutfak']
console.log('tuzak 5 dizi:', odaAdi, katNo)

// Tuzak 6 (kendi buldugum): yeniden adlandirinca eski isim degisken olmaz
const { ad: cihazAdi } = { ad: 'Kombi' }
console.log('tuzak 6:', cihazAdi, typeof ad)
