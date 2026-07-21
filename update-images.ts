import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updates = {
  'bafel-talabani-baghdad-meetings': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/%D8%B4%DB%8E%D8%AE_%D9%86%DB%95%D9%87%D8%B1%DB%86_%DA%A9%DB%95%D8%B3%D9%86%DB%95%D8%B2%D8%A7%D9%86%DB%8C_%D9%88_%D8%A8%D8%A7%D9%81%DA%B5_%D8%AA%D8%A7%DA%B5%DB%95%D8%A8%D8%A7%D9%86%DB%8C_%28cropped%29.jpg',
  'qubad-talabani-digital-transformation': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Qubad_Talabani_Image.jpg',
  'masoud-barzani-regional-security-talks': 'https://upload.wikimedia.org/wikipedia/commons/8/85/Masud_Barzani_20230913.jpg',
  'masrour-barzani-infrastructure-projects': 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Masrour_Masoud_2025_%28cropped%29.jpg',
  'xi-jinping-belt-and-road-expansion': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Xi_Jinping_meets_Putin_May_2026.jpg',
  'chinese-government-iraq-energy-pact': 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Li_Qiang_meets_Keir_Starmer_Jan_2026.jpg',
  'kurdistan-government-investment-forum': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Nechirvan_Barzani_2025_%28cropped%29.jpg',
  'ali-al-zaidi-trade-relations': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/5628442718_b10fc2c47f_o.jpg',
  'kurdistan-china-cultural-exchange': 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Shar_Park%2C_Hawler%2C_Erbil_Governorate%2C_Iraq.jpg',
  'iraqi-delegation-visits-beijing': 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Iraq.svg'
};

async function main() {
  for (const [slug, imageUrl] of Object.entries(updates)) {
    await prisma.article.updateMany({
      where: { slug },
      data: { imageUrl }
    });
    console.log('Updated', slug);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
