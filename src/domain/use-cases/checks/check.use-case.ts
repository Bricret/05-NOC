import { LogEntity, LogSeverityLevel } from "../../intities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceInterface {
    execute( url : string ) : Promise<boolean>
}

type SuccesCallBack = (() => void) | undefined;
type ErrorCallBack = (( error: string ) => void) | undefined;

export class CheckService implements CheckServiceInterface {

    constructor(
        private readonly logRepository : LogRepository,
        private readonly successCallBack : SuccesCallBack,
        private readonly errorCallBack : ErrorCallBack
    
    ) {}

    public async execute( url : string ) : Promise<boolean> {

       try {
        const req = await fetch( url );
        if( !req.ok ) {
            throw new Error( `Error on check service ${ url }` );
        }

        const log = new LogEntity(`Service ${ url } is ok`, LogSeverityLevel.low);
        this.logRepository.saveLog( log );
        this.successCallBack && this.successCallBack();
        return true;
        
       } catch ( error ) {

        const errorMessage = `the ${ url } is ${ error }`;
        const logError = new LogEntity( errorMessage , LogSeverityLevel.high );
        this.logRepository.saveLog( logError );
        this.errorCallBack && this.errorCallBack( errorMessage );
        return false;    

       }
    }
}