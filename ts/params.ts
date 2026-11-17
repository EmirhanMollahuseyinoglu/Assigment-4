// Emirhan Mollahüseyinoğlu - 2100005226
// Form 11 ve 12, TypeScript. Calistir: npx tsx ts/params.ts

type CihazGirdi = { ad?: string; durum?: 'açık' | 'kapalı' }

// Form 11: tip, desenin TAMAMINDAN sonra yazilir. = {} icin butun alanlar opsiyonel olmali
function cihazEkle({ ad = 'isimsiz', durum = 'kapalı' }: CihazGirdi = {}) {
  return { ad, durum }
}
console.log('form 11:', cihazEkle({ ad: 'Klima' }))
console.log('form 11 argumansiz:', cihazEkle())

// Form 11b: dizi parametresi, tipi tuple
const konumYaz = ([kat, oda]: [number, string]): string => `${kat}. kat, ${oda}`
console.log('form 11b:', konumYaz([2, 'yatak odası']))

// Form 12: Record<string, number> --> oda string, derece number
const sicakliklar: Record<string, number> = { salon: 24, mutfak: 22, banyo: 26 }
for (const [oda, derece] of Object.entries(sicakliklar)) {
  console.log('form 12 nesne:', oda, derece.toFixed(1))
}

// Map<string, boolean> --> oda string, acikMi boolean
const lambalar = new Map<string, boolean>([
  ['salon', true],
  ['mutfak', false],
])
for (const [oda, acikMi] of lambalar) {
  console.log('form 12 map:', oda, acikMi ? 'açık' : 'kapalı')
}

// nesne dizisi
type Tuketim = { ad: string; watt: number }
const liste: Tuketim[] = [{ ad: 'Lamba', watt: 9 }, { ad: 'Klima', watt: 1200 }]
for (const { ad, watt } of liste) {
  console.log('form 12 nesne dizisi:', ad, watt)
}
