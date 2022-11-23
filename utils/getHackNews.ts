/*
 * @Author: BuXiongYu
 * @Date: 2022-10-19 11:24:54
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2022-11-23 12:11:33
 * @Description: get hacker news
 */
export default async function getHackerNews () {
  const data = await fetch('https://hacker-news.firebaseio.com/v0/showstories.json');
  const jsonData: Array<number> = await data.json();
  const promises = jsonData
      .slice(0, 10)
      .map(async (itemId) => await (await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)).json());
  const newses = await Promise.all(promises);
  return newses;
}

