
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}


export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevel ) {

        this.message = message;
        this.level = level;
        this.createdAt = new Date();

    }

    static fromJson = ( json: string ): LogEntity => {
        
        const jsonString = JSON.parse( json );
        const { message, level, createdAt } = jsonString;
        const log = new LogEntity( message, level );
        log.createdAt = new Date( createdAt );
        return log;

    }
}







