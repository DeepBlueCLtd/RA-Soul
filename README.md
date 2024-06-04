## RA-Soul-Provider

### Description

`RA-Soul` is a data provider that helps you connect React Admin with [`Soul`](https://github.com/thevahidal/soul), a REST server that uses SQLite. This provider exports a list of auth provider methods and data provider methods that you can use to connect your React Admin application with `Soul`.

### Provider Methods

#### Data Providers

```
- getList
- getOne
- getMany
- getManyReference
- create
- update
- updateMany
- delete
- deleteMany
```

#### Auth Providers

```
- login
- logout
- checkAuth
- checkError
- getPermissions
- changePassword
```

### Usage

#### 1. Start the `Soul` server

Clone the `Soul` repository and follow the instructions in the [README](https://github.com/thevahidal/soul/blob/main/README.md) to run the server.

#### 2. Install the `ra-soul`

```
npm i ra-soul-provider
```

#### 3. Use the provider in your React Admin application

```js
import { Admin, Resource } from "react-admin";
import { dataProvider, authProvider } from "ra-soul-provider";

import { AlbumList } from "./components/Album";
import { GenreList } from "./components/Genre";
import { ChangePassword } from "./components/auth/ChangePassword";

/** React Admin expects an id field for each resource, but if your database doesn't have an id
 * field in each table, then you should map your primary key for each resource
 **/

const primaryKeyDictionary = {
  albums: "AlbumId",
  tracks: "TrackId",
  genres: "GenreId",
  playlists: "PlayListId",
};

const soulApiUrl = "http://soul.api.url/tables";

function App() {
  return (
    <Admin
      dataProvider={dataProvider(primaryKeyDictionary, soulApiUrl)}
      authProvider={authProvider(soulApiUrl)}
      loginPage={Login}
    >
      <Resource
        name="genres"
        list={GenreList}
        create={GenreCreate}
        edit={GenreEdit}
        show={GenreShow}
      />

      <Resource
        name="albums"
        list={AlbumList}
        show={AlbumShow}
        edit={AlbumEdit}
        create={AlbumCreate}
      />

      <Resource name="change-password" list={ChangePassword} />
    </Admin>
  );
}
```
