const config = {
    // 邮件订阅者，即邮件发给谁
    subscriberEmail: process.env.SUBSCRIBER,
    // stmp邮件服务器配置
    stmpServerConfig: {
        host: process.env.STMP_HOST,
        port: process.env.STMP_PORT,
        user: process.env.STMP_USER,
        password: process.env.STMP_PASSWORD,
    },
    // 默认是每小时的30分都会执行，也就是每小时扫描一次
    schedule: process.env.SCHEDULE || '0 30 * * * *'
}

export default config