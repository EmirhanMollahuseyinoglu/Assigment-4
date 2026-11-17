// Emirhan Mollahüseyinoğlu - 2100005226
// Parametrelerde ve dongulerde destructuring (form 11 ve 12). Calistir: node js/params.mjs

// Form 11: parametre bir nesne, fonksiyonun basinda parcalaniyor
function cihazEkle({ ad, durum = 'kapalı' } = {}) {
  return { ad, durum }
}
console.log('form 11:', cihazEkle({ ad: 'Klima' }))
console.log('form 11 durum verildi:', cihazEkle({ ad: 'Klima', durum: 'açık' }))

// hic arguman vermeyince = {} sayesinde hata olmuyor
console.log('form 11 argumansiz:', cihazEkle())

// = {} olmasaydi ne olurdu
function cihazEkleKorumasiz({ ad, durum = 'kapalı' }) {
  return { ad, durum }
}
try {
  cihazEkleKorumasiz()
} catch (hata) {
  console.log('form 11 korumasiz:', hata.message)
}

// Form 11b: parametre bir dizi
const konumYaz = ([kat, oda]) => `${kat}. kat, ${oda}`
console.log('form 11b:', konumYaz([2, 'yatak odası']))

// Form 12: dongude [anahtar, deger]
const sicakliklar = { salon: 24, mutfak: 22, banyo: 26 }
for (const [oda, derece] of Object.entries(sicakliklar)) {
  console.log('form 12 nesne:', oda, derece)
}

// Map zaten [anahtar, deger] ciftleri verir, Object.entries gerekmez
const lambalar = new Map([
  ['salon', true],
  ['mutfak', false],
])
for (const [oda, acikMi] of lambalar) {
  console.log('form 12 map:', oda, acikMi)
}

// dizide sira numarasi da lazimsa entries()
const cihazlar = ['lamba', 'klima']
for (const [sira, cihaz] of cihazlar.entries()) {
  console.log('form 12 dizi:', sira, cihaz)
}

// nesne dizisinde dongunun icinde nesne deseni
const liste = [{ ad: 'Lamba', watt: 9 }, { ad: 'Klima', watt: 1200 }]
for (const { ad, watt } of liste) {
  console.log('form 12 nesne dizisi:', ad, watt)
}
