import axios from "axios";
import { stringify } from "query-string";
import { DataProvider } from 'ra-core';



/**
 * @example 
 * 
 * getList             => GET    http://my.api.url/tables/artists/rows?_page=1&_limit=10&_ordering=-Name&_filters=Name:summer&_extend=ArtistId
 * getOne              => GET    http://my.api.url/tables/artists/rows/1
 * getMany             => GET    http://my.api.url/tables/artists/rows/1,2,3,4
 * getManyReference    => GET    http://my.api.url/tables/artists/rows?_page=1&_limit=10&_ordering=-Name&_filters=Name:summer
 * create              => POST   http://my.api.url/tables/artists/rows/
 * update              => PUT    http://my.api.url/tables/artists/rows/1
 * updateMany          => PUT    http://my.api.url/tables/artists/rows/1,2,3
 * delete              => DELETE http://my.api.url/tables/artists/rows/1
 * deleteMany          => DELETE http://my.api.url/tables/artists/rows/1,2,3
 * 
 * 
 * @example 
 * 
 * import {Admin, Resource} from "react-admin"
 * import { dataProvider } from "./common/dataProvider";
 * 
 * import {AlbumList} from "./components/Album"
 * 
 * const primaryKeyDictionary = {
 *    albums: "AlbumId", 
 *    tracks: "TrackId", 
 *    genres: "GenreId", 
 *    playlists: "PlayListId"
 * }
 * 
 * function App() {
 *   return (
 *      <Admin dataProvider={dataProvider(primaryKeyDictionary, "http://my.api.url/tables/")}> 
 *        <Resource name="albums" list={AlbumList}/>
 *      </Admin>
 *   )
 * }
 */

export const dataProvider = (pkDictionary: any, apiUrl: string): DataProvider => ({
  getList: (resource: string, params: any) => {
    const { page, perPage } = params.pagination;
    let { field, order } = params.sort;
  
    field = field === 'id' ? pkDictionary[resource] : field
    const ordering = order === "ASC" ? `${field}` : `-${field}`;

    //since the soul api requires comma separated filters, remove the quotes and curly braces from the filter
    const filter = JSON.stringify(params.filter).replace(/[{} ""]/g, "");

    //Add the _extend query to get many data by using a foreign key 
    let extend = undefined 
    if (resource === "albums") {
      extend = "ArtistId"
    } 

    const query = {
      _page: page,
      _limit: perPage,
      _ordering: ordering,
      _filters: filter ? filter : undefined, 
      _extend: extend
    };
    

    const url = `${apiUrl}/${resource}/rows?${stringify(query)}`;

    return axios.get(url).then((response) => {
      const { data } = response.data;

      //manually add an id key
      const modifiedData = [];
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const primaryKey = pkDictionary[resource];

        if (primaryKey !== undefined) {
          item.id = item[primaryKey];
          delete item[primaryKey];
        }

        modifiedData.push(item);
      }

      return { data: modifiedData, total: response.data.total };
    });
  },

  getOne: (resource: string, params: any) => {
    const url = `${apiUrl}/${resource}/rows/${params.id}`;

    return axios.get(url).then((response) => {
      let { data } = response.data;
      data = data[0];

      const primaryKey = pkDictionary[resource];
      if (primaryKey !== undefined) {
        data.id = data[primaryKey];
        delete data[primaryKey];
      }

      return { data };
    });
  },

  getMany: (resource: string, params: any) => {
    const url = `${apiUrl}/${resource}/rows/${params.ids.toString()}`;
  
    return axios.get(url).then((response) => {
      const { data } = response.data;

      //manually add an id key
      const modifiedData = [];
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const primaryKey = pkDictionary[resource];

        if (primaryKey !== undefined) {
          item.id = item[primaryKey];
          delete item[primaryKey];
        }

        modifiedData.push(item);
      }

      return { data: modifiedData, total: response.data.total };
    });
  },

  getManyReference: (resource: string, params: any) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const ordering = order === "ASC" ? `${field}` : `-${field}`;
    const filter = JSON.stringify(params.filter).replace(/[{} ""]/g, "");
    
    const query = {
      _page: page,
      _limit: perPage,
      _ordering: field !== "id" ? ordering : undefined,
      _filters: filter ? `${filter},${params.target}:${params.id}` : undefined,
    };

    const url = `${apiUrl}/${resource}/rows?${stringify(query)}`;

    return axios.get(url).then((response) => {
      const { data } = response.data;

      //manually add an id key
      const modifiedData = [];
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const primaryKey = pkDictionary[resource];

        if (primaryKey !== undefined) {
          item.id = item[primaryKey];
          delete item[primaryKey];
        }

        modifiedData.push(item);
      }

      return { data: modifiedData, total: response.data.total };
    });
  },

  create: (resource: string, params: any) => {
    const url = `${apiUrl}/${resource}/rows`;

    return axios.post(url, { fields: params.data }).then((response) => {
      return { data: { id: response.data.lastInsertRowId, ...params.data } };
    });
  },

  update: (resource: string, params: any) => {
    const url = `${apiUrl}/${resource}/rows/${params.id}`;

    // remove the id property
    const { id, ...editData } = params.data;

    return axios.put(url, { fields: editData }).then((response) => {
      return { data: { id: response.data.lastInsertRowId, ...params.data } };
    });
  },

  updateMany: (resource: string, params: any) => {
    const url = `${apiUrl}/${resource}/rows/${params.ids.toString()}`;

    // remove the id property
    const { id, ...editData } = params.data;
    return axios.put(url, { fields: editData }).then(async (response) => { 
     return {data: params.ids}
    });
  },

  delete: (resource: string, params: any) => {
    const url = `${apiUrl}/${resource}/rows/${params.id}`;

    return axios.delete(url).then((response) => {
      return { data: params.id };
    });
  },
  
  deleteMany: (resource: string, params: any) => {
    const ids = params.ids.toString();
    const url = `${apiUrl}/${resource}/rows/${ids}`;

    return axios.delete(url).then((response) => {
      return { data: params.ids };
    });
  },
});
