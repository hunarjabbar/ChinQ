const fs = require('fs');

const figures = [
  { name: 'Mustafa Barzani', region: 'Kurdish', title: 'Legendary Kurdish Nationalist Leader', keywords: ['Mahabad', 'KDP', 'Peshmerga', 'September Rebellion', 'Kurdistan', 'Exile', 'USSR', 'Autonomy', 'Legacy', 'Leadership'] },
  { name: 'Ibrahim Ahmad', region: 'Kurdish', title: 'Pioneering Kurdish Novelist and Political Leader', keywords: ['Writer', 'Novelist', 'KDP', 'PUK', 'Jani Gal', 'Intellectual', 'Kurdish Literature', 'Political Thought', 'Reform', 'Legacy'] },
  { name: 'Jalal Talabani', region: 'Kurdish/Iraqi', title: 'First Kurdish President of Iraq', keywords: ['PUK', 'President', 'Iraq', 'Baghdad', 'Diplomacy', 'Kurdistan', 'Post-2003', 'Statesman', 'Peacemaker', 'Legacy'] },
  { name: 'Mao Zedong', region: 'Chinese', title: 'Founding Father of the People\'s Republic of China', keywords: ['PRC', 'Revolution', 'Long March', 'Chairman', 'Communist Party', 'Modernization', 'Peasantry', 'Philosophy', 'Legacy', 'China'] },
  { name: 'Zhou Enlai', region: 'Chinese', title: 'First Premier of the People\'s Republic of China', keywords: ['Premier', 'Diplomacy', 'Geneva Conference', 'Foreign Policy', 'Pragmatism', 'Stability', 'Cultural Revolution', 'Moderator', 'Legacy', 'China'] },
  { name: 'Deng Xiaoping', region: 'Chinese', title: 'Architect of Modern China', keywords: ['Reform', 'Opening Up', 'Economy', 'Modernization', 'Pragmatism', 'Shenzhen', 'Market Economy', 'Growth', 'Legacy', 'China'] },
  { name: 'Sun Yat-sen', region: 'Chinese', title: 'Forerunner of the Democratic Revolution in China', keywords: ['Xinhai Revolution', 'Republic of China', 'Three Principles', 'Nationalism', 'Democracy', 'Livelihood', 'Physician', 'Legacy', 'Modern China', 'Pioneer'] },
  { name: 'Abd al-Karim Qasim', region: 'Iraqi', title: 'Leader of the 14 July Revolution', keywords: ['1958 Revolution', 'Republic', 'Iraq', 'Brigadier', 'Reform', 'Housing', 'Oil', 'Independence', 'Legacy', 'Baghdad'] },
  { name: 'Nuri al-Said', region: 'Iraqi', title: 'Prominent Iraqi Politician of the Hashemite Era', keywords: ['Prime Minister', 'Hashemite', 'Monarchy', 'Baghdad Pact', 'Pro-Western', 'Development Board', 'State Building', 'Legacy', 'Iraq', 'Diplomacy'] },
  { name: 'Nawshirwan Mustafa', region: 'Kurdish', title: 'Kurdish Intellectual and Reformist Leader', keywords: ['Gorran', 'Change Movement', 'Intellectual', 'Writer', 'Historian', 'PUK', 'Reform', 'Anti-corruption', 'Legacy', 'Kurdistan'] }
];

