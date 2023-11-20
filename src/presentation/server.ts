import { CheckService } from "../domain/use-cases/checks/check.use-case";
import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);


export class ServerApp {

    static start() {

        

        CronService.createJob( 
            '*/5 * * * * *', 
            () => {
                const url = 'http://localhost:3000'
                new CheckService(
                    fileSystemLogRepository,
                    // Success callback || dependency injection
                    () => console.log(`Check service ${ url } is ok`),
                    // Error callback
                    ( error ) => console.log( error )
                ).execute( url );
                // new CheckService().execute( 'http://localhost:3000' );
            });
    }


}