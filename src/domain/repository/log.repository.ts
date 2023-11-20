import { LogEntity, LogSeverityLevel } from "../intities/log.entity";


export abstract class LogRepository {

    abstract saveLog( log: LogEntity ): Promise<void>;
    abstract getLog( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;

}