import { Admin, Resource, Menu, MenuItemLink, Layout } from "react-admin";
import { Route, BrowserRouter } from "react-router-dom";

import { dataProvider } from "./common/dataProvider";
import { authProvider } from "./common/authProvider";

import config from "./config";

import {
  GenreList,
  GenreCreate,
  GenreEdit,
  GenreShow,
} from "./components/Genre";

import {
  InvoiceItemList,
  InvoiceItemShow,
  InvoiceItemEdit,
  InvoiceItemCreate,
} from "./components/InvoiceItem";
import {
  AlbumList,
  AlbumShow,
  AlbumEdit,
  AlbumCreate,
} from "./components/Album";
import {
  TrackList,
  TrackShow,
  TrackEdit,
  TrackCreate,
} from "./components/Track";

import Login from "./components/auth/Login";
import ChangePassword from "./components/auth/ChangePassword";

const pkDictionary = {
  genres: "GenreId",
  artists: "ArtistId",
  customers: "CustomerId",
  employees: "EmployeeId",
  invoices: "InvoiceId",
  invoice_items: "InvoiceLineId",
  media_types: "MediaTypeId",
  playlists: "PlayListId",
  playlist_track: "PlayListId",
  tracks: "TrackId",
  albums: "AlbumId",
};

const MyMenu = (props) => (
  <Menu {...props}>
    <MenuItemLink to="/genres" primaryText="Generes" />
    <MenuItemLink to="/invoice_items" primaryText="Invoice Items" />
    <MenuItemLink to="/tracks" primaryText="Tracks" />
    <MenuItemLink to="/albums" primaryText="Albums" />
    <MenuItemLink to="/change-password" primaryText="Change Password" />
  </Menu>
);

const MyLayout = (props) => <Layout {...props} menu={MyMenu} />;

function App() {
  return (
    <Admin
      layout={MyLayout}
      dataProvider={dataProvider(pkDictionary, config.apiUrl)}
      authProvider={authProvider(config.apiUrl)}
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
        name="invoice_items"
        create={InvoiceItemCreate}
        list={InvoiceItemList}
        show={InvoiceItemShow}
        edit={InvoiceItemEdit}
      />

      <Resource
        name="tracks"
        list={TrackList}
        show={TrackShow}
        edit={TrackEdit}
        create={TrackCreate}
        recordRepresentation="Name"
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

export default App;
