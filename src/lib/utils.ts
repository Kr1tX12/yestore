import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Возвращает правильную форму слова в зависимости от количества.
 *
 * @param {number} count - Количество элементов, для которых нужно определить форму слова.
 * @param {string[]} wordForms - Массив из трех строк, содержащий формы слова:
 *   - wordForms[0]: Форма слова для одного элемента (например, "файл").
 *   - wordForms[1]: Форма слова для нескольких элементов (например, "файла").
 *   - wordForms[2]: Форма слова для многих элементов (например, "файлов").
 *
 * @returns {string} - Правильная форма слова в зависимости от количества.
 *
 * @example
 * const words = {
 *   files: ['файл', 'файла', 'файлов'],
 *   apples: ['яблоко', 'яблока', 'яблок'],
 *   cars: ['машина', 'машины', 'машин']
 * };
 *
 * const countFiles = 5;
 * console.log(`Выбрано ${countFiles} ${getWordEnding(countFiles, words.files)}`);
 * // Вывод: "Выбрано 5 файлов"
 *
 * const countApples = 21;
 * console.log(`Куплено ${countApples} ${getWordEnding(countApples, words.apples)}`);
 * // Вывод: "Куплено 21 яблоко"
 *
 * const countCars = 14;
 * console.log(`Продано ${countCars} ${getWordEnding(countCars, words.cars)}`);
 * // Вывод: "Продано 14 машин"
 */
export function getWordEnding(count: number, wordForms: string[]): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return wordForms[2];
  }

  switch (lastDigit) {
      case 1:
          return wordForms[0];
      case 2:
      case 3:
      case 4:
          return wordForms[1];
      default:
          return wordForms[2];
  }
}