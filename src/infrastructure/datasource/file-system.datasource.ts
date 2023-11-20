import fs from 'node:fs';
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/intities/log.entity";


export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-error.log';

    constructor() {
        this.createLogsFile();
    }

    private createLogsFile = () => {

        if ( !fs.existsSync( this.logPath ) ) {
            fs.mkdirSync( this.logPath );
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach( path => {
            if ( !fs.existsSync( path ) ) {
                fs.writeFileSync( path, '' );
            }
        } );

    }
    
    async saveLog(newLog: LogEntity): Promise<void> {

        const logJson = `${ JSON.stringify( newLog ) }\n`;
        
        fs.appendFileSync( this.allLogsPath, logJson );

        if ( newLog.level === LogSeverityLevel.low ) return;

        if ( newLog.level === LogSeverityLevel.medium ) {
            fs.appendFileSync( this.mediumLogsPath, logJson );
        };

        if ( newLog.level === LogSeverityLevel.high ) {
            fs.appendFileSync( this.highLogsPath, logJson );
        };

    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        
        const content = fs.readFileSync( path, 'utf-8' );
        const log = content.split( '\n' ).map( LogEntity.fromJson );
        return log;

    }

    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch ( severityLevel ) {

            case LogSeverityLevel.low:
                return this.getLogsFromFile( this.allLogsPath );

            case LogSeverityLevel.medium:
                return this.getLogsFromFile( this.mediumLogsPath );

            case LogSeverityLevel.high:
                return this.getLogsFromFile( this.highLogsPath );

            default:
                throw new Error( `${ severityLevel } Invalid severity level` );
        }

    }
    
}