function generateContent(figure) {
  let content = `The historical significance of ${figure.name} as a ${figure.title} cannot be overstated. `;
  
  const p1 = `Born into a period of profound regional transformation, ${figure.name} emerged as a defining figure for the ${figure.region} people. Their early life was characterized by a deep engagement with the socio-political realities of their time, which profoundly shaped their ideological framework and future leadership style. During their formative years, they witnessed significant political upheaval, which instilled in them a sense of duty and a vision for a transformed society. This vision was not merely theoretical; it was rooted in the lived experiences of their people and a pragmatic understanding of the geopolitical forces at play. As they rose to prominence, ${figure.name} navigated complex alliances and formidable opposition, demonstrating a unique blend of strategic foresight and unyielding determination. Their ability to articulate a compelling narrative for the future galvanized widespread support and laid the groundwork for their enduring influence. The legacy of their early activism and intellectual contributions continues to be a subject of extensive historical analysis, highlighting their role in setting the trajectory for future political and social movements within their region and beyond. `;

  const p2 = `Throughout their career, ${figure.name} became synonymous with key historical concepts such as ${figure.keywords.slice(0, 3).join(', ')}. They played a pivotal role in organizing and leading major political and social initiatives that challenged the status quo. Their leadership was marked by a commitment to the principles of self-determination, social justice, and national modernization. By mobilizing diverse segments of society, they were able to build a robust coalition that could withstand intense internal and external pressures. Their strategic decisions during critical historical junctures—often involving high-stakes negotiations and bold political maneuvers—fundamentally altered the balance of power and redefined the political landscape. Furthermore, their ideological contributions provided a theoretical foundation for their followers, blending traditional values with modern political concepts to create a unique and resonant political philosophy. The impact of these initiatives was felt not only in the immediate structural changes they brought about but also in the long-term cultural and political awakening of their people. `;

  const p3 = `One of the most defining aspects of ${figure.name}'s legacy is their connection to ${figure.keywords.slice(3, 6).join(', ')}. This era of their leadership was fraught with significant challenges, including armed conflict, political exile, and intense ideological debates. Despite these obstacles, they maintained a steadfast commitment to their core objectives, often adapting their strategies to navigate the shifting geopolitical currents. Their resilience in the face of adversity became a hallmark of their leadership, inspiring a generation of followers to remain committed to their cause. During this period, ${figure.name} also engaged in crucial diplomatic efforts, seeking international support and recognition for their movement. These efforts were instrumental in bringing their cause to the global stage and securing vital alliances. The complexities of their leadership during this time reflect the nuanced and often difficult decisions required to effect meaningful change in a volatile political environment. Their actions and decisions during these critical years remain a focal point for historians studying the dynamics of leadership and resistance in the modern era. `;

  const p4 = `The later years of ${figure.name}'s life were focused on ${figure.keywords.slice(6, 9).join(', ')}. Having achieved significant milestones, they turned their attention to the long-term sustainability of their political achievements and the institutionalization of their vision. This involved complex processes of state-building, economic reform, and the establishment of a durable political order. They recognized that true success required more than just immediate victories; it necessitated the creation of robust frameworks that could support continued progress and stability. Their efforts in this regard were marked by a pragmatic approach to governance, balancing ideological purity with the practical necessities of administration and economic development. Additionally, ${figure.name} dedicated considerable time to mentoring the next generation of leaders, ensuring that their vision would endure beyond their own lifetime. The institutional and ideological legacy they established during these later years provided a foundation for future political discourse and continued to shape the trajectory of their nation long after their passing. `;

  const p5 = `In conclusion, the enduring legacy of ${figure.name} in relation to ${figure.keywords[9]} is a testament to their profound impact on the course of history. Their life and work represent a critical chapter in the broader narrative of the ${figure.region} experience, offering invaluable insights into the complexities of nation-building, political resistance, and visionary leadership. Today, ${figure.name} is remembered not only for their specific political achievements but also for their enduring symbolic resonance. They remain a polarizing yet undeniably towering figure, whose ideas and actions continue to be debated, celebrated, and analyzed by scholars, politicians, and the public alike. The historical memory of ${figure.name} serves as a powerful reminder of the enduring human capacity to shape the destiny of nations and the profound, lasting impact of individual agency on the grand sweep of history. As we reflect on their contributions, it is clear that their influence extends far beyond their own time, continuing to inspire and inform contemporary discussions on leadership, identity, and the pursuit of a better future.`;

  return p1 + p2 + p3 + p4 + p5;
}

const articles = figures.map(f => {
  const contentEn = generateContent(f);
  const imageUrl = f.name === 'Mao Zedong' ? '/src/assets/images/regenerated_image_1789395513636.jpg' : 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop';
  return `
  {
    slug: 'history-${f.name.toLowerCase().replace(/ /g, '-')}',
    imageUrl: '${imageUrl}',
    translations: [
      {
        lang: 'en',
        title: ${JSON.stringify(f.name + ' - ' + f.title)},
        excerpt: ${JSON.stringify(`A comprehensive historical overview of ${f.name}, a defining figure in ${f.region} history.`)},
        content: ${JSON.stringify(contentEn)}
      },
      {
        lang: 'ar',
        title: ${JSON.stringify(f.name + ' - ' + f.title + ' (Arabic)')},
        excerpt: ${JSON.stringify(`نظرة تاريخية شاملة لـ ${f.name}، شخصية مميزة في التاريخ.`)},
        content: ${JSON.stringify(contentEn)}
      },
      {
        lang: 'zh',
        title: ${JSON.stringify(f.name + ' - ' + f.title + ' (Chinese)')},
        excerpt: ${JSON.stringify(`${f.name}的历史概览。`)},
        content: ${JSON.stringify(contentEn)}
      },
      {
        lang: 'ckb',
        title: ${JSON.stringify(f.name + ' - ' + f.title + ' (Kurdish)')},
        excerpt: ${JSON.stringify(`پوختەیەکی مێژوویی گشتگیر بۆ ${f.name}.`)},
        content: ${JSON.stringify(contentEn)}
      }
    ]
  }`;
});

const fileContent = `import { prisma } from './db.js';

const historicalArticles = [
${articles.join(',\n')}
];

export async function seedHistoricalFigures() {
  console.log("🌱 [Historical Figures Seeder] Starting to seed historical figures...");
  
  let author = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!author) {
    author = await prisma.user.create({
      data: { email: 'history_editor@iraq-china-daily.com', name: 'History Editor', role: 'ADMIN' }
    });
  }

  let category = await prisma.category.findUnique({ where: { slug: 'historical-figures' } });
  if (!category) {
    category = await prisma.category.create({
      data: {
        slug: 'historical-figures',
        name: 'Historical Figures',
        nameEn: 'Historical Figures',
        nameAr: 'شخصيات تاريخية',
        nameZh: '历史人物'
      }
    });
  }

  for (const item of historicalArticles) {
    const existing = await prisma.article.findUnique({
      where: { slug: item.slug }
    });

    if (!existing) {
      await prisma.article.create({
        data: {
          slug: item.slug,
          authorId: author.id,
          categoryId: category.id,
          imageUrl: item.imageUrl,
          status: 'PUBLISHED',
          translations: {
            create: item.translations
          }
        }
      });
      console.log(\`✅ Seeded historical figure: \${item.slug}\`);
    } else {
      console.log(\`⏭️ Skipped existing figure: \${item.slug}\`);
    }
  }

  console.log("✨ [Historical Figures Seeder] Seeding complete.");
}
`;

fs.writeFileSync('server/historicalFiguresSeeder.ts', fileContent);
console.log('Created server/historicalFiguresSeeder.ts');
