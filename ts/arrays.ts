// Emirhan Mollahüseyinoğlu - 2100005226
// js/arrays.mjs ile ayni dort form, tiplerle. Calistir: npx tsx ts/arrays.ts

// Form 1: donus tipi tuple, [number, number]
function enSogukEnSicak(sicakliklar: number[]): [number, number] {
  return [Math.min(...sicakliklar), Math.max(...sicakliklar)]
}
const [enSoguk, enSicak] = enSogukEnSicak([21, 24, 19, 26])
console.log('form 1:', enSoguk, enSicak) // ikisi de number

// Form 2: odalar string[] oldugu icin ikinciOda string | undefined olur
const odalar: string[] = ['salon', 'mutfak', 'yatak odası', 'banyo']
const [, ikinciOda, ...digerOdalar] = odalar
// ikinciOda.toUpperCase() yazamam, once kontrol etmem lazim
if (ikinciOda !== undefined) {
  console.log('form 2:', ikinciOda.toUpperCase(), digerOdalar)
}

// Form 3: yer degistirme, tipler ayni oldugu icin sorun yok
let acikLamba: string = 'salon lambası'
let kapaliLamba: string = 'mutfak lambası';
[acikLamba, kapaliLamba] = [kapaliLamba, acikLamba]
console.log('form 3:', acikLamba, kapaliLamba)

// Form 4: varsayilan degerler. Varsayilan oldugu icin bos diziden almak hata vermiyor
const [parlaklik = 50, renk = 'beyaz'] = []
console.log('form 4:', parlaklik, renk) // number ve string
// const [x] = []   --> TS2493, varsayilan olmayinca derlenmiyor

// number[] dizisinde eleman number | undefined olurdu, varsayilan bunu number yapiyor
const ayarlar: number[] = []
const [sure = 10] = ayarlar
console.log('form 4 dizi:', sure + 1)
