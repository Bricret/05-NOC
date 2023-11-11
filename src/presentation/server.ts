
import { CheckService } from "../domain/use-cases/check.use-case";
import { CronService } from "./cron/cron-service";


export class ServerApp {

    static start() {
        CronService.createJob( 
            '*/5 * * * * *', 
            () => {
                const url = 'https://www.google.com'
                new CheckService(
                    // Success callback || dependency injection
                    () => console.log(`Check service ${ url } is ok`),
                    // Error callback
                    ( error ) => console.log( error )
                ).execute( url );
                // new CheckService().execute( 'http://localhost:3000' );
            });
    }


}