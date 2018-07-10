import { Subject } from "../../../../node_modules/rxjs";

export class ModalsService{
    private addBookModal :  Subject<boolean> = new Subject<boolean>();
    private editBookModal :  Subject<boolean> = new Subject<boolean>();
    private deleteBookModal : Subject<boolean> = new Subject<boolean>();

    public isToOpenEditModal(isToOpenWindow : boolean){
        this.editBookModal.next(isToOpenWindow);
    }

    public isToOpenDeleteModal(isToOpenWindow : boolean){
        this.deleteBookModal.next(isToOpenWindow);
    }

    public isToOpenAddModal(isToOpenWindow : boolean){
        this.addBookModal.next(isToOpenWindow);
    }

    public editBookModalData() : Subject<boolean>{
        return this.editBookModal;
    }

    public deleteBookModalData() : Subject<boolean>{
        return this.deleteBookModal;
    }

    public addBookModalData() : Subject<boolean>{
        return this.addBookModal;
    }
}