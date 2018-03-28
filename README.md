## todomvc-lowdb

This is a database using express.js + lowdb.

Github Repo: https://github.com/calpa/todomvc-lowdb

## Start
```
git clone https://github.com/calpa/todomvc-lowdb.git
cd ./todomvc-lowdb
npm install
npm start
```

Then open `localhost:8081` or you may use `PORT=3000 npm start` to use `localhost:3000`. 

## Support
1. Add todo via post request to `/todos`, {id: number, name: string}
2. Modify todo with provided id via post request to `/todos`, {id: number, name: string}
3. Soft Delete todo with provided id, delete request to `/todos`, {id: number}
4. Query todo with get param: name to `/todos?name=`, e.g. `/todos?name=apple`

## Special Thanks
NetEase
