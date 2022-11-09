import schedule from "node-schedule"
import config from "./config"
import { doCrawler } from "./crawler"
import sendEmail from "./stmp"

// 大于该时间的事务才会触发邮件提醒
let lastTime = new Date().getTime();

schedule.scheduleJob(config.schedule, async () => {
    // 筛选出需要提醒的事务
    const datas = (await doCrawler())
        .filter((value) => value.time > lastTime)
    // 更新时间并发送邮件
    datas.forEach((data) => {
        if (data.time > lastTime) lastTime = data.time
        sendEmail(config.subscriberEmail!, `新事务提醒: ${data.title}`, `
            标题: ${data.title}
            时间: ${new Date(data.time).toLocaleDateString()}
            部门: ${data.department}
            发布人: ${data.people}
            链接: ${data.url}
        `)
    })
})