import { Provide, TaskLocal, FORMAT, Config } from '@midwayjs/decorator';
import { getConnectionManager } from 'typeorm';

@Provide()
export class keepAlive {
    @Config('isOpenKeepAlive')
    isOpenKeepAlive;

    /**
     * 心跳，保证当前所有数据库连接不中断
     * 每十分钟执行一次
     */
    @TaskLocal(FORMAT.CRONTAB.EVERY_PER_10_MINUTE)
    async tryConnectDB() {
        if (this.isOpenKeepAlive) {
            let connectionList = getConnectionManager().connections;

            for (const connection of connectionList) {
                if (
                    connection.options.type == 'oracle' &&
                    connection.isConnected
                ) {
                    const sql = `SELECT sysdate FROM dual`;
                    await connection.query(sql);
                } else if (
                    connection.options.type == 'mysql' &&
                    connection.isConnected
                ) {
                    const sql = `select now() as currentTime`;
                    await connection.query(sql);
                }
            }
        }
    }
}
