import axios from "axios";
import { load } from "cheerio";

type SingleMessage = {
    title: string,
    url: string,
    time: number,
    people: string,
    department: string
}

async function getRawHtml(page: number): Promise<string> {
    return axios.get(`http://oa.cqupt.edu.cn/notify.do?method=queryAllNotify&type=1&curPageNo=${page}`)
        .then((value) => value.data)
}

function parse(html: string): SingleMessage[] {
    const $ = load(html)
    return $(".center table tbody tr")
        .next()
        .toArray()
        .map(e => {
            const tds = $(e).find("td").toArray()
            const tdTitleAndUrl = $(tds[1]).find("nobr a")
            return {
                title: tdTitleAndUrl.attr("title")!,
                url: "http://oa.cqupt.edu.cn" + tdTitleAndUrl.attr("href"),
                time: Date.parse($(tds[0]).html()!),
                people: $(tds[2]).html()!,
                department: $(tds[3]).html()!
            }
        })
}

export async function doCrawler(): Promise<SingleMessage[]> {
    const rawHtml = await getRawHtml(1)
    return parse(rawHtml)
}