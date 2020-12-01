import PouchDB from 'pouchdb'

export const db = new PouchDB('todos');
const remoteCouch = 'https://94f3c54f-f4cf-4daa-9c11-2b244cc7bd66-bluemix:34a04733cf953081674e8e3a104b39a87bdc597b1724c5c3b0450587864da1f6@94f3c54f-f4cf-4daa-9c11-2b244cc7bd66-bluemix.cloudantnosqldb.appdomain.cloud/todo';

const syncError = (message) => {
    console.log(message)
};

const sync = () => {
    let opts = {live: true};
    db.replicate.to(remoteCouch, opts, syncError);
    db.replicate.from(remoteCouch, opts, syncError);
};
sync();

export const ApiGetAllToDos = () => {
    return db.allDocs({include_docs: true, descending: true})
};

export const ApiAddToDo = (toDo) => {
    db.post(toDo);
};

export const ApiUpdateToDo = (toDo) => {
    db.put(toDo);
};

export const ApiDeleteToDo = (toDo) => {
    db.remove(toDo);
};