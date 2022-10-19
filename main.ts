/*
 * @Author: BuXiongYu
 * @Date: 2022-10-19 11:23:51
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2022-10-19 11:44:11
 * @Description: hacker push lark bot
 */
import axios from "axios";
import getHackerNews from './utils/getHackNews';

export default async function hackerNewsPush () {
    const news = await getHackerNews();
    const card = {
      config: {
        wide_screen_mode: true,
      },
      header: {
        template: "green",
        title: {
          content: " 📰 Daily Hacker Feeds",
          tag: "plain_text"
        }
      },
      elements: [
        {
          tag: "div",
          text: {
            content: "  ⚫️ **Hacker News**",
            tag: "lark_md"
          }
        },
        ...news.map((item, index) => ({
          tag: "div",
          text: {
            content: `[${index+1}. ${item.title}](${item.url})`,
            tag: "lark_md"
          }
        })),
        {
          tag: "hr"
        },
      ],
    };
    axios.post(`https://open.feishu.cn/open-apis/bot/v2/hook/${process.env.LARK_SCERCT}`, {
      msg_type:"interactive",
      card,
    })
};

hackerNewsPush();
