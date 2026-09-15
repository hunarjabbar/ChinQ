// server/data/figures/index.ts
import { HistoricalFigureData } from './types.js';
import { KURDISH_FIGURES_PART1 } from './kurdishFigures1.js';
import { KURDISH_FIGURES_PART2 } from './kurdishFigures2.js';
import { CHINESE_FIGURES_PART1 } from './chineseFigures1.js';
import { CHINESE_FIGURES_PART2 } from './chineseFigures2.js';
import { IRAQI_FIGURES } from './iraqiFigures.js';

export * from './types.js';

export const ALL_HISTORICAL_FIGURES: HistoricalFigureData[] = [
  ...KURDISH_FIGURES_PART1,
  ...KURDISH_FIGURES_PART2,
  ...CHINESE_FIGURES_PART1,
  ...CHINESE_FIGURES_PART2,
  ...IRAQI_FIGURES
];
