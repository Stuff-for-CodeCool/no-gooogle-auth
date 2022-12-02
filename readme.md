# Simple authentication example

## Setup

First of all, ensure your `express` app's `package.json` has the `"type": "module"` set. (This one's does, don't worry about it).

Then, rename the file `.env.template` into `.env` and set your variables:

* `PORT` is the port your app will run on. Typically this will be 9000 by convention
* `MONGOHOST` is the host of your MongoDb app. Typically this will be `localhost`
* `MONGODB` is the name of your MongoDb database
* `SALT` is the string used to hash the users' passwords

Now, you can run `npm i` to install all dependencies, then `npm run setup` to create the `users` collection in your database and populate it.

Finally, run `npm run start` to fire up your app.

* * *

## Notes

Given that your app runs as a module, modern JavaScript syntax can be used, e.g.

```js
import defaultFunction from "some-module";
import { otherExport } from "some-other-module";

//  ...

defaultFuntion();
otherExport();
```

...rather than the old

```js
const someModule = require("some-module");
const someOtherModule = require("some-other-module");

//  ...

someModule.defaultFuntion();
someOtherModule.otherExport();
```

Most files are commented wherever something non-standard is going on.
