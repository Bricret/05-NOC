import { LogEntity, LogSeverityLevel } from "../intities/log.entity";


export abstract class LogDataSource {

    abstract saveLog( log: LogEntity ): Promise<void>;
    abstract getLog( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;

}