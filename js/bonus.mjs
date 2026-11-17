// Emirhan Mollahüseyinoğlu - 2100005226
// Bonus 2: Depth. Kendi denemelerim. Calistir: node js/bonus.mjs

// ========== A: dizi deseni aslinda neyi cagiriyor? ==========
// string
const [ilkHarf, ikinciHarf, ...kalanHarfler] = 'klima'
console.log('A1 string:', ilkHarf, ikinciHarf, kalanHarfler)

// Set
const odalar = new Set(['salon', 'mutfak', 'salon'])
const [oda1, oda2, oda3] = odalar
console.log('A2 set:', oda1, oda2, oda3)

// Map: her eleman [anahtar, deger] oldugu icin ic ice desen
const lambalar = new Map([['salon', true], ['mutfak', false]])
const [[ilkOda, ilkDurum]] = lambalar
console.log('A3 map:', ilkOda, ilkDurum)

// generator: sonsuz ama desen sadece ihtiyaci kadar aliyor
function* sayac() {
  let i = 1
  while (true) {
    console.log('   generator uretti:', i)
    yield i++
  }
}
const [s1, s2] = sayac()
console.log('A4 generator:', s1, s2)

// kendi iterator'um: desen hangi metotlari cagiriyor gormek icin
const izlenen = {
  [Symbol.iterator]() {
    console.log('   Symbol.iterator cagrildi')
    let n = 0
    return {
      next() {
        n++
        console.log('   next cagrildi', n)
        return { value: n * 10, done: false }
      },
      return() {
        console.log('   return cagrildi (desen isini bitirdi)')
        return { done: true }
      },
    }
  },
}
const [x, y] = izlenen
console.log('A5 iterator:', x, y)

// duz nesne iterable degil
try {
  const [a] = { a: 1 }
  console.log(a)
} catch (hata) {
  console.log('A6 duz nesne:', hata.constructor.name + ':', hata.message)
}

// ama nesne deseni diziye uygulanabilir, cunku dizi de bir nesne
const { length, 0: bas } = ['lamba', 'klima', 'kombi']
console.log('A7 diziye nesne deseni:', length, bas)

// ========== B: degerlendirme sirasi ==========
// varsayilan sadece gerekince hesaplaniyor
function pahaliVarsayilan() {
  console.log('   pahaliVarsayilan CALISTI')
  return 50
}
const { parlaklik: p1 = pahaliVarsayilan() } = { parlaklik: 80 }
console.log('B1 deger var:', p1)
const { parlaklik: p2 = pahaliVarsayilan() } = {}
console.log('B1 deger yok:', p2)

// varsayilan, ayni desendeki ONCEKI degiskeni kullanabilir
const { watt = 10, saatlik = watt * 2 } = { watt: 100 }
console.log('B2 onceki degisken:', watt, saatlik)

// SONRAKI degiskeni kullanamaz
try {
  const { a = b, b = 1 } = {}
  console.log(a, b)
} catch (hata) {
  console.log('B3 sonraki degisken:', hata.constructor.name + ':', hata.message)
}

// soldan saga calistigini sayacla gosteriyorum
let sira = 0
const [ilk = ++sira, ikinci = ++sira, ucuncu = ++sira] = [undefined, 'dolu', undefined]
console.log('B4 sira:', ilk, ikinci, ucuncu, '| sayac:', sira)

// ========== C: baska yerlerde destructuring ==========
// catch icinde
try {
  null.ad
} catch ({ name, message }) {
  console.log('C1 catch:', name, '|', message)
}

// atama hedefi degisken olmak zorunda degil, nesne alani da olur
const klima = { derece: 0, mod: '' };
[klima.derece, klima.mod] = [22, 'soğutma']
console.log('C2 atama hedefi:', klima)

// for...in anahtar verir, for...of deger verir
const cihazlar = [['lamba', 9], ['klima', 1200]]
for (const i in cihazlar) {
  console.log('C3 for...in:', i, typeof i)
}
for (const [ad, watt2] of cihazlar) {
  console.log('C3 for...of:', ad, watt2)
}
// anahtar bir string, string de iterable oldugu icin dizi deseniyle ilk harfini alabiliyorum
for (const [harf] of Object.keys({ salon: 1, mutfak: 2 })) {
  console.log('C4 anahtarin ilk harfi:', harf)
}
