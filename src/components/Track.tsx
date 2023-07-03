import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Show,
  SimpleShowLayout,
  TextInput,
  Edit,
  SimpleForm,
  Create,
  ReferenceInput,
  ReferenceField,
  ReferenceManyField,
  SelectInput,
} from "react-admin";

const trackFilters = [
  <TextInput label="Id" source="TrackId" alwaysOn />,
  <TextInput label="Name" source="Name" />,
  <TextInput label="Album Name" source="AlbumId" />,
  <TextInput label="Genre" source="GenreId" />,
  <TextInput label="Media type" source="MediaTypeId" />,
];

export function TrackList() {
  return (
    <List filters={trackFilters}>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="Name" />

        <ReferenceField
          label="Album Name"
          source="AlbumId"
          reference="albums"
          link="show"
        >
          <TextField source="Title" />
        </ReferenceField>

        <ReferenceField
          label="Genre"
          source="GenreId"
          reference="genres"
          link="show"
        >
          <TextField source="Name" />
        </ReferenceField>

        <ReferenceField
          label="Media type"
          source="MediaTypeId"
          reference="media_types"
          link="show"
        >
          <TextField source="Name" />
        </ReferenceField>

        <TextField source="Composer" />
        <TextField source="Milliseconds" />
        <TextField source="Bytes" />
        <TextField source="UnitPrice" />
        <EditButton />
      </Datagrid>
    </List>
  );
}

export function TrackShow() {
  return (
    <Show title="Track view">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="Name" />
        <TextField source="AlbumId" />
        <TextField source="MediaTypeId" />
        <TextField source="GenreId" />
        <TextField source="Composer" />
        <TextField source="Milliseconds" />
        <TextField source="Bytes" />
        <TextField source="UnitPrice" />
      </SimpleShowLayout>
    </Show>
  );
}

export function TrackEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="Name" />
        <TextInput source="AlbumId" disabled />
        <TextInput source="Composer" />
        <TextInput source="Milliseconds" />
        <TextInput source="Bytes" />
        <TextInput source="UnitPrice" />
      </SimpleForm>
    </Edit>
  );
}

export function TrackCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="Name" />

        <ReferenceInput label="Album" source="AlbumId" reference="albums">
          <SelectInput optionText="Title" />
        </ReferenceInput>

        <ReferenceInput
          label="Media type"
          source="MediaTypeId"
          reference="media_types"
        >
          <SelectInput optionText="Name" />
        </ReferenceInput>

        <ReferenceInput label="Genre" source="GenreId" reference="genres">
          <SelectInput optionText="Name" />
        </ReferenceInput>

        <TextInput source="Composer" />
        <TextInput source="Milliseconds" />
        <TextInput source="Bytes" />
        <TextInput source="UnitPrice" />
      </SimpleForm>
    </Create>
  );
}
