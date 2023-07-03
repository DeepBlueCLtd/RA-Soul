import { Admin, Resource } from "react-admin";

import { dataProvider } from "./common/dataProvider";
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

function App() {
  return (
    <Admin dataProvider={dataProvider(pkDictionary, config.apiUrl)}>
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
    </Admin>
  );
}

export default App;
