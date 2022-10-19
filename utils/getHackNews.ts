/*
 * @Author: BuXiongYu
 * @Date: 2022-10-19 11:24:54
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2022-10-19 11:29:18
 * @Description: get hacker news
 */
import axios from "axios";

export default async function getHackerNews () {
  const { data = [] } = await axios.get('https://hacker-news.firebaseio.com/v0/showstories.json');
  const promises = data
      .slice(0, 10)
      .map((itemId) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`));
  const newses = await Promise.all(promises);
  return newses.map(item => item.data);
}

