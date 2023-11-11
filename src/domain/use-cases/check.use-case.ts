
interface CheckServiceInterface {
    execute( url : string ) : Promise<boolean>
}

type SuccesCallBack = () => void;
type ErrorCallBack = ( error: string ) => void;

export class CheckService implements CheckServiceInterface {

    constructor(
        private readonly successCallBack : SuccesCallBack,
        private readonly errorCallBack : ErrorCallBack
    
    ) {}

    public async execute( url : string ) : Promise<boolean> {

       try {
        const req = await fetch( url );
        if( !req.ok ) {
            throw new Error( `Error on check service ${ url }` );
        }

        this.successCallBack();
        return true;
        
       } catch ( error ) {

        this.errorCallBack( `${ error }` );
        return false;
       }


    }


}