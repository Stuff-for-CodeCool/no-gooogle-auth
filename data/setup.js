import { createConnection, insertAll } from "./user.handler.js";

//  Make sure we're good to go
const setup = () => {
    createConnection();
    insertAll(true);
};

setup();
